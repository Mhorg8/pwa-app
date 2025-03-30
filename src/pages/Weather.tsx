import TemperatureView from "../components/weather/TemperatureView";
import SearchLocation from "../components/weather/SearchLocation";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Weather } from "../types";
import { useSearchParams } from "react-router-dom";

interface Location {
  city: null | string;
  country: null | string;
  loc: null | string;
}

const WeatherPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("location");

  const [location, setLocation] = useState<Location>({
    city: null,
    country: null,
    loc: null,
  });

  // Fetch current location
  async function getCurrentLocation() {
    try {
      const response = await fetch(
        `https://ipinfo.io/json?token=8461a4291e36f7`
      );
      if (!response.ok) throw new Error("Failed to fetch location");
      const data = await response.json();
      setLocation({
        city: data.city,
        country: data.country,
        loc: data.loc,
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  }

  // Fetch weather details
  async function getWeatherDetail() {
    try {
      if (location.loc || query) {
        const [lat, lon] = location.loc ? location.loc.split(",") : [];
        const API_KEY = "1399b4e72604b09f14d6522be3095722";
        const getWeatherByCity = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`;
        const getWeatherByCurrentLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        const response = await fetch(
          query ? getWeatherByCity : getWeatherByCurrentLocation
        );

        if (!response.ok) throw new Error("Failed to fetch weather data");
        const data = await response.json();
        setWeather(data);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to fetch weather data. Please try again.");
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (location.city || query) {
      getWeatherDetail();
    }
  }, [location, query]);

  if (!weather) {
    <div>LOading</div>;
  }

  return (
    <div className="wrapper">
      <div className="flex flex-col items-center justify-center gap-y-10">
        <SearchLocation />
        <div className="">
          <div className="flex  items-center gap-1">
            <span className="text-sm text-dark-gray">Current location</span>
            <IoLocationOutline />
          </div>
          <h3 className="text-4xl font-light tracking-wider">
            {query ? query : location.city || "Fetching location..."}
          </h3>

          {error && <p className="text-red-500">{error}</p>}
        </div>
        <TemperatureView weather={weather} />

        {weather && (
          <div className="flex items-center justify-center gap-10">
            <div className="flex flex-col items-center justify-center gap-3">
              <h5 className="text-2xl font-light tracking-wide">TODAY</h5>
              <div className="bg-red-200 h-10 w-10 "></div>
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
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
