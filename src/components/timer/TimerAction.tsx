import { LuPause, LuPlay, LuRefreshCcw } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementTime,
  pauseTimer,
  resetTimer,
} from "../../libs/redux/timer/timerSlice";
import { useEffect, useRef } from "react";
import { RootState } from "../../store";

const TimerAction = () => {
  const { isRunning } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();
  const interval = useRef<NodeJS.Timeout | null>(null);

  function startTimer() {
    if (!interval.current) {
      interval.current = setInterval(() => {
        dispatch(decrementTime());
      }, 1000);
    }
  }

  function stopTimer() {
    if (interval.current) {
      clearInterval(interval.current);
      dispatch(pauseTimer());
      interval.current = null;
    }
  }

  function resetTimerFn() {
    dispatch(resetTimer());
  }
  useEffect(() => {
    if (isRunning) {
      startTimer();
    } else {
      stopTimer();
    }

    return () => stopTimer();
  }, [isRunning]);

  return (
    <div className="flex-1 w-full flex items-center justify-between py-5">
      <button className="cursor-pointer" title="Stop timer" onClick={stopTimer}>
        <LuPause size={28} />
      </button>
      <button
        disabled={isRunning}
        onClick={startTimer}
        className="cursor-pointer"
        title="Start timer"
      >
        <LuPlay size={28} />
      </button>
      <button
        onClick={resetTimerFn}
        className="cursor-pointer"
        title="Reset timer"
      >
        <LuRefreshCcw size={28} />
      </button>
    </div>
  );
};

export default TimerAction;
