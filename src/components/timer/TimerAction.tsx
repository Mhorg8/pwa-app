import { LuPause, LuPlay, LuRefreshCcw } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementTime,
  pauseTimer,
  resetTimer,
  startTimer,
} from "../../libs/redux/timer/timerSlice";
import { useEffect, useRef } from "react";
import { RootState } from "../../store";
import { toast } from "react-toastify";

const TimerAction = () => {
  const { isRunning, minute } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();
  const interval = useRef<NodeJS.Timeout | null>(null);

  function startTimerFn() {
    if (minute === 0) {
      toast.error("First set a time.");
      return;
    }

    dispatch(startTimer());

    if (!interval.current) {
      interval.current = setInterval(() => {
        dispatch(decrementTime());
      }, 1000);
    }

    toast.success("Timer started.");
  }

  function stopTimer() {
    if (interval.current) {
      clearInterval(interval.current);
      dispatch(pauseTimer());
      interval.current = null;
    }

    toast.info("Timer stoped.");
  }

  function resetTimerFn() {
    toast.info("Timer restarted.");
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
      <button
        className="cursor-pointer flex items-center justify-center hover:bg-white hoverEffect hover:scale-110 p-3 rounded-full"
        title="Stop timer"
        onClick={stopTimer}
      >
        <LuPause size={28} />
      </button>
      <button
        disabled={isRunning}
        onClick={startTimerFn}
        className="cursor-pointer flex items-center justify-center hover:bg-white hoverEffect hover:scale-110 p-3 rounded-full"
        title="Start timer"
      >
        <LuPlay size={28} />
      </button>
      <button
        onClick={resetTimerFn}
        className="cursor-pointer flex items-center justify-center hover:bg-white hoverEffect hover:scale-110 p-3 rounded-full"
        title="Reset timer"
      >
        <LuRefreshCcw size={28} />
      </button>
    </div>
  );
};

export default TimerAction;
