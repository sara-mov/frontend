"use client";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import {
  faUsers,
  faLightbulb,
  faStar,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import sara from "../../public/sara.png";
import saraDark from "../../public/sara-dark.png";
import blockbuster from "../../public/blockbuster.png";
import indieFilms from "../../public/indie-films.png";
import hiddenGems from "../../public/hidden-gem.png";
import discover from "../../public/discover.png";
import action from "../../public/action.png";
import romantic from "../../public/romantic.png";
import sciFi from "../../public/sci-fi.png";
import animated from "../../public/animated.png";
import secretLife from "../../public/the-secret-life-of-walter-mitty.png";
import pansLabyrinth from "../../public/pans-labyrinth.png";
import lunchbox from "../../public/lunchbox.png";
import goodNightGoodLuck from "../../public/good-night-and-good-luck.png";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      <div className="bg-gradient-to-br text-black dark:text-white from-neutral-100 dark:from-neutral-800 dark:to-neutral-900 to-neutral-200">
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

                <Link
                  href="/sign-in"
                  className={`rounded-full px-6 py-2 font-semibold ${
                    isScrolled
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-white text-black"
                  }`}
                >
                  Sign in
                </Link>
              </div>
            </header>
          </div>

          {/* Hero Section */}
          {/* Section 1 */}
          <div className="element text-white">
            <div className="cinema-element-container">
              <div className="cinema-element"></div>
            </div>
            <div className=" max-w-full w-[50%] ">
              <div className=" h-full">
                <h1 className="twbb-headline">
                  <span className="twbb-headline-plain-text twbb-headline-text-wrapper">
                    Discover{" "}
                  </span>
                  <span className="twbb-headline-dynamic-wrapper twbb-headline-text-wrapper">
                    <span className="twbb-headline-dynamic-text twbb-headline-text-active">
                      Movies
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 500 150"
                      preserveAspectRatio="none"
                      className="underline-svg"
                      fill="white"
                    >
                      <path
                        className="underline-svg-path"
                        d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.3-197.1,9"
                      />
                    </svg>
                  </span>
                  <span className="twbb-headline-plain-text twbb-headline-text-wrapper">
                    {" "}
                    with sara.
                  </span>
                </h1>
              </div>
            </div>
            <div className="max-w-full w-[62%] text-center text-xl z-10">
              <div className="elementor-widget-container">
                Welcome to sara, your gateway to a world of cinema. Explore
                personalized movie recommendations, engage with a community of
                film enthusiasts, and never miss out on the latest releases or
                hidden gems.{" "}
              </div>
            </div>
            <div className="buttton-container z-10 max-w-full w-[58%]">
              <button
                className="px-6 py-2 bg-white text-black border rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
                style={{ borderRadius: "4px" }}
              >
                Learn More
              </button>

              <button
                className="px-6 py-2 border border-white text-white rounded-md shadow-md  hover:bg-white hover:text-black transition duration-300"
                style={{ borderRadius: "4px" }}
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Section 2 */}
          <div className="discover-container">
            <div className="discover-container-inner">
              <div className=" relative max-w-full w-[60%]">
                <div className="elementor-widget-container h-full">
                  <h2 className="discover-heading-title ">Discover sara.</h2>
                </div>
              </div>
              <div className=" relative max-w-full w-[60%]">
                <div className="discover-heading-paragraph h-full">
                  At sara, our mission is to revolutionize how movie lovers
                  discover films. <br /> We provide personalized recommendations
                  and foster a vibrant community of cinema enthusiasts, ensuring
                  a unique viewing experience.
                </div>
              </div>
              <div className="discover-points-element">
                <div className="w-full">
                  <div className="max-w-full">
                    <div className="h-full">
                      <div className="block text-left mb-4">
                        <span className=" text-3xl text-[#ff6f61]">
                          <FontAwesomeIcon icon={faLightbulb} />{" "}
                        </span>
                      </div>

                      <div className="text-left">
                        <h4 className="elementor-icon-box-title">
                          <span>Innovative Algorithms </span>
                        </h4>

                        <p className="elementor-icon-box-description">
                          Our advanced algorithms analyze your viewing
                          preferences to suggest films that match your tastes.
                          This ensures you never miss out on the latest
                          blockbusters or hidden gems that suit your style.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="max-w-full">
                    <div className="h-full">
                      <div className="block text-left mb-4">
                        <span className=" text-3xl text-[#ff6f61]">
                          <FontAwesomeIcon icon={faUsers} />{" "}
                        </span>
                      </div>

                      <div className="text-left">
                        <h4 className="elementor-icon-box-title">
                          <span>Community Engagement </span>
                        </h4>

                        <p className="elementor-icon-box-description">
                          Join a thriving community of film lovers where you can
                          share reviews, create watchlists, and discuss your
                          favorite movies. Engage with others who share your
                          passion for cinema.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="max-w-full">
                    <div className="h-full">
                      <div className="block text-left mb-4">
                        <span className=" text-3xl text-[#ff6f61]">
                          <FontAwesomeIcon icon={faStar} />{" "}
                        </span>
                      </div>

                      <div className="text-left">
                        <h4 className="elementor-icon-box-title">
                          <span>Diverse Selection </span>
                        </h4>

                        <p className="elementor-icon-box-description">
                          We celebrate all genres and styles of cinema, ensuring
                          that everyone finds something they love. From indie
                          films to major releases, our platform caters to all
                          tastes.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="discover-container">
            <div className="discover-container-inner">
              <div className="explore-element">
                <div className="max-w-full w-[50%] text-left">
                  <div className="h-full">
                    <h2 className="discover-heading-title">
                      Explore Our Curated Movie Picks
                    </h2>{" "}
                  </div>
                </div>
                <div className="max-w-full w-[50%] discover-heading-paragraph">
                  <div className="h-full">
                    Dive into a world of cinema with our expertly curated movie
                    recommendations. Whether you&apos;re in the mood for a
                    blockbuster, an indie film, or a hidden gem, our selection
                    is tailored to suit your unique tastes. Discover new
                    favorites and enjoy a seamless viewing experience with sara.{" "}
                  </div>
                </div>
              </div>
              <div className="discover-points-element w-full ">
                <div className="relative max-w-full w-[33%]">
                  <div className="explore-widget-container">
                    <div className=" flex flex-wrap relative">
                      <div className="w-full min-h-[220px] relative z-10">
                        <span className="absolute block z-20 top-0 bottom-0 left-0 right-0"></span>
                        <div className=" flex justify-start">
                          <Image
                            alt=""
                            src={blockbuster}
                            style={{
                              borderTopRightRadius: 4,
                              borderTopLeftRadius: 4,
                            }}
                          />
                        </div>
                      </div>
                      <div className=" flex flex-col relative w-full text-left min-h-[100px] p-[26px]">
                        <div className="w-full">
                          <h5 className=" mb-4 text-[22px] font-bold">
                            Blockbusters You Can&apos;t Miss
                          </h5>
                          <div className="text-sm mb-5">
                            Experience the thrill of the latest blockbusters
                            that have taken the world by storm. From
                            action-packed adventures to heartwarming dramas,
                            these films are a must-watch for any movie
                            enthusiast.
                          </div>
                        </div>
                        <div className=" flex relative items-start justify-start">
                          <div className=" flex items-center">
                            <div className=" flex mt-5">
                              <button
                                className="px-[20px] py-[10px] border-2 border-[#008080]  text-[#008080] rounded-lg shadow-lg hover:bg-teal-700 hover:text-white transition duration-300"
                                style={{ borderRadius: "4px" }}
                              >
                                Learn More
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative max-w-full w-[33%]">
                  <div className="explore-widget-container">
                    <div className=" flex flex-wrap relative">
                      <div className="w-full min-h-[220px] relative z-10">
                        <span className="absolute block z-20 top-0 bottom-0 left-0 right-0"></span>
                        <div className=" flex justify-start">
                          <Image
                            alt=""
                            src={indieFilms}
                            style={{
                              borderTopRightRadius: 4,
                              borderTopLeftRadius: 4,
                            }}
                          />
                        </div>
                      </div>
                      <div className=" flex flex-col relative w-full text-left min-h-[100px] p-[26px]">
                        <div className="w-full">
                          <h5 className=" mb-4 text-[22px] font-bold">
                            Indie Films to Inspire{" "}
                          </h5>
                          <div className="text-sm mb-5">
                            Discover the magic of indie films that push the
                            boundaries of storytelling. These unique and
                            thought-provoking movies offer fresh perspectives
                            and are sure to leave a lasting impression.
                          </div>
                        </div>
                        <div className=" flex relative items-start justify-start">
                          <div className=" flex items-center">
                            <div className=" flex mt-5">
                              <button
                                className="px-[20px] py-[10px] border-2 border-[#008080]  text-[#008080] rounded-lg shadow-lg hover:bg-teal-700 hover:text-white transition duration-300"
                                style={{ borderRadius: "4px" }}
                              >
                                Learn More
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative max-w-full w-[33%] ">
                  <div className="explore-widget-container">
                    <div className=" flex flex-wrap relative">
                      <div className="w-full min-h-[220px] relative overflow-hidden z-10">
                        <span className="absolute block z-20 top-0 bottom-0 left-0 right-0"></span>
                        <div className=" flex justify-start">
                          <Image
                            alt=""
                            src={hiddenGems}
                            style={{
                              borderTopRightRadius: 4,
                              borderTopLeftRadius: 4,
                            }}
                          />
                        </div>
                      </div>
                      <div className=" flex flex-col relative w-full text-left min-h-[100px] p-[26px]">
                        <div className="w-full">
                          <h5 className=" mb-4 text-[22px] font-bold">
                            Hidden Gems Await
                          </h5>
                          <div className="text-sm mb-5">
                            Uncover hidden gems that may have slipped under your
                            radar. These underrated films offer captivating
                            stories and unforgettable performances, perfect for
                            those seeking something different.
                          </div>
                        </div>
                        <div className=" flex relative items-start justify-start">
                          <div className=" flex items-center">
                            <div className=" flex mt-5">
                              <button
                                className="px-[20px] py-[10px] border-2 border-[#008080]  text-[#008080] rounded-lg shadow-lg hover:bg-teal-700 hover:text-white transition duration-300"
                                style={{ borderRadius: "4px" }}
                              >
                                Learn More
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="tailored-container">
            <div className="discover-container-inner">
              <div className="tailored-container-element bg-white dark:bg-black">
                <div className="tailored-element-1 w-[50%]">
                  <div className=" max-w-[100%] w-[100%] text-left">
                    <div className="h-[100%]">
                      <h2 className="discover-heading-title">
                        Discover Movies Tailored Just for You
                      </h2>{" "}
                    </div>
                  </div>
                  <div className="max-w-[100%] w-[100%] discover-heading-paragraph">
                    <div className="h-full pb-[30px]">
                      At sara, we use cutting-edge algorithms to analyze your
                      viewing habits and provide personalized movie
                      recommendations. Whether you&apos;re a fan of blockbusters
                      or indie films, our platform ensures you find the perfect
                      match for your tastes.{" "}
                    </div>
                  </div>
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
                          <span className="ps-[5px] discover-heading-paragraph">
                            Receive tailored movie suggestions that align with
                            your unique tastes.
                          </span>
                        </li>

                        <li className="relative flex pb-[4px] mt-[4px] text-left justify-start items-center">
                          <span className=" pr-4 flex relative ">
                            <FontAwesomeIcon
                              icon={faFilm}
                              className="text-[#ff6f61]"
                            />{" "}
                          </span>
                          <span className="ps-[5px] discover-heading-paragraph">
                            {" "}
                            Discover new films you might not have found on your
                            own.
                          </span>
                        </li>
                        <li className="relative flex pb-[4px] mt-[4px] text-left justify-start items-center">
                          <span className=" pr-4 flex relative ">
                            <FontAwesomeIcon
                              icon={faFilm}
                              className="text-[#ff6f61]"
                            />{" "}
                          </span>
                          <span className="ps-[5px] discover-heading-paragraph">
                            Enjoy a seamless and enjoyable decision-making
                            process when choosing what to watch.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="max-w-full w-[50%] text-center relative">
                  <div className=" my-[-48px] ml-[10px] mr-[-48px] h-full text-center">
                    <Image
                      width="1024"
                      height="1024"
                      src={discover}
                      className="attachment-full size-full wp-image-25856"
                      alt=""
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="tailored-container bg-black text-white dark:bg-white dark:text-black -mx-16">
            <div
              className="discover-container-inner"
              style={{ marginLeft: 80, marginRight: 80, flexDirection: "row" }}
            >
              <div className="relative max-w-full w-[25%]">
                <div className="h-full">
                  <a href="#" className="relative flex flex-wrap ">
                    <div className="w-full relative min-h-[220px] z-10">
                      <span className="absolute block z-20 top-0 bottom-0 left-0 right-0"></span>
                      <div className=" justify-center">
                        <Image alt="" src={action} className="image-movie" />
                      </div>
                    </div>
                    <div className="text-center min-h-[100px] pt-4 ">
                      <div className="w-full">
                        <h5 className="mb-4 movie-title">
                          Action-Packed Adventure Awaits
                        </h5>
                        <div className="relative movie-description mb-5">
                          Dive into the latest action blockbuster that promises
                          thrilling sequences and an unforgettable cinematic
                          experience.
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <div className="flex items-center"></div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="relative max-w-full w-[25%]">
                <div className="h-full">
                  <a href="#" className="relative flex flex-wrap ">
                    <div className="w-full relative min-h-[220px] z-10">
                      <span className="absolute block z-20 top-0 bottom-0 left-0 right-0"></span>
                      <div className=" justify-center">
                        <Image alt="" src={romantic} className="image-movie" />
                      </div>
                    </div>
                    <div className="text-center min-h-[100px] pt-4 ">
                      <div className="w-full">
                        <h5 className="mb-4 movie-title">
                          Romantic Drama Unfolds{" "}
                        </h5>
                        <div className="relative movie-description mb-5">
                          Experience the emotional journey of love and
                          heartbreak in this beautifully crafted romantic drama.
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <div className="flex items-center"></div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="relative max-w-full w-[25%]">
                <div className="h-full">
                  <a href="#" className="relative flex flex-wrap ">
                    <div className="w-full relative min-h-[220px] z-10">
                      <span className="absolute block z-20 top-0 bottom-0 left-0 right-0"></span>
                      <div className=" justify-center">
                        <Image alt="" src={sciFi} className="image-movie" />
                      </div>
                    </div>
                    <div className="text-center min-h-[100px] pt-4 ">
                      <div className="w-full">
                        <h5 className="mb-4 movie-title">
                          Sci-Fi Epic of the Year{" "}
                        </h5>
                        <div className="relative movie-description mb-5">
                          Embark on a journey through time and space in this
                          groundbreaking sci-fi epic that challenges the
                          boundaries of imagination.
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <div className="flex items-center"></div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="relative max-w-full w-[25%]">
                <div className="h-full">
                  <a href="#" className="relative flex flex-wrap ">
                    <div className="w-full relative min-h-[220px] z-10">
                      <span className="absolute block z-20 top-0 bottom-0 left-0 right-0"></span>
                      <div className=" justify-center">
                        <Image alt="" src={animated} className="image-movie" />
                      </div>
                    </div>
                    <div className="text-center min-h-[100px] pt-4 ">
                      <div className="w-full">
                        <h5 className="mb-4 movie-title">
                          Animated Magic for All Ages{" "}
                        </h5>
                        <div className="relative movie-description mb-5">
                          Join the enchanting adventure in this animated film
                          that delights audiences with its heartwarming story
                          and stunning visuals.
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <div className="flex items-center"></div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div className="tailored-container">
            <div
              className="discover-container-inner"
              style={{ flexDirection: "row" }}
            >
              <div className="relative max-w-full w-[25%]">
                <div className="h-full">
                  <a href="#" className="relative flex flex-wrap ">
                    <div className="w-full relative min-h-[220px] z-10">
                      <span className="absolute block z-20 top-0 bottom-0 left-0 right-0"></span>
                      <div className=" justify-center w-full max-w-lg aspect-[2/3] overflow-hidden">
                        <Image
                          alt=""
                          src={secretLife}
                          className="image-movie object-cover"
                          layout="fill"
                        />
                      </div>
                    </div>
                    <div className="text-center min-h-[100px] pt-4 ">
                      <div className="w-full">
                        <h5 className="mb-2 min-h-20 flex items-center justify-center movie-title">
                          The Secret Life of Walter Mitty{" "}
                        </h5>
                        <div className="relative movie-description mb-5">
                          An adventurous journey of self-discovery, this film
                          blends fantasy and reality in a visually stunning
                          narrative.
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <div className="flex items-center"></div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="relative max-w-full w-[25%]">
                <div className="h-full">
                  <a href="#" className="relative flex flex-wrap ">
                    <div className="w-full relative min-h-[220px] z-10">
                      <span className="absolute block z-20 top-0 bottom-0 left-0 right-0"></span>
                      <div className=" justify-center w-full max-w-lg aspect-[2/3] overflow-hidden">
                        <Image
                          alt=""
                          src={pansLabyrinth}
                          className="image-movie object-cover"
                          layout="fill"
                        />
                      </div>
                    </div>
                    <div className="text-center min-h-[100px] pt-4 ">
                      <div className="w-full">
                        <h5 className="mb-2 min-h-20 flex items-center justify-center movie-title">
                          Pan&apos;s Labyrinth{" "}
                        </h5>
                        <div className="relative movie-description mb-5">
                          A dark and enchanting tale set in post-Civil War
                          Spain, where a young girl discovers a magical
                          labyrinth.
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <div className="flex items-center"></div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="relative max-w-full w-[25%]">
                <div className="h-full">
                  <a href="#" className="relative flex flex-wrap ">
                    <div className="w-full relative min-h-[220px] z-10">
                      <span className="absolute block z-20 top-0 bottom-0 left-0 right-0"></span>
                      <div className=" justify-center w-full max-w-lg aspect-[2/3] overflow-hidden">
                        <Image
                          alt=""
                          src={lunchbox}
                          className="image-movie"
                          fill
                          style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-center min-h-[100px] pt-4 ">
                      <div className="w-full">
                        <h5 className="mb-2 min-h-20 flex items-center justify-center movie-title">
                          The Lunchbox{" "}
                        </h5>
                        <div className="relative movie-description mb-5">
                          A heartwarming story of an unlikely friendship formed
                          through a series of misdelivered lunchboxes in Mumbai.
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <div className="flex items-center"></div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="relative max-w-full w-[25%]">
                <div className="h-full">
                  <a href="#" className="relative flex flex-wrap ">
                    <div className="w-full relative min-h-[220px] z-10">
                      <span className="absolute block z-20 top-0 bottom-0 left-0 right-0"></span>
                      <div className=" justify-center w-full max-w-lg aspect-[2/3] overflow-hidden">
                        <Image
                          alt=""
                          src={goodNightGoodLuck}
                          className="image-movie object-cover"
                          layout="fill"
                        />
                      </div>
                    </div>
                    <div className="text-center min-h-[100px] pt-4 ">
                      <div className="w-full">
                        <h5 className="mb-2 min-h-20 flex items-center justify-center movie-title">
                          Good Night, and Good Luck
                        </h5>
                        <div className="relative movie-description mb-5">
                          A gripping historical drama about the battle between
                          journalism and government during the McCarthy era.
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <div className="flex items-center"></div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
