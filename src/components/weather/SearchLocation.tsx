import { KeyboardEvent, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";

const SearchLocation = () => {
  const [query, setQuery] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearch(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (query.trim() !== "") {
        searchParams.set("location", query);
        setSearchParams(searchParams);
        setQuery("");
      } else {
        searchParams.delete("location");
      }
    }
  }

  return (
    <div className="w-[350px] flex bg-soft-gray rounded-full py-2.5 px-4 focus:shadow-sm">
      <input
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        onKeyDown={handleSearch}
        type="text"
        placeholder="Search ..."
        className="  w-full focus:outline-none focus:border-0 "
      />
      <button className="">
        <LuSearch cursor="pointer" className="hover:scale-110 hoverEffect" />
      </button>
    </div>
  );
};

export default SearchLocation;
