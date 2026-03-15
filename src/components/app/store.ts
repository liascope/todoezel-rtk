// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import doLaterReducer from "../pages/doLaterSlice";

export const store = configureStore({
  reducer: {
    doLater: doLaterReducer
  }
});

// LocalStorage Subscription
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("doLater", JSON.stringify(state.doLater.allSavedTasks));
});

// Typen für TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;