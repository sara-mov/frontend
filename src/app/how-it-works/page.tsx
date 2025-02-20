"use client";
import Navbar from "@/components/Navbar";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import recommend from "../../../public/recommendation.png";
import browsing from "../../../public/movie-browsing.png";
import streaming from "../../../public/movie-streaming-1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/Footer";
import NumberCounter from "@/components/NumberCounter";
import SplashScreen from "@/components/SplashScreen";

const HowItWorks = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();

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
            <div className="max-w-full">
              <div className="discover-container-inner">
                <div className="flex flex-row items-center gap-5">
                  <div className="flex flex-row items-center gap-5 h-full w-full">
                    <div className=" w-1/2 flex flex-col items-start gap-5">
                      <div className=" max-w-full relative">
                        <div className="h-full">
                          <h5 className="text-lg">SARA.</h5>{" "}
                        </div>
                      </div>
                      <div className="max-w-full">
                        <div className="h-full">
                          <h3 className=" text-4xl font-bold">
                            Discover How Our Recommendations Work
                          </h3>{" "}
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2 flex flex-col items-start gap-5">
                      <div className=" max-w-full relative h-full">
                        <div className=" text-base">
                          SARA&apos;s movie recommendation system uses advanced
                          algorithms to analyze your viewing habits and
                          preferences. By understanding your unique tastes, we
                          provide personalized movie suggestions that ensure you
                          never miss out on the latest blockbusters or hidden
                          gems. Our intuitive interface makes exploring new
                          films a seamless and enjoyable experience.{" "}
                        </div>
                      </div>
                      <div className="max-w-full w-[33%]">
                        <div className="h-full">
                          <button
                            className="px-[20px] py-[10px] border-2 border-[#008080]  text-[#008080] rounded-lg shadow-lg hover:bg-teal-700 hover:text-white transition duration-300"
                            style={{ borderRadius: "4px" }}
                          >
                            Learn
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="max-w-full">
                  <div className=" mt-5 ">
                    <Image
                      src={streaming}
                      className="attachment-full size-full rounded shadow "
                      alt=""
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="discover-container-inner">
              <div className="flex flex-row items-center gap-5">
                <div className="w-1/2 flex flex-col items-start gap-5">
                  <div className="max-w-full relative ">
                    <div className="h-full">
                      <h2 className=" text-[42px] leading-[120%] font-bold mb-3">
                        Understanding sara&apos;s Recommendation Algorithm
                      </h2>{" "}
                    </div>
                  </div>
                  <div className=" max-w-full relative h-full">
                    <div className=" text-base my-2 pb-7">
                      sara&apos;s recommendation engine analyzes your viewing
                      history, preferences, and ratings to suggest movies
                      you&apos;ll love. By considering factors like genre,
                      director, and user reviews, our algorithm ensures
                      personalized and accurate movie recommendations.{" "}
                    </div>
                  </div>
                  <div className="w-full flex flex-row gap-5">
                    <div className="w-1/2 flex flex-col gap-5">
                      <div className="max-w-full self-start">
                        <div className="h-full">
                          <div className="flex justify-center items-stretch flex-col-reverse">
                            <div className=" text-3xl font-bold flex items-center">
                              <span className="  whitespace-pre-wrap flex-grow text-end"></span>
                              <span className="flex flex-grow-0 text-center elementor-counter-number">
                                <NumberCounter
                                  from={0}
                                  to={95}
                                  duration={2000}
                                />
                              </span>
                              <span className=" whitespace-pre-wrap text-start">
                                {" "}
                                %
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" max-w-full w-full text-sm">
                        <div className="h-full">
                          Accuracy rate of our movie <br /> suggestions.{" "}
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2 flex flex-col gap-5">
                      <div className="max-w-full self-start">
                        <div className="h-full">
                          <div className="flex justify-center items-stretch flex-col-reverse">
                            <div className=" text-3xl font-bold flex items-center">
                              <span className="  whitespace-pre-wrap flex-grow text-end"></span>
                              <span className="flex flex-grow-0 text-center elementor-counter-number">
                                <NumberCounter
                                  from={0}
                                  to={900}
                                  duration={2000}
                                />
                              </span>
                              <span className=" whitespace-pre-wrap text-start">
                                {" "}
                                ms
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" max-w-full w-full text-sm">
                        <div className="h-full">
                          Average time to generate recommendations.{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 ">
                  <div className="elementor-widget-container">
                    <Image
                      width="1024"
                      height="1024"
                      src={recommend}
                      className="attachment-full size-full wp-image-25868"
                      alt=""
                    />{" "}
                  </div>
                </div>
              </div>
            </div>

            <div className="discover-container-inner">
              <div className="flex flex-row items-center gap-5">
                <div className="w-1/2 flex flex-col items-start gap-5">
                  <div className="max-w-full relative ">
                    <div className="h-full">
                      <h2 className=" text-[42px] leading-[120%] font-bold mb-3">
                        Influence Your Movie Suggestions with sara{" "}
                      </h2>{" "}
                    </div>
                  </div>
                  <div className=" max-w-full relative h-full">
                    <div className=" text-base my-2 pb-7">
                      At sara, your viewing habits and preferences play a
                      crucial role in shaping the movie recommendations you
                      receive. By engaging with our platform, you help refine
                      the suggestions, ensuring they align with your unique
                      tastes and interests.{" "}
                    </div>
                  </div>
                  <div className="w-full flex flex-row gap-5">
                    <div className="max-w-full">
                      <div className="h-full">
                        <ul className="block list-none">
                          <li className="relative flex pb-[4px] mt-[4px] text-left justify-start items-center">
                            <span className=" pr-4 flex relative ">
                              <FontAwesomeIcon
                                icon={faFilm}
                                className="text-[#ff6f61]"
                              />{" "}
                            </span>
                            <span className="ps-[5px] text-base ">
                              Rate movies to improve suggestions
                            </span>
                          </li>

                          <li className="relative flex pb-[4px] mt-[4px] text-left justify-start items-center">
                            <span className=" pr-4 flex relative ">
                              <FontAwesomeIcon
                                icon={faFilm}
                                className="text-[#ff6f61]"
                              />{" "}
                            </span>
                            <span className="ps-[5px] text-base ">
                              Create watchlists for tailored recommendations
                            </span>
                          </li>
                          <li className="relative flex pb-[4px] mt-[4px] text-left justify-start items-center">
                            <span className=" pr-4 flex relative ">
                              <FontAwesomeIcon
                                icon={faFilm}
                                className="text-[#ff6f61]"
                              />{" "}
                            </span>
                            <span className="ps-[5px] text-base ">
                              Engage with community reviews
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 ">
                  <div className="elementor-widget-container">
                    <Image
                      width="1024"
                      height="1024"
                      src={browsing}
                      className="attachment-full size-full wp-image-25868"
                      alt=""
                    />{" "}
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
