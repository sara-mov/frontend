"use client";
import Navbar from "@/components/Navbar";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import recommend from "../../../public/recommendation.png";
import browsing from "../../../public/movie-browsing.png";
import streaming from "../../../public/movie-streaming.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/Footer";
import NumberCounter from "@/components/NumberCounter";
import SplashScreen from "@/components/SplashScreen";

const HowItWorks = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "How It Works - SARA";
  }, []);

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

  return (
    <SplashScreen duration={2000}>
      <div className="bg-gradient-to-br transition duration-200 text-black dark:text-white from-neutral-100 dark:from-neutral-800 dark:to-neutral-900 to-neutral-200">
        <div className="mx-16">
          {/* Header */}
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

          <div className="pt-20">
            <div className="max-w-full px-4 sm:px-6 lg:px-16">
              <div className="discover-container-inner">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                  <div className="w-full lg:w-1/2 flex flex-col items-start gap-4">
                    <div className="relative">
                      <h5 className="text-xl sm:text-2xl font-semibold">
                        SARA.
                      </h5>
                    </div>
                    <div className="relative">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                        Discover How Our Recommendations Work
                      </h3>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2 flex flex-col items-start gap-4">
                    <div className="relative">
                      <p className="text-base sm:text-lg leading-relaxed">
                        SARA&apos;s movie recommendation system uses advanced
                        algorithms to analyze your viewing habits and
                        preferences. By understanding your unique tastes, we
                        provide personalized movie suggestions that ensure you
                        never miss out on the latest blockbusters or hidden
                        gems. Our intuitive interface makes exploring new films
                        a seamless and enjoyable experience.
                      </p>
                    </div>
                    <div>
                      <button className="px-5 py-2 border-2 border-[#008080] text-[#008080] rounded-lg shadow-lg hover:bg-teal-700 hover:text-white transition duration-300">
                        Learn
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Image
                    src={streaming}
                    alt="Streaming Illustration"
                    className="w-full h-auto rounded shadow"
                  />
                </div>
              </div>
            </div>

            <div className="discover-container-inner px-4 sm:px-6 lg:px-16">
              <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
                <div className="w-full lg:w-1/2 flex flex-col items-start gap-6">
                  <div className="w-full">
                    <h2 className="text-2xl sm:text-3xl lg:text-[42px] leading-snug font-bold mb-3">
                      Understanding SARA&apos;s Recommendation Algorithm
                    </h2>
                  </div>

                  <div className="w-full text-base leading-relaxed text-justify">
                    SARA&apos;s recommendation engine analyzes your viewing
                    history, preferences, and ratings to suggest movies
                    you&apos;ll love. By considering factors like genre,
                    director, and user reviews, our algorithm ensures
                    personalized and accurate movie recommendations.
                  </div>

                  <div className="w-full flex flex-col sm:flex-row gap-5">
                    <div className="w-full sm:w-1/2 flex flex-col gap-2">
                      <div className="text-3xl font-bold flex items-center">
                        <span className="text-center elementor-counter-number">
                          <NumberCounter from={0} to={95} duration={2000} />
                        </span>
                        <span className="ml-1">%</span>
                      </div>
                      <p className="text-sm">
                        Accuracy rate of our movie suggestions.
                      </p>
                    </div>

                    <div className="w-full sm:w-1/2 flex flex-col gap-2">
                      <div className="text-3xl font-bold flex items-center">
                        <span className="text-center elementor-counter-number">
                          <NumberCounter from={0} to={900} duration={2000} />
                        </span>
                        <span className="ml-1">ms</span>
                      </div>
                      <p className="text-sm">
                        Average time to generate recommendations.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <div className="w-full h-auto">
                    <Image
                      src={recommend}
                      width={1024}
                      height={1024}
                      alt="Recommendation Illustration"
                      className="rounded shadow w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="discover-container-inner px-4 sm:px-6 lg:px-16">
              <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
                <div className="w-full lg:w-1/2 flex flex-col items-start gap-6">
                  <div className="w-full">
                    <h2 className="text-2xl sm:text-3xl lg:text-[42px] leading-snug font-bold mb-3">
                      Influence Your Movie Suggestions with SARA
                    </h2>
                  </div>

                  <div className="w-full text-base leading-relaxed text-justify">
                    At SARA, your viewing habits and preferences play a crucial
                    role in shaping the movie recommendations you receive. By
                    engaging with our platform, you help refine the suggestions,
                    ensuring they align with your unique tastes and interests.
                  </div>

                  <ul className="list-none space-y-3">
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon
                        icon={faFilm}
                        className="text-[#ff6f61] mt-1"
                      />
                      <span className="text-base">
                        Rate movies to improve suggestions
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon
                        icon={faFilm}
                        className="text-[#ff6f61] mt-1"
                      />
                      <span className="text-base">
                        Create watchlists for tailored recommendations
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon
                        icon={faFilm}
                        className="text-[#ff6f61] mt-1"
                      />
                      <span className="text-base">
                        Engage with community reviews
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="w-full lg:w-1/2">
                  <div className="w-full h-auto">
                    <Image
                      src={browsing}
                      width={1024}
                      height={1024}
                      alt="Browsing Recommendations"
                      className="w-full h-auto object-contain rounded shadow"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </SplashScreen>
  );
};

export default HowItWorks;
