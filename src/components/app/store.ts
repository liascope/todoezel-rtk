
import { configureStore } from "@reduxjs/toolkit";
import doLaterReducer from "../pages/doLaterSlice";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    doLater: doLaterReducer
  }
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("doLater", JSON.stringify(state.doLater.allSavedTasks));
});

export const useAppDispatch: ()=>typeof store.dispatch=useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector

export type RootState = ReturnType<typeof store.getState>;
// for thunks/middleware: export type AppDispatch = typeof store.dispatch;

export default store;