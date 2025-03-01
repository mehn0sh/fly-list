import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useGetFlightsBySearchQuery } from "../services/flightAPI";

const SearchBar = ({ handleSelectFlight, search, setSearch ,setSelectedFlight}) => {
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const { data: searchResults = [], isLoading } = useGetFlightsBySearchQuery(
    debouncedSearch,
    { skip: !debouncedSearch }
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!value) setSelectedFlight(null);
  };

  return (
    <section className=" flex flex-col items-center relative mb-14 w-full">
      <div className="bg-blue-50 rounded-2xl w-[60%] mt-4 flex items-center justify-between p-4 overflow-hidden">
        <input
          type="text"
          className="px-5 text-xl max-w-[70%] flex-1/2 outline-none "
          placeholder="Search..."
          autoComplete="off"
          value={search}
          onChange={(e) => handleSearchChange(e)}
        />
        <div className="cursor-pointer">
          {search ? (
            <CloseIcon onClick={() => setSearch("")} />
          ) : (
            <SearchIcon />
          )}
        </div>
      </div>
      {search && searchResults.length > 0 && (
        <div className="bg-blue-50 w-[50%] p-3 rounded-xl mt-0.5 absolute top-[80px] z-10">
          {searchResults.map((flight) => (
            <a
              key={flight.id}
              href="#"
              className="search_suggestion_line block p-2 hover:bg-blue-100"
              onClick={() => handleSelectFlight(flight)}
            >
              {flight.from} → {flight.to}
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchBar;
