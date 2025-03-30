import { Weather } from "../../types";

interface Props {
  weather?: Weather;
}

const TemperatureView = ({ weather }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center border-y border-stone-400 py-10">
      <div className="flex items-center h-fit ">
        <h1 className="text-9xl md:text-[150px] font-light text-dark-gray select-none">
          {weather ? weather.main.temp : "00"}
        </h1>
        <div className="flex h-full min-h-38 flex-col   items-center justify-between text-4xl ">
          <p className="">&deg;</p>
          <p>C</p>
        </div>
      </div>
      <p className="text-2xl tracking-wide font-light">
        {weather ? weather.weather[0].description : "Loading..."}
      </p>
    </div>
  );
};

export default TemperatureView;
