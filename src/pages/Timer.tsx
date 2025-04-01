import TimerAction from "../components/timer/TimerAction";
import { useSelector } from "react-redux";
import TimerView from "../components/timer/TimerView";
import { RootState } from "../store";

const TimerPage = () => {
  const { processPercentage } = useSelector((state: RootState) => state.timer);

  return (
    <div className="wrapper">
      <div className="w-[500px] h-[500px] flex flex-col justify-center items-center shadow-xl gap-1 rounded-md bg-zinc-100 p-4">
        <h1 className="mb-5 text-3xl  text-dark-gray font-light">
          Manage your time
        </h1>
        <TimerView />
        <TimerAction />
        <div className="h-3 bg-soft-gray w-full rounded-md relative ">
          <div
            className="absolute top-0 rounded-md bg-dark-green h-2.5 left-0"
            style={{ width: `${processPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
