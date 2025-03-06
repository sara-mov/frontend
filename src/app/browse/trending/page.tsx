"use client";

import React, { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp, faPlay } from "@fortawesome/free-solid-svg-icons";
import { getGenresById } from "@/utils/genres";
import Navbar from "@/components/Navbar";
import WatchlistButton from "@/components/WatchlistButton";

const TrendingPage = () => {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.01) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  interface Movie {
    backdrop_path: string;
    id: number;
    title: string;
    overview: string;
    release_date: string;
    runtime: string;
    adult: boolean;
    original_language: string;
    genre_ids: number[];
  }

  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch("/api/movies/trending", { method: "GET" })
          .then((res) => res.json())
          .then((data) => {
            setTrendingMovies(data.results);
            setLoading(false);
          })
          .catch((err) => console.error("Error fetching movies:", err));
      } catch (error) {
        console.error("API error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // console.log(trendingMovies);

  const [hoveredMovie, setHoveredMovie] = useState(0);
  return (
    <SplashScreen isLoading={loading}>
      <div className="bg-gradient-to-br transition duration-200 text-black dark:text-white from-neutral-100 dark:from-neutral-800 dark:to-neutral-900 to-neutral-200 min-h-screen">
        <div className="mx-20 pt-32">
          <div className="fixed top-0 left-0 w-full pt-5 px-16 mr-0 py-4 z-20">
            {/* Default Background */}

            <div
              className={` -z-10 absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isScrolled ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: isScrolled
                  ? theme === "light"
                    ? "linear-gradient(to bottom, #e5e5e5, rgba(229,229,229,0.8), transparent)"
                    : "linear-gradient(to bottom, #262626, rgba(38,38,38,0.8), transparent)"
                  : theme === "light"
                  ? "linear-gradient(to bottom, #e5e5e5,  transparent)"
                  : "linear-gradient(to bottom, #262626, transparent)",
              }}
            ></div>
            <Navbar />
          </div>
          <h2 className="text-2xl pb-10 text-center font-bold ">
            <FontAwesomeIcon icon={faArrowTrendUp} className="pr-3" />
            Trending Movies Across the Globe
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
            {trendingMovies.map((movie, index) => (
              <div
                key={movie.id}
                className="relative group"
                onMouseEnter={() => setHoveredMovie(movie.id)}
                onMouseLeave={() => setHoveredMovie(0)}
              >
                <div className="relative cursor-pointer">
                  <Image
                    src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                    alt={movie.title}
                    width={640}
                    height={360}
                    className="w-full h-auto rounded-[6px] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute transition-transform duration-500 group-hover:scale-105 inset-0 group-hover:bg-transparent bg-gradient-to-t from-[#000000bc] to-transparent rounded-[6px]"></div>
                </div>
                <div
                  className={`absolute  left-[10px] right-[10px] text-white bottom-[10px]`}
                >
                  <div className="font-semibold text-sm truncate">
                    {movie.title}
                  </div>
                </div>
                {hoveredMovie === movie.id && (
                  <div
                    className="absolute w-[320px] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out bg-[linear-gradient(to_top,#000000_20%,#000000_75%,transparent_100%)] bg-opacity-90 text-white rounded-[8px] shadow-lg overflow-hidden z-[999]"
                    style={{
                      top: "-30%",
                      left: "0",
                      right: "auto",
                      transform:
                        index % 6 === 0
                          ? "translateX(-6.5%)"
                          : "translateX(-6.5%)",
                    }}
                  >
                    <Link
                      href={`/movie/${movie.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^\w-]/g, "")}/${movie.id}`}
                      className="relative cursor-pointer"
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                        alt={movie.title}
                        width={640}
                        height={360}
                        className="w-full h-auto rounded-[6px] transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute transition-transform duration-500 group-hover:scale-105 inset-0 group-hover:bg-transparent bg-[linear-gradient(to_top,#000000_1%,transparent_100%)] rounded-[6px]"></div>
                    </Link>
                    <div className="p-4">
                      <Link
                        href={`/movie/${movie.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                          .replace(/[^\w-]/g, "")}/${movie.id}`}
                        className="cursor-pointer"
                      >
                        <h3 className="text-lg font-bold">{movie.title}</h3>
                        <p className="text-xs font-bold text-gray-400 mt-1">
                          {movie.release_date
                            ? movie.release_date.slice(0, 4)
                            : "N/A"}{" "}
                          {/* • {movie.rating} • {convertMinutes(movie.runtime)}  */}
                          • {movie.adult ? "A" : "U/A"} •{" "}
                          {movie.original_language === "en"
                            ? "English"
                            : movie.original_language === "hi"
                            ? "हिन्दी"
                            : movie.original_language.toUpperCase()}{" "}
                        </p>
                        <strong className="text-xs text-green-500">
                          {getGenresById(movie.genre_ids).join(" • ")}
                        </strong>
                        <p className="text-sm text-gray-300 mt-2 line-clamp-3">
                          {movie.overview}
                        </p>
                      </Link>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          onClick={() =>
                            window.open(
                              `https://www.google.com/search?q=${movie.title} Watch Online`,
                              "_blank"
                            )
                          }
                          className="flex-1 bg-white text-black py-2 px-4 rounded-[6px] font-semibold shadow-md hover:bg-gray-300 transition duration-300 ease-in-out active:scale-95 text-center"
                          style={{ borderRadius: "4px" }}
                        >
                          <FontAwesomeIcon icon={faPlay} className="pr-2" />{" "}
                          Watch Now
                        </button>
                        <div className="relative flex flex-col items-center group min-h-full">
                          <div>
                            <WatchlistButton
                              movie={movie}
                              movieId={movie.id}
                              className="w-10 h-10 flex items-center justify-center bg-gray-700 bg-opacity-50 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Footer />
        </div>
      </div>
    </SplashScreen>
  );
};

export default TrendingPage;
