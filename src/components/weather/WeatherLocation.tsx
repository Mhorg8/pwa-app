import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Location } from "../../types";

interface Props {
  location: Location;
  currentLocation: number;
  setCurrentLocation: (state: number) => void;
}
const WeatherLocation = ({
  location,
  currentLocation,
  setCurrentLocation,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("location");
  function handleChageLocation() {
    if (currentLocation === 0) {
      setCurrentLocation(1);
    } else {
      searchParams.delete("location", query as string);
      setSearchParams(searchParams);
      setCurrentLocation(0);
    }
  }

  useEffect(() => {
    setCurrentLocation(1);
  }, [query]);
  return (
    <div className="w-full flex items-center  relative">
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="flex items-center gap-1">
          <span className="text-sm text-dark-gray">
            {currentLocation === 0 ? "Your location" : "Location"}
          </span>
          <IoLocationOutline />
        </div>
        <button
          onMouseUpCapture={handleChageLocation}
          className={`text-4xl font-light tracking-wider cursor-grab select-auto `}
        >
          {currentLocation === 0
            ? location.city
            : query
            ? query
            : "Enter city name"}
        </button>

        <button
          disabled={currentLocation === 1}
          onClick={handleChageLocation}
          className={`absolute top-1/2 -translate-y-1/2 right-0 ${
            currentLocation === 1 && "cursor-not-allowed"
          }`}
        >
          <LuChevronRight size={24} />
        </button>

        <button
          onClick={handleChageLocation}
          disabled={currentLocation === 0}
          className={`absolute top-1/2 -translate-y-1/2 left-0 ${
            currentLocation === 0 && "cursor-not-allowed"
          }`}
        >
          <LuChevronLeft size={24} />
        </button>
      </div>
    </div>
  );
};

export default WeatherLocation;
