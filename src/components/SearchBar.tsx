import React from "react";

interface SearchBarProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchValue,
  setSearchValue,
}) => {
  return (
    <div className="relative mx-auto mb-8 max-w-2xl">
      <div className="relative w-full group">
        <input
          type="text"
          placeholder="What are you in the mood for? Type to search…"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full rounded-full border border-neutral-300 bg-neutral-100 px-6 py-4 pr-32 shadow-lg focus:outline-none  dark:border-neutral-700 dark:bg-neutral-200 dark:text-black relative z-10"
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 blur-xl opacity-0 transition-opacity duration-300 group-focus-within:opacity-35 animate-moveGradient z-0"></div>
      </div>

      <button className="absolute flex gap-2 right-2 top-1/2 -translate-y-1/2 rounded-full bg-black text-white px-6 py-2 z-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="24px"
          height="24px"
          fill="white"
        >
          <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
