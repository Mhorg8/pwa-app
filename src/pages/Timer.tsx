import { useEffect, useState } from "react";
import { LuPause, LuPencil, LuPlay, LuRefreshCcw, LuX } from "react-icons/lu";
import TimerAction from "../components/timer/TimerAction";

const TimerPage = () => {
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [time, setTime] = useState<number>(100); // Max time (in seconds or any unit)
  const [elapsedTime, setElapsedTime] = useState<number>(); // Simulating elapsed time
  const [processTime, setProcessTime] = useState<number>(0); // Percentage

  function handleZeroToTimer() {
    return time < 10 ? `0${time}` : time; // Displaying the time
  }

  function handleUpdateTime(e: React.KeyboardEvent<HTMLInputElement>) {
    const targetValue = Number(e.currentTarget.value);
    if (e.key === "Enter") {
      setTime(targetValue);
      setEditFlag(false);
    }
  }

  function calculateProcessTime() {
    // Ensure that the calculation doesn't result in division by zero
    if (time > 0) {
      const distance = (time / time) * 100;
      setProcessTime(distance);
    }
  }

  useEffect(() => {
    calculateProcessTime(); // Recalculate process time when `time` or `elapsedTime` changes
  }, [time, elapsedTime]);

  return (
    <div className="wrapper">
      <div className="w-[400px] h-[400px] flex flex-col justify-center items-center shadow-xl gap-1 rounded-md">
        <h1 className="mb-5 text-4xl font-semibold text-dark-gray">
          Manage your time
        </h1>
        <div className="w-full h-[80%] flex items-center justify-center border-y-1 relative">
          <div className="absolute top-6 right-0 flex w-full gap-3 justify-between">
            {editFlag ? (
              <div className="flex items-center gap-2 w-full">
                <input
                  onChange={(e) => setTime(Number(e.currentTarget.value))}
                  onKeyDown={handleUpdateTime}
                  value={time === 0 ? "" : time}
                  type="number"
                  className="w-full bg-soft-gray/70 rounded-sm py-2 px-2 flex-1"
                />
                <button
                  title="Close edit input"
                  className="cursor-pointer"
                  onClick={() => setEditFlag(false)}
                >
                  <LuX size={24} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditFlag(true)}
                className="flex items-center justify-center p-3 rounded-full cursor-pointer hover:bg-soft-gray border border-zinc-400"
              >
                <LuPencil />
              </button>
            )}
          </div>
          <h2 className="text-6xl font-bold ">{handleZeroToTimer()}: 00</h2>
        </div>
        <TimerAction />
        <div className="h-2 bg-soft-gray w-full rounded-md relative">
          <div
            className="absolute top-0 rounded-md bg-red-200 h-2 left-0"
            style={{ width: `${processTime}%` }} // Dynamically updating width based on processTime
          />
        </div>
        <p>{Math.floor(processTime)}% Complete</p>
      </div>
    </div>
  );
};

export default TimerPage;
