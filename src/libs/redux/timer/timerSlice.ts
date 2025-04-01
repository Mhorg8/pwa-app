import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimerState {
  minute: number;
  second: number;
  isRunning: boolean;
  initialTotalSeconds: number;
  processPercentage: number;
  interval: NodeJS.Timeout | null;
}

const initialState: TimerState = {
  minute: 0,
  second: 0,
  initialTotalSeconds: 0,
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
      // Set initial total seconds only when the timer starts
      state.initialTotalSeconds = state.minute * 60 + state.second;
    },

    pauseTimer: (state) => {
      state.isRunning = false;
    },

    // Resset everything to defualt
    resetTimer: (state) => {
      state.minute = 0;
      state.second = 0;
      state.isRunning = false;
      state.processPercentage = 100;
    },

    decrementTime: (state) => {
      if (state.minute === 0 && state.second === 0) {
        state.isRunning = false;
        state.processPercentage = 0;
        return;
      }

      if (state.second > 0) {
        state.second -= 1;
      } else if (state.minute > 0) {
        state.minute -= 1;
        state.second = 59;
      }

      // Ensure we use the initially stored total seconds
      const remainingSeconds = state.minute * 60 + state.second;
      state.processPercentage = Math.floor(
        (remainingSeconds / state.initialTotalSeconds) * 100
      );

      console.log(state.processPercentage);
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
