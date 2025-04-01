import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimerState {
  minute: number;
  second: number;
  isRunning: boolean;
  processPercentage: number;
  interval: NodeJS.Timeout | null;
}

const initialState: TimerState = {
  minute: 5,
  second: 0,
  isRunning: false,
  processPercentage: 100,
  interval: null,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    updateMinute: (state, action: PayloadAction<number>) => {
      state.minute = action.payload;
      state.second = 0;
    },

    updateSecond: (state, action: PayloadAction<number>) => {
      state.second = action.payload;
    },

    startTimer: (state) => {
      state.isRunning = true;
    },

    pauseTimer: (state) => {
      state.isRunning = false;
    },

    // Resset everything to defualt
    resetTimer: (state) => {
      state.minute = 5;
      state.second = 0;
      state.isRunning = false;
      state.processPercentage = 100;
    },

    decrementTime: (state) => {
      // Check if minute is ZERO or second is ZERO return
      if (state.minute === 0 && state.second === 0) {
        state.isRunning = false;
        return;
      }
      // DEcrement second and minute
      if (state.second > 0) {
        state.second -= 1;
      } else if (state.minute > 0) {
        state.minute -= 1;
        state.second = 59;
      }

      // Update process percentage
      const totalSeconds = 5 * 60;
      const remainingSeconds = state.minute * 60 + state.second;
      state.processPercentage = (remainingSeconds / totalSeconds) * 100;
    },
  },
});

export const {
  updateMinute,
  updateSecond,
  startTimer,
  pauseTimer,
  resetTimer,
  decrementTime,
} = timerSlice.actions;
export default timerSlice.reducer;
