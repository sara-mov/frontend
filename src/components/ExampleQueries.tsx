import React from "react";

interface ExampleQueriesProps {
  title: string;
  description: string;
  setSearchValue: (title: string) => void;
}

const ExampleQueries = ({
  title,
  description,
  setSearchValue,
}: ExampleQueriesProps) => {
  return (
    <div className="w-full sm:w-auto">
  <button
    onClick={() => setSearchValue(title)}
    className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 rounded-full bg-white/50 dark:bg-white/80 px-4 py-2 hover:bg-white/80 dark:hover:bg-white/100 transition duration-200"
  >
    <svg
      className="h-4 w-4 mt-1 sm:mt-0 ml-2 lg:ml-0 text-black dark:text-black"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
    <div className="text-left sm:text-start text-sm text-black dark:text-black pl-5 lg:pl-0 ">
      <p className="font-medium">&quot;{title}&quot;</p>
      <i className="block text-xs opacity-80">({description})</i>
    </div>
  </button>
</div>
  );
};

export default ExampleQueries;
