/* eslint-disable prefer-const */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Footer from "@/components/Footer";
import sara from "../../../../public/sara.png";
import saraDark from "../../../../public/sara-dark.png";
import { useTheme } from "@/context/ThemeContext";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { getGenresById } from "@/utils/genres";

const movies = [
  {
    id: 61202,
    backdrop_path: "/z4k7b66jAHP8sQbEahxss6Ct8BW.jpg",
    title: "Zindagi Na Milegi Dobara",
    overview: `Three friends who were inseparable in childhood decide to go on a three-week-long bachelor road trip to Spain, in order to re-establish their bond and explore thrilling adventures, before one of them gets married. What will they learn of themselves and each other during the adventure?`,
    production_companies: "Excel Entertainment",
    release_date: "2011-07-15",
    adult: false,
    runtime: 154,
    rating: "8.2",
    original_language: "hi",
    genres: ["Drama", "Comedy", "Romantic"],
    imdb_id: "tt1562872",
  },
  {
    id: 14752,
    backdrop_path: "/27dhih2lFlBl0oIUE9jFwIEBIMg.jpg",
    title: "Dil Chahta Hai",
    overview:
      "Three inseparable childhood friends Akash, Sameer and Sid navigate love, heartbreak, and personal growth as they transition into adulthood. A memorable trip to Goa becomes a turning point in their lives, testing the strength of their friendship.",
    production_companies: "Excel Entertainment",
    release_date: "2001-07-24",
    adult: false,
    runtime: 183,
    rating: "8.1",
    original_language: "hi",
    genres: ["Drama", "Comedy", "Romantic"],
    imdb_id: "tt0292490",
  },
  {
    id: 185008,
    backdrop_path: "/Wi9bgiwfJPYKFcJIiUqCNDFNtf.jpg",
    title: "Yeh Jawaani Hai Deewani",
    overview:
      "A free-spirited traveler, Bunny, reunites with his childhood friends on a trekking trip. As they explore the beauty of the mountains, love and ambitions intertwine, making them question their life choices.",
    production_companies: "Dharma Productions",
    release_date: "2013-05-31",
    adult: false,
    runtime: 160,
    rating: "7.2",
    original_language: "hi",
    genres: ["Drama", "Comedy", "Romantic"],
    imdb_id: "tt2178470",
  },
  {
    id: 339274,
    backdrop_path: "/1um3EJQlJoSiRI34MVIoG610OzR.jpg",
    title: "Tamasha",
    overview:
      "Ved and Tara meet in Corsica and decide to enjoy their vacation without revealing their real identities. Years later, their paths cross again, forcing Ved to confront his monotonous life and rediscover his passion for storytelling.",
    production_companies: "Nadiadwala Grandson Entertainment",
    release_date: "2015-11-27",
    adult: false,
    runtime: 139,
    rating: "7.3",
    original_language: "hi",
    genres: ["Drama", "Romance"],
    imdb_id: "tt3148502",
  },
  {
    id: 247645,
    backdrop_path: "/laKTtxs7jq64sDHzvbjeT7V2oBa.jpg",
    title: "Queen",
    overview:
      "After being left at the altar, a timid Delhi girl, Rani, embarks on a solo honeymoon trip across Europe. Along the way, she gains confidence, independence, and a new perspective on life.",
    production_companies: "Viacom18 Studios",
    release_date: "2014-03-07",
    adult: false,
    runtime: 146,
    rating: "8.2",
    original_language: "हिन्दी",
    genres: ["Drama", "Comedy"],
    imdb_id: "tt3322420",
  },
];

const RecommendPage = () => {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  // Decode movie title from URL
  const params = useParams();
  const movieTitle = decodeURIComponent(
    Array.isArray(params.title) ? params.title[0] : params.title || ""
  );

  // Handle cases where no movie title is found
  if (!movieTitle) return notFound();

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

  useEffect(() => {
    fetch("/api/movies/trending", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setTrendingMovies(data.results))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  //console.log(trendingMovies);

  function convertMinutes(X: number) {
    const hours = Math.floor(X / 60);
    const minutes = X % 60;
    return `${hours}h ${minutes}m`;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.01);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const backdrop = "/znmd-backdrop.png";

  const [scrollProgress, setScrollProgress] = useState(0);

  // carousel handling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.01);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // const [animationClass, setAnimationClass] = useState("in");

  const nextSlide = () => {
    // setAnimationClass("out");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    setProgress(0);

    // setTimeout(() => {
    //   setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    //   setAnimationClass("in");
    //   setProgress(0);
    // }, 700);
  };

  const prevSlide = () => {
    // setAnimationClass("out");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
    setProgress(0);

    // setTimeout(() => {
    //   setCurrentIndex((prevIndex) =>
    //     prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    //   );
    //   setProgress(0);
    //   setAnimationClass("in");
    // }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000); // Change to 10 seconds

    const progressInterval = setInterval(() => {
      setProgress(100); // 10s = 100%
    }, 10000); // Update every 100ms for smooth effect

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [currentIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress * 2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [added, setAdded] = useState(false);

  const toggleWatchlist = () => {
    setAdded(!added);
  };

  const [startIndex, setStartIndex] = useState(0);
  const visibleMovies = 5; // Adjust based on how many items you want to show at a time

  const handleNext = () => {
    if (startIndex + visibleMovies < trendingMovies.length) {
      setStartIndex(startIndex + 5);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 5);
    }
  };

  return (
    <SplashScreen duration={2000}>
      <div className="bg-gradient-to-br transition-colors duration-500 text-black dark:text-white from-neutral-200 dark:from-neutral-900 dark:to-neutral-900 to-neutral-200">
        <div className="mx-20">
          {/* Header */}
          <div className="fixed top-0 left-0 w-full pt-5 px-16 py-4 z-20">
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
          {/* Background Image */}
          <div className="cinema-element-container img">
            <div
              className={`backdrop-element ${theme === "light" ? "" : "dark"}`}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w1280${movies[currentIndex].backdrop_path}`}
                alt={`${movies[currentIndex].title}`}
                fill
                className="object-cover object-top image-layer transition-all duration-500"
              />
            </div>
          </div>

          {/* Progress Bar at the Top */}
          <div className="absolute top-0 left-0 w-full h-1 bg-transparent">
            <div
              className="h-1 bg-orange-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-20 text-white">
            <h1
              className={`text-left text-4xl font-bold leading-[120%] block my-4 title `}
            >
              {movies[currentIndex].title}
            </h1>
            <div
              className={`max-w-full w-[50%] text-justify text-sm description `}
            >
              {movies[currentIndex].overview}
            </div>
            <div className={`text-sm flex gap-4 font-bold mt-2 info `}>
              <span>{movies[currentIndex].production_companies}</span>
              <span>
                {movies[currentIndex].release_date
                  ? movies[currentIndex].release_date.slice(0, 4)
                  : "N/A"}
              </span>
              <span className="bg-neutral-600 px-1 rounded-[2px]">
                {movies[currentIndex].adult ? "A" : "U/A"}
              </span>
              <span>{convertMinutes(movies[currentIndex].runtime)}</span>
              <span>
                <span className="bg-[#f3ce13] px-1 rounded-[2px] text-black mr-2">
                  IMDb
                </span>
                {movies[currentIndex].rating}
              </span>
              <span>
                {movies[currentIndex].original_language === "en"
                  ? "English"
                  : movies[currentIndex].original_language === "hi"
                  ? "हिन्दी"
                  : movies[currentIndex].original_language.toUpperCase()}
              </span>
            </div>
            <div className={`text-sm flex font-bold mt-2 genres `}>
              {movies[currentIndex].genres.map((g, i) => (
                <span key={i} className="text-green-500">
                  {g}
                  {i !== movies[currentIndex].genres.length - 1 && (
                    <span className="text-white mx-2">•</span>
                  )}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div
              className={`buttton-container z-10 relative max-w-full w-[55%] buttons `}
              style={{ justifyContent: "flex-start", marginLeft: 0 }}
            >
              <Link
                href={`https://www.imdb.com/title/${movies[currentIndex].imdb_id}`}
                target="_blank"
                className="px-6 py-2 bg-[#f3ce13] text-black border border-[#f3ce13] font-semibold rounded-lg shadow-md hover:bg-[#f3ce13ab] transition duration-300 ease-in-out active:scale-95 text-center"
                style={{ borderRadius: "4px" }}
              >
                IMDb Page
              </Link>
              <Link
                href={`https://www.google.com/search?q=${movies[currentIndex].title} Watch Online`}
                target="_blank"
                className="px-6 py-2 bg-white text-black border font-medium rounded-lg shadow-md hover:bg-gray-300 transition duration-300 ease-in-out active:scale-95 text-center w-[30%]"
                style={{ borderRadius: "4px" }}
              >
                Watch Now
              </Link>
              <div className="relative flex flex-col items-center group min-h-full">
                <span className="absolute w-max text-col -top-9 px-2 py-1 text-sm text-white bg-[#000000ab] rounded-[4px] bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {added ? "Remove from Watchlist" : "Add to Watchlist"}
                </span>
                <button
                  onClick={toggleWatchlist}
                  className="relative flex items-center text-center min-h-full justify-center gap-2 px-4 py-2 text-white font-medium rounded-[4px] border border-blue-700 transition-all duration-300 ease-in-out shadow-md bg-blue-600 hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 h-full"
                >
                  <FontAwesomeIcon
                    icon={added ? faCheck : faPlus}
                    className="text-lg transition-transform duration-200 ease-out transform active:scale-90"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Next & Previous Buttons */}
          <div className="absolute bottom-40 items-end right-[17px] w-[56.6vw] h-[100px] flex justify-between z-10 ">
            {/* Left Button */}
            <button
              onClick={prevSlide}
              style={{ height: currentIndex === 0 ? "89px" : "68px" }}
              className="group relative w-10 flex items-center justify-center rounded-md bg-black/50 backdrop-blur-md transition-all duration-300 hover:bg-black/70 hover:scale-105 active:scale-95"
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>

            {/* Right Button */}
            <button
              onClick={nextSlide}
              style={{ height: currentIndex === 4 ? "89px" : "68px" }}
              className="group relative w-10 flex items-center justify-center rounded-md bg-black/50 backdrop-blur-md transition-all duration-300 hover:bg-black/70 hover:scale-105 active:scale-95"
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-40 right-14 flex gap-3 items-end z-10">
            {movies.map((movie, index) => (
              <div
                key={index}
                className={`relative cursor-pointer rounded-[4px] overflow-hidden transition-all duration-300 ${
                  currentIndex === index
                    ? "scale-110 origin-bottom border-2 border-white z-10 mx-2"
                    : "scale-100 opacity-80"
                }`}
                style={{
                  width: currentIndex === index ? "140px" : "120px",
                  height: currentIndex === index ? "80px" : "68px",
                }}
                onClick={() => {
                  setCurrentIndex(index);
                  setProgress(0);
                }}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                  alt={`${movie.title}`}
                  fill
                  className="object-cover"
                />
                {currentIndex !== index && (
                  <div className="absolute inset-0 bg-[#00000068]"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000bc] to-transparent rounded-[4px] img"></div>
                <div className="absolute bottom-[10px] left-[10px] right-[10px] text-white">
                  <div className="font-semibold text-[8px] truncate">
                    {movie.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className=" mt-[100vh] relative z-10">
            <div>
              <span className=" font-bold text-xl">Curated Just For You</span>
              <div className="flex gap-4 items-start my-5 w-full h-[180px]">
                {movies.map((movie, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="relative cursor-pointer rounded-[4px] overflow-hidden transition-all duration-300 delay-100 ease-in-out group scale-100 hover:scale-150 w-[222px] h-[125px] hover:h-[180px] border-2 border-transparent hover:border-white hover:rounded-[6px] z-10 hover:z-50"
                      onClick={() => {
                        setCurrentIndex(index);
                        setProgress(0);
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Image Container (Fixed at Top) */}
                      <div className="w-full h-[125px] relative">
                        <Image
                          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                          alt={`${movie.title}`}
                          fill
                          className="object-cover rounded-t-[4px]"
                        />

                        {/* Overlay Effect */}
                        <div className="absolute inset-0 group-hover:bg-transparent bg-gradient-to-t from-[#000000bc] to-transparent rounded-t-[4px]"></div>
                      </div>

                      {/* Movie Title & Description */}
                      <div
                        className={`absolute  left-[10px] right-[10px] text-white ${
                          hoveredIndex === index
                            ? "bottom-[38%]"
                            : "bottom-[10px]"
                        }`}
                      >
                        <div className="font-semibold text-sm truncate">
                          {movie.title}
                        </div>
                      </div>

                      {/* Additional Movie Details (Expands on hover, placed at the bottom) */}
                      <div className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(to_top,#000000_20%,#000000_75%,transparent_100%)] text-white text-[10px] p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto">
                        <div className="text-[8px] line-clamp-2 leading-tight overflow-hidden text-ellipsis ml-1">
                          {movie.overview}
                        </div>
                        <div className=" flex gap-2 mt-1 ml-1 text-gray-300">
                          <p>
                            <strong>
                              {movie.release_date
                                ? movie.release_date.slice(0, 4)
                                : "N/A"}
                            </strong>
                          </p>

                          <p>
                            <strong>{convertMinutes(movie.runtime)}</strong>
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
                        <strong className="mt-1 ml-1 text-green-500">
                          {movie.genres.join(" • ")}
                        </strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className=" font-bold text-xl">
                Trending all over the Globe
              </span>

              <div className="relative w-full">
                {/* Left Button */}
                {startIndex > 0 && (
                  <button
                    className="absolute left-0 top-0 transform h-[69%] bg-gradient-to-r from-[#000000] via-[#000000bc] to-transparent text-white pl-3 pr-7 py-2 z-20"
                    onClick={handlePrev}
                  >
                    <FontAwesomeIcon icon={faAngleLeft} />
                  </button>
                )}

                {/* Movie Container */}
                <div className="flex gap-4 items-start my-5 w-full h-[180px]">
                  {trendingMovies
                    .slice(startIndex, startIndex + visibleMovies)
                    .map((movie) => (
                      <div
                        key={movie.id}
                        className="flex flex-col items-center"
                      >
                        <div
                          className="relative cursor-pointer rounded-[4px] overflow-hidden transition-all duration-300 delay-100 ease-in-out group scale-100 hover:scale-150 w-[222px] h-[125px] hover:h-[180px] border-2 border-transparent hover:border-white hover:rounded-[6px] z-10 hover:z-50"
                          onClick={() => {
                            setCurrentIndex(movie.id);
                            setProgress(0);
                          }}
                          onMouseEnter={() => setHoveredIndex(movie.id)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          {/* Image Container (Fixed at Top) */}
                          <div className="w-full h-[125px] relative">
                            <Image
                              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                              alt={movie.title}
                              fill
                              className="object-cover rounded-t-[4px]"
                            />

                            {/* Overlay Effect */}
                            <div className="absolute inset-0 group-hover:bg-transparent bg-gradient-to-t from-[#000000bc] to-transparent rounded-t-[4px]"></div>
                          </div>

                          {/* Movie Title & Description */}
                          <div
                            className={`absolute  left-[10px] right-[10px] text-white ${
                              hoveredIndex === movie.id
                                ? "bottom-[38%]"
                                : "bottom-[10px]"
                            }`}
                          >
                            <div className="font-semibold text-sm truncate">
                              {movie.title}
                            </div>
                          </div>

                          {/* Additional Movie Details (Expands on hover, placed at the bottom) */}
                          <div className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(to_top,#000000_20%,#000000_75%,transparent_100%)] text-white text-[10px] p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto">
                            <div className="text-[8px] line-clamp-2 leading-tight overflow-hidden text-ellipsis ml-1">
                              {movie.overview}
                            </div>
                            <div className=" flex gap-2 mt-1 ml-1 text-gray-300">
                              <p>
                                <strong>
                                  {movie.release_date
                                    ? movie.release_date.slice(0, 4)
                                    : "N/A"}
                                </strong>
                              </p>

                              {/* <p>
                                <strong>{convertMinutes(movie.runtime)}</strong>
                              </p> */}
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
                            <strong className="mt-1 ml-1 text-green-500">
                              {getGenresById(movie.genre_ids).join(" • ")}
                            </strong>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Right Button */}
                {startIndex + visibleMovies < trendingMovies.length && (
                  <button
                    className="absolute right-[-2px] top-0 transform h-[69%] bg-gradient-to-l from-[#000000] via-[#000000bc] to-transparent text-white pr-3 pl-7 py-2 z-20"
                    onClick={handleNext}
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                  </button>
                )}
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </SplashScreen>
  );
};

export default RecommendPage;
