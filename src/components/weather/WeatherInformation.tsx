import { Weather } from "../../types";

interface Props {
    weather : Weather
}

const WeatherInformation = ({weather} :Props) => {
  return (
    <div className="flex items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center gap-3">
        <h5 className="text-2xl font-light tracking-wide">TODAY</h5>
        <div className=" h-24 w-24 ">
          <img
            className="w-full h-full"
            src={
              weather.weather[0].main === "Clouds"
                ? "/icons/weather/cloudy.png"
                : weather.weather[0].main === "Clear"
                ? "/icons/weather/sunny.png"
                : weather.weather[0].main === "Haze"
                ? "/icons/weather/haze.png"
                : weather.weather[0].main === "Mist"
                ? "icons/weather/mist.png"
                : weather.weather[0].main === "Snow"
                ? "icons/weather/snow.png"
                : weather.weather[0].main === "Rain"
                ? "icons/weather/rain.png"
                : weather.weather[0].main === "Storm"
                ? "icons/weather/mist.png"
                : ""
            }
            alt={weather.weather[0].description}
          />
        </div>

        {/* min and max temp */}
        <div className="flex items-center gap-3 text-2xl font-light tracking-wide">
          <div className="flex items-end font-light">
            <p>{weather.main.temp_min.toFixed(0)}</p>{" "}
            <span className="text-base">°C</span>
          </div>
          |
          <div className="flex items-end font-light">
            <p>{weather.main.temp_max.toFixed(0)}</p>{" "}
            <span className="text-base">°C</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInformation;
