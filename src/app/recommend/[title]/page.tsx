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
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.01);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const backdrop = "/znmd-backdrop.png";

  const [scrollProgress, setScrollProgress] = useState(0);

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

          {/* Hero Section */}
          <div
            className="element text-white"
            style={{
              alignItems: "flex-start",
              justifyContent: "end",
              minHeight: "auto",
              paddingTop: 175,
              paddingBottom: 50,
            }}
          >
            <div className="cinema-element-container">
              <div
                className={`backdrop-element ${
                  theme === "light" ? "" : "dark"
                }`}
                style={{
                  backgroundImage: `url(${backdrop})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
            <div className=" max-w-full ">
              <div className=" h-full">
                <h1 className="text-left text-4xl font-bold leading-[120%] block my-4">
                  <span className="twbb-headline-plain-text">
                    Zindagi Na Milegi Dobara
                  </span>
                </h1>
              </div>
            </div>
            <div className="max-w-full w-[50%] text-justify text-sm z-10">
              <div className="elementor-widget-container">
                Three friends who were inseparable in childhood decide to go on
                a three-week-long bachelor road trip to Spain, in order to
                re-establish their bond and explore thrilling adventures, before
                one of them gets married. What will they learn of themselves and
                each other during the adventure?
              </div>
              <div className="text-sm flex gap-4 font-bold mt-2">
                <span>Excel Entertainment</span>
                <span>2011</span>
                <span className="bg-neutral-600 px-1 rounded-[2px]">U/A</span>
                <span>2h 34m</span>
                <span>
                  <span className="bg-[#f3ce13] px-1 rounded-[2px] text-black mr-2">
                    IMDb
                  </span>
                  8.2
                </span>
                <span>हिन्दी</span>
              </div>
              <div className="text-sm flex gap-3 font-bold mt-2">
                <span className="text-green-500">
                  Drama
                  <span className="text-white mx-2">•</span>
                  Comedy
                  <span className="text-white mx-2">•</span>
                  Romance
                </span>
              </div>
            </div>
            <div
              className="buttton-container z-10 max-w-full w-[55%]"
              style={{ justifyContent: "flex-start", marginLeft: 0 }}
            >
              <Link
                href="/imdb"
                className="px-6 py-2 bg-[#f3ce13] text-black border border-[#f3ce13] font-semibold rounded-lg shadow-md hover:bg-[#f3ce13ab] transition duration-300 ease-in-out active:scale-95 text-center"
                style={{ borderRadius: "4px" }}
              >
                IMDb Page
              </Link>
              <Link
                href="/watch"
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
                  className="relative flex items-center text-center min-h-full justify-center gap-2 px-4 py-2 text-white font-medium rounded-[4px] border border-blue-700 transition-all duration-300 ease-in-out shadow-md 
        bg-blue-600 hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 h-full"
                >
                  <FontAwesomeIcon
                    icon={added ? faCheck : faPlus}
                    className="text-lg transition-transform duration-200 ease-out transform active:scale-90"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="relative my-5 mb-96">
            <span className="font-bold text-xl text-white">
              Curated Just for You
            </span>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </SplashScreen>
  );
};

export default RecommendPage;
