import { useState } from "react";

export default function SearchBar({ onSearch, className = "" }) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch?.({ keyword, location });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-surface-container-lowest rounded-full shadow-sm border border-surface-variant p-2 flex flex-col md:flex-row items-center gap-2 hover:shadow-md transition-shadow duration-300 ${className}`}
    >
      <div className="flex-1 flex items-center px-4 w-full">
        <span className="material-symbols-outlined text-outline mr-3">
          search
        </span>
        <input
          className="w-full bg-transparent border-none focus:ring-0 text-body-lg text-on-surface placeholder-on-surface-variant outline-none py-3"
          placeholder="Job title, keywords, or company"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className="hidden md:block w-px h-8 bg-surface-variant mx-2" />
      <div className="flex-1 flex items-center px-4 w-full border-t border-surface-variant md:border-t-0 pt-2 md:pt-0 mt-2 md:mt-0">
        <span className="material-symbols-outlined text-outline mr-3">
          location_on
        </span>
        <input
          className="w-full bg-transparent border-none focus:ring-0 text-body-lg text-on-surface placeholder-on-surface-variant outline-none py-3"
          placeholder="City, state, or zip"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full md:w-auto bg-primary text-on-primary text-label-md px-8 py-4 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-colors mt-2 md:mt-0 whitespace-nowrap shadow-sm"
      >
        Search
      </button>
    </form>
  );
}
