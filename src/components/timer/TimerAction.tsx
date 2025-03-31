import { LuPause, LuPlay, LuRefreshCcw } from "react-icons/lu";

const TimerAction = () => {
  return (
    <div className="flex-1  w-full flex items-center justify-between py-5 ">
      <button className="cursor-pointer" title="Stop timer">
        <LuPause size={28} />
      </button>
      <button className="cursor-pointer" title="Start timer">
        <LuPlay size={28} />
      </button>
      <button className="cursor-pointer" title="Reset timer">
        <LuRefreshCcw size={28} />
      </button>
    </div>
  );
};

export default TimerAction;
