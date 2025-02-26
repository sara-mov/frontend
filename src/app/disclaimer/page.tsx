"use client";
import Navbar from "@/components/Navbar";
import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

const Disclaimer = () => {
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
            <div className="discover-container-inner">
              <div className="flex flex-col items-center justify-start gap-5 w-full h-full">
                <div className="max-w-full w-[66%] text-left">
                  <div className="h-full">
                    <h1 className="text-5xl font-bold">Disclaimer</h1>{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="element">
              <div className="flex flex-col items-center justify-start gap-5 w-full h-full">
                <div className="max-w-full w-[66%] text-left text-lg">
                  <div className="h-full text-justify">
                    <p className=" mb-5">
                      <b>SARA Terms & Use</b>
                    </p>
                    <p className=" mb-5">Last Updated: February 14, 2025</p>
                    <p className=" mb-5">
                      SARA does not own or claim rights to any movie images,
                      posters, or data displayed. All content is sourced from
                      third-party providers and belongs to their respective
                      owners, used solely for informational purposes under fair
                      use.
                    </p>
                    <p className=" mb-5">
                      <b>1. No Ownership of Images & Data</b>
                    </p>
                    <p className=" mb-5 ml-5">
                      We do not own, claim ownership, or hold any rights to the
                      movie images, posters, trailers, descriptions, metadata,
                      or any related content displayed on this website.
                    </p>
                    <p className=" mb-5">
                      <b>2. Source Attribution</b>
                    </p>
                    <p className=" mb-5 ml-5"></p>
                    <ul className=" block list-disc ml-10 mb-7">
                      <li>
                        All movie-related content is sourced from third-party
                        providers such as TMDb, IMDb, Open Movie Database, or
                        other publicly available APIs.
                      </li>
                      <li>
                        The respective content creators, production companies,
                        and distributors own all rights to these materials.
                      </li>
                    </ul>
                    <p className=" mb-5">
                      <b>3. Fair Use & Informational Purpose</b>
                    </p>
                    <p className=" mb-5 ml-5"></p>
                    <ul className=" block list-disc ml-10 mb-7">
                      <li>
                        The images and data provided on this website are used
                        solely for informational, educational, and
                        non-commercial purposes under the principles of Fair
                        Use.
                      </li>
                      <li>
                        Our goal is to help users discover and explore movies
                        while promoting film appreciation.
                      </li>
                    </ul>
                    <p className=" mb-5">
                      <b>4. Copyright & Intellectual Property Rights</b>
                    </p>
                    <p className=" mb-5 ml-5"></p>
                    <ul className=" block list-disc ml-10 mb-7">
                      <li>
                        All copyrights, trademarks, and intellectual property
                        rights belong to their respective owners, including
                        movie studios, production companies, and content
                        creators.
                      </li>
                      <li>
                        If any content on this website violates copyright laws,
                        it is purely unintentional.
                      </li>
                    </ul>
                    <p className=" mb-5">
                      <b>5. No Commercial Use or Distribution</b>
                    </p>
                    <p className=" mb-5 ml-5"></p>
                    <ul className=" block list-disc ml-10 mb-7">
                      <li>
                        This website does not sell, rent, distribute, or host
                        any copyrighted content, including full movies, TV
                        shows, or related media.
                      </li>
                      <li>
                        We do not offer streaming or downloads of copyrighted
                        content.
                      </li>
                    </ul>
                    <p className=" mb-5">
                      <b>6. Accuracy of Information</b>
                    </p>
                    <p className=" mb-5 ml-5"></p>
                    <ul className=" block list-disc ml-10 mb-7">
                      <li>
                        While we strive to provide accurate and up-to-date movie
                        information, we do not guarantee the completeness,
                        reliability, or correctness of the data.
                      </li>
                      <li>
                        Users should verify details from official sources.
                      </li>
                    </ul>
                    <p className=" mb-5">
                      <b>7. Third-Party Links & External Content</b>
                    </p>
                    <p className=" mb-5 ml-5">
                      Our website may include links to third-party websites
                      (e.g., streaming platforms, official movie websites). We
                      do not endorse or take responsibility for the content,
                      policies, or practices of these external sites.
                    </p>
                    <p className=" mb-5">
                      <b>8. User Responsibility</b>
                    </p>
                    <p className=" mb-5 ml-5"></p>
                    <ul className=" block list-disc ml-10 mb-7">
                      <li>
                        Users should ensure they comply with local copyright
                        laws when using information from this website.
                      </li>
                      <li>
                        We encourage users to support content creators by
                        accessing movies through legal channels.
                      </li>
                    </ul>
                    <p className=" mb-5">
                      <b>9. Content Removal Requests</b>
                    </p>
                    <p className=" mb-5 ml-5">
                      If you are a copyright owner or representative and believe
                      that your content is used improperly, please contact us at{" "}
                      <a
                        href="mailto:contact.sara.team@gmail.com"
                        className=" text-[#008080]"
                      >
                        contact.sara.team@gmail.com
                      </a>
                      , and we will promptly review and address your request.
                    </p>{" "}
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

export default Disclaimer;
