import { LuPencil, LuX } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { updateMinute } from "../../libs/redux/timer/timerSlice";
import { useRef, useState } from "react";
import { RootState } from "../../store";

const TimerView = () => {
  const { minute, second } = useSelector((state: RootState) => state.timer);

  const [time, setTime] = useState<number>(minute);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const processTime = useRef<number | null>(null);
  const dispatch = useDispatch();

  function handleZeroToTimer(time: number) {
    return time < 10 ? `0${time}` : time;
  }

  function handleUpdateTime(e: React.KeyboardEvent<HTMLInputElement>) {
    const targetValue = Number(e.currentTarget.value);
    if (e.key === "Enter") {
      processTime.current = targetValue;
      dispatch(updateMinute(time));
      setEditFlag(false);
    }
  }

  return (
    <div className="w-full h-[80%] flex items-center justify-center  relative">
      <div className="absolute top-6 right-0 flex w-full gap-3 justify-between">
        {editFlag ? (
          <div className="flex items-center gap-2 w-full">
            <input
              onChange={(e) => setTime(Number(e.currentTarget.value))}
              value={time}
              min={1}
              onKeyDown={handleUpdateTime}
              type="number"
              className="w-full bg-soft-gray rounded-sm py-2 px-2 flex-1"
            />
            <button
              title="Close edit input"
              className="cursor-pointer bg-white"
              onClick={() => setEditFlag(false)}
            >
              <LuX size={24} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditFlag(true)}
            className=" flex items-center justify-center p-3 rounded-full cursor-pointer hover:bg-soft-gray border border-zinc-400"
          >
            <LuPencil />
          </button>
        )}
      </div>
      <h2 className="text-9xl font-bold ">
        {handleZeroToTimer(minute)}:{handleZeroToTimer(second)}
      </h2>
    </div>
  );
};

export default TimerView;
