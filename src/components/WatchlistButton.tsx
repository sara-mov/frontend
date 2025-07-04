"use client";

import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

interface WatchlistButtonProps {
  movie: { id: number; [key: string]: any };
  movieId: number;
  className: string;
}

export default function WatchlistButton({
  movie,
  movieId,
  className,
}: WatchlistButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoveredWatchlist, setHoveredWatchlist] = useState(0);

  // console.log(movie);

  useEffect(() => {
    async function checkWatchlist() {
      const res = await fetch(`/api/watchlist?movie_id=${movieId}`);
      const data = await res.json();
      if (res.ok) {
        setIsAdded(data.saved);
      }
      setIsAdded(data.saved);
    }
    checkWatchlist();
  }, [movieId]);

  async function toggleWatchlist() {
    setLoading(true);

    const res = await fetch("/api/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie, movieId }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setIsAdded(data.saved);
      window.location.reload();
    }
  }

  return (
    <div className="relative flex flex-col items-center group h-full">
      <button
        onClick={toggleWatchlist}
        className={className}
        disabled={loading}
        onMouseEnter={() => setHoveredWatchlist(1)}
        onMouseLeave={() => setHoveredWatchlist(0)}
      >
        <FontAwesomeIcon
          icon={isAdded ? faCheck : faPlus}
          className="text-lg transition-transform duration-200 ease-out transform active:scale-90"
        />
      </button>
      {hoveredWatchlist === 1 && (
        <span className="absolute w-max text-col -top-10 right-0 px-2 py-1 text-sm text-white bg-gray-900 border border-gray-800 rounded-[4px] transition duration-300 z-[999] ">
          {isAdded ? "Remove from Watchlist" : "Add to Watchlist"}
        </span>
      )}
    </div>
  );
}
