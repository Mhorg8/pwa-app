import TemperatureView from "../components/weather/TemperatureView";
import SearchLocation from "../components/weather/SearchLocation";
import { useEffect, useState } from "react";
import { Location, Weather } from "../types";
import { useSearchParams } from "react-router-dom";
import WeatherLocation from "../components/weather/WeatherLocation";
import WeatherInformation from "../components/weather/WeatherInformation";

const WeatherPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [currentLocation, setCurrentLocation] = useState<number>(0);

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
        // destrachring lat and log form location
        const [lat, lon] = location.loc ? location.loc.split(",") : [];
        const API_KEY = "1399b4e72604b09f14d6522be3095722";
        const getWeatherByCity = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`;
        const getWeatherByCurrentLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        // fetcing data conditionaly when have query or NOT
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

  return (
    <div className="wrapper">
      <div className="flex flex-col items-center justify-center gap-y-10">
        <SearchLocation />
        <WeatherLocation
          location={location}
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
        />
        {error && <p className="text-red-500">{error}</p>}
        <TemperatureView weather={weather} />
        {weather && <WeatherInformation weather={weather} />}
      </div>
    </div>
  );
};

export default WeatherPage;
