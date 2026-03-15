// src/pages/doLaterSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { todayISO } from "../../lib/config";
import type { Todo, DoLaterEntry } from "../../lib/types";
import type { RootState } from "../app/store";

interface DoLaterState {
  allSavedTasks: DoLaterEntry[]
  savedDate: string
}

const savedTasks: DoLaterEntry[] = JSON.parse(localStorage.getItem("doLater") || "[]");

const initialState: DoLaterState = {
  allSavedTasks: savedTasks,
  savedDate: ''
};



export const selectTodaysTasks = (state: RootState): Todo[] => {
  const todaysTasks = state.doLater.allSavedTasks.find(
    e => e.date === todayISO
  )?.tasks;

  if (!todaysTasks) return [];
  return todaysTasks;
};

export const doLaterSlice = createSlice({
  name: 'doLater',
  initialState,
  reducers: {
    addTasks: {
      prepare({ tasks, date }: { tasks: Todo[]; date: string }) {
        return { payload: { tasks, date } };
      },
      reducer(state, action: PayloadAction<{ tasks: Todo[]; date: string }>) {
        const { tasks, date } = action.payload;
        state.savedDate = date;
        const existing = state.allSavedTasks.find(e => e.date === date);
        if (existing) {
          existing.tasks.push(...tasks);
        } else {
          state.allSavedTasks.push({ date, tasks });
        }
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.allSavedTasks = state.allSavedTasks.filter(t => t.date !== action.payload);
    },
    checkTask(state, action: PayloadAction<string>) {
      const taskId = action.payload;
      const entry = state.allSavedTasks.find(e => e.date === todayISO);
      if (!entry) return;
      const task = entry.tasks.find(t => t.id === taskId);
      if (task) task.done = !task.done;
    },
    markDeleted(state, action: PayloadAction<string>) {
      const taskId = action.payload;
      const entry = state.allSavedTasks.find(e => e.date === todayISO);
      if (!entry) return;
      const task = entry.tasks.find(t => t.id === taskId);
      if (task) task.delete = true;
    }
  }
});

export const { addTasks, deleteTask, markDeleted, checkTask } = doLaterSlice.actions;
export default doLaterSlice.reducer;