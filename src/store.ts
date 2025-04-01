import { configureStore } from "@reduxjs/toolkit";
import timerSlice from "./libs/redux/timer/timerSlice";
export const store = configureStore({
  reducer: {
    timer: timerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
