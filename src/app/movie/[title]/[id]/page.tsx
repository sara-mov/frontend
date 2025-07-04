/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useRef, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Footer from "@/components/Footer";
import sara from "../../../../../public/sara.png";
import saraDark from "../../../../../public/sara-dark.png";
import { useTheme } from "@/context/ThemeContext";
import { useParams } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShapes } from "@fortawesome/free-solid-svg-icons";
import { getGenresById } from "@/utils/genres";
import WatchlistButton from "@/components/WatchlistButton";
import TrendingMovies from "@/components/TrendingMovies";
import ExpandableText from "@/components/ExpandableText";

const MoviePage = () => {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.01);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Decode movie query from URL
  const params = useParams();
  const { title, id } = params;

  interface Movie {
    backdrop_path: string;
    id: number;
    imdb_id: string;
    title: string;
    overview: string;
    release_date: string;
    runtime: number;
    adult: boolean;
    original_language: string;
    genres: { id: number }[];
    production_companies: { name: string }[];
  }

  interface MovieDetails {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: {
      Source: string;
      Value: string;
    }[];
    imdbRating: string;
    imdbVotes: string;
    Response: string;
  }

  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesDetails, setMoviesDetails] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("related");

  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch(`https://sara-mov.vercel.app/api/movies/detail/${id}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            setMovies([data]);
          })
          .catch((err) => console.error("Error fetching movies:", err));
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!movies || movies.length === 0) return;
    // const hasFetched = useRef(false);
    if (hasFetched.current) return;

    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://sara-mov.vercel.app/api/movies/more-detail/${movies[0]?.imdb_id}`
        );
        const data = await res.json();
        // console.log(data);
        setMoviesDetails([data]);
        setLoading(false);
      } catch (error) {
        console.error("API error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [movies]);

  function convertMinutes(X: number) {
    const hours = Math.floor(X / 60);
    const minutes = X % 60;
    return `${hours}h ${minutes}m`;
  }

  useEffect(() => {
    document.title = `${movies[0]?.title || "Movie"} - SARA`;
  }, [movies]);

  return (
    <SplashScreen isLoading={loading}>
      <div className="bg-gradient-to-br transition-colors duration-500 text-black dark:text-white from-neutral-200 dark:from-neutral-900 dark:to-neutral-900 to-neutral-200">
        <div className="mx-5 md:mx-20">
          {/* Header */}
          <div className="fixed top-0 left-0 w-full pt-5 px-5 md:px-16 py-4 z-20">
            <div
              className={`-z-10 absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isScrolled ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: isScrolled
                  ? theme === "light"
                    ? "linear-gradient(to bottom, #e5e5e5, rgba(229,229,229,0.8), transparent)"
                    : "linear-gradient(to bottom, #171717, rgba(23,23,23,0.8), transparent)"
                  : theme === "light"
                  ? "linear-gradient(to bottom, #e5e5e5, transparent)"
                  : "linear-gradient(to bottom, #171717, transparent)",
              }}
            ></div>
            <header className="flex items-center justify-between py-4">
              <div className="flex items-center gap-2">
                <Link href="/">
                  <Image
                    src={
                      theme === "light"
                        ? isScrolled
                          ? sara
                          : saraDark
                        : saraDark
                    }
                    alt="sara-logo"
                    height={24}
                  />
                </Link>
              </div>
              <div className="flex gap-7">
                <Link
                  href={"/browse/genres"}
                  className={` py-2 px-3 rounded-full -mr-4 hover:bg-opacity-50 ${
                    isScrolled
                      ? "hover:bg-white dark:hover:bg-black"
                      : "hover:bg-black"
                  } `}
                >
                  <FontAwesomeIcon
                    icon={faShapes}
                    className={`font-semibold ${
                      isScrolled ? " text-black dark:text-white" : " text-white"
                    }`}
                  />
                </Link>
                <button onClick={toggleTheme} className="rounded-full">
                  {theme === "light" ? (
                    <div
                      className={`h-5 w-5 ${
                        isScrolled ? "text-gray-900" : "text-gray-100"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        className="w-6 h-6"
                        viewBox="0 0 50 50"
                        fill="currentColor"
                      >
                        <path d="M 24.90625 3.96875 C 24.863281 3.976563 24.820313 3.988281 24.78125 4 C 24.316406 4.105469 23.988281 4.523438 24 5 L 24 11 C 23.996094 11.359375 24.183594 11.695313 24.496094 11.878906 C 24.808594 12.058594 25.191406 12.058594 25.503906 11.878906 C 25.816406 11.695313 26.003906 11.359375 26 11 L 26 5 C 26.011719 4.710938 25.894531 4.433594 25.6875 4.238281 C 25.476563 4.039063 25.191406 3.941406 24.90625 3.96875 Z M 10.65625 9.84375 C 10.28125 9.910156 9.980469 10.183594 9.875 10.546875 C 9.769531 10.914063 9.878906 11.304688 10.15625 11.5625 L 14.40625 15.8125 C 14.648438 16.109375 15.035156 16.246094 15.410156 16.160156 C 15.78125 16.074219 16.074219 15.78125 16.160156 15.410156 C 16.246094 15.035156 16.109375 14.648438 15.8125 14.40625 L 11.5625 10.15625 C 11.355469 9.933594 11.054688 9.820313 10.75 9.84375 C 10.71875 9.84375 10.6875 9.84375 10.65625 9.84375 Z M 39.03125 9.84375 C 38.804688 9.875 38.59375 9.988281 38.4375 10.15625 L 34.1875 14.40625 C 33.890625 14.648438 33.753906 15.035156 33.839844 15.410156 C 33.925781 15.78125 34.21875 16.074219 34.589844 16.160156 C 34.964844 16.246094 35.351563 16.109375 35.59375 15.8125 L 39.84375 11.5625 C 40.15625 11.265625 40.246094 10.800781 40.0625 10.410156 C 39.875 10.015625 39.460938 9.789063 39.03125 9.84375 Z M 25 15 C 19.484375 15 15 19.484375 15 25 C 15 30.515625 19.484375 35 25 35 C 30.515625 35 35 30.515625 35 25 C 35 19.484375 30.515625 15 25 15 Z M 4.71875 24 C 4.167969 24.078125 3.78125 24.589844 3.859375 25.140625 C 3.9375 25.691406 4.449219 26.078125 5 26 L 11 26 C 11.359375 26.003906 11.695313 25.816406 11.878906 25.503906 C 12.058594 25.191406 12.058594 24.808594 11.878906 24.496094 C 11.695313 24.183594 11.359375 23.996094 11 24 L 5 24 C 4.96875 24 4.9375 24 4.90625 24 C 4.875 24 4.84375 24 4.8125 24 C 4.78125 24 4.75 24 4.71875 24 Z M 38.71875 24 C 38.167969 24.078125 37.78125 24.589844 37.859375 25.140625 C 37.9375 25.691406 38.449219 26.078125 39 26 L 45 26 C 45.359375 26.003906 45.695313 25.816406 45.878906 25.503906 C 46.058594 25.191406 46.058594 24.808594 45.878906 24.496094 C 45.695313 24.183594 45.359375 23.996094 45 24 L 39 24 C 38.96875 24 38.9375 24 38.90625 24 C 38.875 24 38.84375 24 38.8125 24 C 38.78125 24 38.75 24 38.71875 24 Z M 15 33.875 C 14.773438 33.90625 14.5625 34.019531 14.40625 34.1875 L 10.15625 38.4375 C 9.859375 38.679688 9.722656 39.066406 9.808594 39.441406 C 9.894531 39.8125 10.1875 40.105469 10.558594 40.191406 C 10.933594 40.277344 11.320313 40.140625 11.5625 39.84375 L 15.8125 35.59375 C 16.109375 35.308594 16.199219 34.867188 16.039063 34.488281 C 15.882813 34.109375 15.503906 33.867188 15.09375 33.875 C 15.0625 33.875 15.03125 33.875 15 33.875 Z M 34.6875 33.875 C 34.3125 33.941406 34.011719 34.214844 33.90625 34.578125 C 33.800781 34.945313 33.910156 35.335938 34.1875 35.59375 L 38.4375 39.84375 C 38.679688 40.140625 39.066406 40.277344 39.441406 40.191406 C 39.8125 40.105469 40.105469 39.8125 40.191406 39.441406 C 40.277344 39.066406 40.140625 38.679688 39.84375 38.4375 L 35.59375 34.1875 C 35.40625 33.988281 35.148438 33.878906 34.875 33.875 C 34.84375 33.875 34.8125 33.875 34.78125 33.875 C 34.75 33.875 34.71875 33.875 34.6875 33.875 Z M 24.90625 37.96875 C 24.863281 37.976563 24.820313 37.988281 24.78125 38 C 24.316406 38.105469 23.988281 38.523438 24 39 L 24 45 C 23.996094 45.359375 24.183594 45.695313 24.496094 45.878906 C 24.808594 46.058594 25.191406 46.058594 25.503906 45.878906 C 25.816406 45.695313 26.003906 45.359375 26 45 L 26 39 C 26.011719 38.710938 25.894531 38.433594 25.6875 38.238281 C 25.476563 38.039063 25.191406 37.941406 24.90625 37.96875 Z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="h-5 w-5 text-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 3a9 9 0 1 0 8.485 11.029A7 7 0 0 1 12 3z" />
                      </svg>
                    </div>
                  )}
                </button>
                {session ? (
                  <button
                    onClick={() => signOut()}
                    className={`rounded-full px-6 py-2 font-semibold ${
                      isScrolled
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-white text-black"
                    }`}
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/sign-in"
                    className={`rounded-full px-6 py-2 font-semibold ${
                      isScrolled
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-white text-black"
                    }`}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </header>
          </div>
          {movies.length === 0 ? (
            ""
          ) : (
            <>
              <div className="cinema-element-container img">
                <div
                  className={`backdrop-element ${
                    theme === "light" ? "" : "dark"
                  }`}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w1280${movies[0].backdrop_path}`}
                    alt={movies[0].title}
                    fill
                    priority
                    className="object-cover object-top image-layer transition-all duration-500"
                  />
                </div>
              </div>

              <div className="absolute inset-0 flex flex-col justify-end mb-[20vh] md:mb-0 md:justify-center px-4 sm:px-10 lg:px-20 text-white">
                <div
                  className={`${
                    movies[0].genres?.some((genre) => genre.id === 27)
                      ? "font-mentalMania"
                      : "font-montserrat"
                  }`}
                >
                  <h1
                    className={`text-left font-bold leading-tight my-4 title ${
                      movies[0].genres?.some((genre) => genre.id === 27)
                        ? "text-3xl sm:text-4xl md:text-5xl text-[#8B0000] drop-shadow-[4px_4px_0px_#400000]"
                        : "text-2xl sm:text-3xl md:text-4xl"
                    }`}
                  >
                    {movies[0].title}
                  </h1>

                  <div
                    className={`${
                      movies[0].genres?.some((genre) => genre.id === 27)
                        ? "text-base"
                        : "text-sm"
                    }`}
                  >
                    <ExpandableText text={movies[0].overview} />

                    <div className="flex flex-wrap gap-2 font-bold mt-2 info text-xs sm:text-sm">
                      <span>
                        {movies[0].production_companies[0]?.name || "Unknown"}
                      </span>
                      <span>
                        {movies[0].release_date
                          ? movies[0].release_date.slice(0, 4)
                          : "N/A"}
                      </span>
                      <span className="bg-neutral-600 px-1 rounded-[2px]">
                        {movies[0].adult ? "A" : "U/A"}
                      </span>
                      <span>{convertMinutes(movies[0].runtime)}</span>
                      {moviesDetails[0]?.imdbRating !== "N/A" && (
                        <span>
                          <span className="bg-[#f3ce13] px-1 rounded-[2px] text-black mr-2">
                            IMDb
                          </span>
                          {moviesDetails[0]?.imdbRating}
                        </span>
                      )}
                      <span>
                        {movies[0].original_language === "en"
                          ? "English"
                          : movies[0].original_language === "hi"
                          ? "हिन्दी"
                          : movies[0].original_language.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex flex-wrap font-bold mt-2 genres text-sm">
                      <span className="text-green-500">
                        {getGenresById(
                          movies[0].genres.map((genre) => genre.id)
                        ).map((genre, index, array) => (
                          <React.Fragment key={index}>
                            {genre}
                            {index < array.length - 1 && (
                              <span className="text-white"> • </span>
                            )}
                          </React.Fragment>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="z-10 relative w-full sm:w-[90%] lg:w-[55%] mt-6 flex flex-row items-start gap-4">
                  <Link
                    href={`https://www.imdb.com/title/${movies[0].imdb_id}`}
                    target="_blank"
                    className="px-6 py-2 bg-[#f3ce13] text-black font-semibold rounded-md shadow-md hover:bg-[#f3ce13ab] transition duration-300 active:scale-95 text-center w-full sm:w-auto"
                  >
                    IMDb Page
                  </Link>

                  <Link
                    href={`https://www.google.com/search?q=${movies[0].title} Watch Online`}
                    target="_blank"
                    className="px-6 py-2 bg-white text-black font-medium rounded-md shadow-md hover:bg-gray-300 transition duration-300 active:scale-95 text-center w-full sm:w-auto"
                  >
                    Watch Now
                  </Link>

                  <WatchlistButton
                    movie={movies[0]}
                    movieId={movies[0].id}
                    className="w-full h-full sm:w-auto flex justify-center items-center px-4 py-2 text-white font-medium rounded-md border border-blue-700 shadow-md bg-blue-600 hover:bg-blue-700 transition-all duration-300 active:scale-95"
                  />
                </div>
              </div>
            </>
          )}

          <div className=" mt-[100vh] relative z-10">
            <div className="w-full py-4">
              {/* Tab Headers */}
              <div className="flex gap-6 border-b border-gray-600 text-lg">
                <button
                  className={`pb-2 ${
                    activeTab === "related"
                      ? "border-b-2 border-black dark:border-white font-semibold"
                      : "text-gray-600 dark:text-gray-500"
                  }`}
                  onClick={() => setActiveTab("related")}
                >
                  Related
                </button>

                <button
                  className={`pb-2 ${
                    activeTab === "details"
                      ? "border-b-2 border-black dark:border-white font-semibold"
                      : "text-gray-600 dark:text-gray-500"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  Details
                </button>
              </div>

              {/* Tab Content */}
              <div className="mt-7">
                {activeTab === "related" && (
                  <div>
                    {/* <h2 className="text-lg font-semibold mb-2">
                      More like this
                    </h2> */}
                    <TrendingMovies />
                  </div>
                )}

                {activeTab === "details" && (
                  <div>
                    <h2 className="text-lg font-semibold mb-2">More Details</h2>
                    {moviesDetails[0].Response === "False" ? (
                      "Nothing to see here..."
                    ) : (
                      <>
                        {moviesDetails[0].Plot !== "N/A" && (
                          <>
                            <p className="text-2xl font-bold mt-4">Plot</p>
                            <p className="text-gray-900 dark:text-gray-300 text-lg text-justify w-full max-w-2xl">
                              {moviesDetails[0].Plot}
                            </p>
                          </>
                        )}

                        {moviesDetails[0].Director !== "N/A" && (
                          <>
                            <p className="text-2xl font-bold mt-4">Director</p>
                            <p className="text-gray-900 dark:text-gray-300 text-lg w-full max-w-2xl">
                              {moviesDetails[0].Director}
                            </p>
                          </>
                        )}

                        {moviesDetails[0].Actors !== "N/A" && (
                          <>
                            <p className="text-2xl font-bold mt-4">Actors</p>
                            <p className="text-gray-900 dark:text-gray-300 text-lg w-full max-w-2xl">
                              {moviesDetails[0].Actors}
                            </p>
                          </>
                        )}

                        {moviesDetails[0].Awards !== "N/A" && (
                          <>
                            <p className="text-2xl font-bold mt-4">Awards</p>
                            <p className="text-gray-900 dark:text-gray-300 text-lg w-full max-w-2xl">
                              {moviesDetails[0].Awards}
                            </p>
                          </>
                        )}

                        {moviesDetails[0].Country !== "N/A" && (
                          <>
                            <p className="text-2xl font-bold mt-4">Country</p>
                            <p className="text-gray-900 dark:text-gray-300 text-lg w-full max-w-2xl">
                              {moviesDetails[0].Country}
                            </p>
                          </>
                        )}

                        {moviesDetails[0].Ratings.length > 0 && (
                          <div className="mt-4 w-full max-w-2xl">
                            <p className="text-2xl font-bold">Ratings</p>
                            {moviesDetails[0].Ratings.map((rating, index) => (
                              <span
                                key={index}
                                className="block text-gray-900 dark:text-gray-300"
                              >
                                {rating.Source} - {rating.Value}
                              </span>
                            ))}
                          </div>
                        )}

                        {moviesDetails[0].Rated !== "N/A" && (
                          <>
                            <p className="text-2xl font-bold mt-4">Rated</p>
                            <p className="text-gray-900 dark:text-gray-300 text-lg w-full max-w-2xl">
                              {moviesDetails[0].Rated}
                            </p>
                          </>
                        )}

                        {moviesDetails[0].imdbRating !== "N/A" && (
                          <>
                            <p className="text-2xl font-bold mt-4">
                              IMDb Rating
                            </p>
                            <p className="text-gray-900 dark:text-gray-300 text-lg w-full max-w-2xl">
                              {moviesDetails[0].imdbRating}
                            </p>
                          </>
                        )}

                        {moviesDetails[0].imdbVotes !== "N/A" && (
                          <>
                            <p className="text-2xl font-bold mt-4">
                              IMDb Votes
                            </p>
                            <p className="text-gray-900 dark:text-gray-300 text-lg w-full max-w-2xl">
                              {moviesDetails[0].imdbVotes}
                            </p>
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className=" mt-[10vh] relative z-10">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </SplashScreen>
  );
};

export default MoviePage;
