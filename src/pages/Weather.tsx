import TemperatureView from "../components/weather/TemperatureView";
import SearchLocation from "../components/weather/SearchLocation";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

interface Location {
  city: null | string;
  country: null | string;
  loc: null | string;
}

const WeatherPage = () => {
  const [location, setLocation] = useState<Location>({
    city: null,
    country: null,
    loc: null,
  });

  const [error, setError] = useState<string | null>(null);

  async function getCurrentLocation() {
    try {
      const response = await fetch(
        `https://ipinfo.io/json?token=${process.env.GEOLOCATION_API_KEY}`
      );
      const data = await response.json();

      setLocation({
        loc: data.loc,
        city: data.city,
        country: data.country,
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Pls try again.");
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="wrapper">
      <div className="flex flex-col items-center justify-center gap-y-10">
        <SearchLocation />
        <div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-dark-gray">Current location</span>
            <IoLocationOutline />
          </div>
          <h3 className="text-4xl font-light tracking-wider">
            {location.city}
          </h3>

          {error && <p className="text-red-500">{error}</p>}
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
