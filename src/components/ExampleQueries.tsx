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
    <div>
      <button
        onClick={() => setSearchValue(title)}
        className="flex items-center gap-2 rounded-full bg-white/50 dark:bg-white/80 px-4 py-2 hover:bg-white/80 dark:hover:bg-white/100"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <div>
          <p>&quot;{title}&quot;</p>
          <i>({description})</i>
        </div>
      </button>
    </div>
  );
};

export default ExampleQueries;
