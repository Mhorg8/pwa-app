import { IoLocationOutline } from "react-icons/io5";

import TemperatureView from "../components/weather/TemperatureView";
import SearchLocation from "../components/weather/SearchLocation";

const WeatherPage = () => {
  return (
    <div className="wrapper">
      <div className="flex flex-col items-center justify-center gap-y-10">
        <SearchLocation />
        <div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-dark-gray">Current location</span>
            <IoLocationOutline />
          </div>
          <h3 className="text-4xl font-light tracking-wider">STOCKHOLM</h3>
        </div>
        <TemperatureView />

        <div className="flex items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center gap-3">
            <h5 className="text-2xl font-light tracking-wide">TODAY</h5>
            <div className="bg-red-200 h-10 w-10 "></div>
            <div className="flex items-center gap-3 text-2xl font-light tracking-wide">
              <p>77</p> | <p>54</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
