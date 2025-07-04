"use client";

import { getGenresById } from "@/utils/genres";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function WatchlistContainer() {
  interface Movie {
    backdrop_path: string;
    id: string;
    movie_id: number;
    title: string;
    overview: string;
    release_date: string;
    runtime: string;
    adult: boolean;
    original_language: string;
    genre_ids: number[];
  }

  const [watchlistMovies, setWatchlist] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  async function fetchWatchlist() {
    const res = await fetch("/api/watchlist");
    const data = await res.json();
    if (data.watchlist) setWatchlist(data.watchlist);
    setLoading(false);
  }

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [startIndex, setStartIndex] = useState(0);
  const [visibleMovies, setVisibleMovies] = useState(5);

  useEffect(() => {
    const updateVisibleMovies = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setVisibleMovies(5);
      } else if (width >= 1024) {
        setVisibleMovies(4);
      } else if (width >= 768) {
        setVisibleMovies(3);
      } else {
        setVisibleMovies(watchlistMovies.length);
      }
    };

    updateVisibleMovies();
    window.addEventListener("resize", updateVisibleMovies);

    return () => window.removeEventListener("resize", updateVisibleMovies);
  }, [watchlistMovies.length]);

  const handleNext = () => {
    if (startIndex + visibleMovies < watchlistMovies.length) {
      setStartIndex(startIndex + 5);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 5);
    }
  };

  const [seeAll, setSeeAll] = useState(0);
  console.log(watchlistMovies);

  return (
    <>
      {loading ? (
        <p></p>
      ) : watchlistMovies.length === 0 ? (
        <p></p>
      ) : (
        <div
          onMouseEnter={() => setSeeAll(1)}
          onMouseLeave={() => setSeeAll(0)}
        >
          <div className="flex justify-between">
            <span className="font-bold text-lg lg:text-xl">
              Watchlist
            </span>
            {seeAll === 1 && window.innerWidth > 768 && (
              <Link
                href={"/browse/trending"}
                className="hidden sm:inline font-bold text-base lg:text-lg text-neutral-600 hover:text-black dark:text-neutral-500 dark:hover:text-white"
              >
                View All <FontAwesomeIcon icon={faAngleRight} />
              </Link>
            )}
            {window.innerWidth <= 768 && (
              <Link
                href={"/browse/trending"}
                className="inline font-bold text-base text-neutral-600 hover:text-black dark:text-neutral-500 dark:hover:text-white"
              >
                View All <FontAwesomeIcon icon={faAngleRight} />
              </Link>
            )}
          </div>

          <div className="relative w-full">
            {/* Left Button (only on desktop) */}
            {startIndex > 0 && (
              <button
                className="hidden md:block absolute left-0 top-0 h-full md:h-[69%] bg-gradient-to-r from-[#000000] via-[#000000bc] to-transparent text-white pl-3 pr-7 py-2 z-20"
                onClick={handlePrev}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
            )}

            {/* Movie Container */}
            <div className="flex gap-1 md:gap-2 lg:gap-4 items-start my-5 w-full md:h-[180px] overflow-x-auto md:overflow-x-visible scroll-snap-x snap-mandatory scrollbar-hide">
              {watchlistMovies
                .slice(startIndex, startIndex + visibleMovies)
                .map((movie) => (
                  <Link
                    href={`/movie/${movie.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^\w-]/g, "")}/${movie.movie_id}`}
                    key={movie.movie_id}
                    className="flex-shrink-0 snap-start flex flex-col items-center"
                  >
                    <div
                      className={`relative cursor-pointer rounded-[4px] overflow-hidden transition-all duration-300 delay-100 ease-in-out group w-[120px] aspect-[3/4] md:h-[125px] md:w-[25.25vw] lg:w-[19.75vw] xl:w-[16.32vw] md:aspect-[222/125] border-2 border-transparent z-10              ${
                        hoveredIndex === movie.movie_id ? "hover:z-50" : ""
                      } ${"md:hover:scale-150 md:hover:h-[180px] md:hover:border-white md:hover:rounded-[6px]"}`}
                      onMouseEnter={() => setHoveredIndex(movie.movie_id)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div className="w-[120px] aspect-[3/4] md:w-full md:h-[125px] relative">
                        <Image
                          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                          alt={`${movie.title}`}
                          fill
                          priority
                          placeholder="blur"
                          blurDataURL={`https://image.tmdb.org/t/p/w185${movie.backdrop_path}`}
                          className="object-cover rounded-t-[4px]"
                        />
                        <div className="absolute inset-0 group-hover:bg-transparent bg-gradient-to-t from-[#000000bc] to-transparent rounded-t-[4px]" />
                      </div>

                      <div
                        className={`absolute left-[10px] right-[10px] text-white ${
                          hoveredIndex === movie.movie_id
                            ? "bottom-[10px] md:bottom-[38%]"
                            : "bottom-[10px]"
                        }`}
                      >
                        <div className="font-semibold text-sm truncate">
                          {movie.title}
                        </div>
                      </div>

                      {/* Additional Movie Details (hidden on mobile) */}
                      <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-[linear-gradient(to_top,#000000_20%,#000000_75%,transparent_100%)] text-white text-[10px] p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto">
                        <div className="text-[8px] line-clamp-2 leading-tight overflow-hidden text-ellipsis ml-1">
                          {movie.overview}
                        </div>
                        <div className="flex gap-2 mt-1 ml-1 text-gray-300">
                          <p>
                            <strong>
                              {movie.release_date
                                ? movie.release_date.slice(0, 4)
                                : "N/A"}
                            </strong>
                          </p>
                          <strong className="bg-neutral-600 px-1 mb-1 rounded-[2px]">
                            {movie.adult ? "A" : "U/A"}
                          </strong>
                          <p>
                            <strong>
                              {movie.original_language === "en"
                                ? "English"
                                : movie.original_language === "hi"
                                ? "हिन्दी"
                                : movie.original_language.toUpperCase()}
                            </strong>
                          </p>
                        </div>
                        <strong className="mt-1 ml-1 text-[10px] text-green-500">
                          {getGenresById(movie.genre_ids).join(" • ")}
                        </strong>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>

            {/* Right Button (only on desktop) */}
            {startIndex + visibleMovies < watchlistMovies.length && (
              <button
                className="hidden md:block absolute right-[-2px] top-0 h-full md:h-[69%] bg-gradient-to-l from-[#000000] via-[#000000bc] to-transparent text-white pr-3 pl-7 py-2 z-20"
                onClick={handleNext}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
