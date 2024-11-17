import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-xl overflow-hidden w-full sm:max-w-lg lg:max-w-2xl ">
    <input
      aria-label="Search"
      placeholder="Search"
      type="search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="px-4 py-1.5 outline-none w-full rounded-l-xl text-sm sm:text-base"
    />
   <FaSearch
        className={`mx-2 w-4 h-4 sm:w-5 sm:h-5 ${isFocused ? "text-icons" : "text-gray-500"}`}
      />
  </div>
  );
}
