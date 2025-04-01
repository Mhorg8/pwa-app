import TimerAction from "../components/timer/TimerAction";
import { useSelector } from "react-redux";
import TimerView from "../components/timer/TimerView";
import { RootState } from "../store";

const TimerPage = () => {
  const { processPercentage } = useSelector((state: RootState) => state.timer);

  return (
    <div className="wrapper">
      <div className="w-[400px] h-[400px] flex flex-col justify-center items-center shadow-xl gap-1 rounded-md">
        <h1 className="mb-5 text-4xl font-semibold text-dark-gray">
          Manage your time
        </h1>
        <TimerView />
        <TimerAction />
        <div className="h-3 bg-soft-gray w-full rounded-md relative">
          <div
            className="absolute top-0 rounded-md bg-red-200 h-2 left-0"
            style={{ width: `${processPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
