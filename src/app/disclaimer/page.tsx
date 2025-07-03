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
    document.title = "Disclaimer - SARA";
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
          <div className="pt-20 lg:px-16">
            <div className="discover-container-inner">
              <div className="flex flex-col items-center justify-start gap-5 w-full h-full">
                <div className="w-full max-w-4xl text-left">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    Disclaimer
                  </h1>
                </div>
              </div>
            </div>

            <div className="element">
              <div className="flex flex-col items-center justify-start gap-5 w-full h-full">
                <div className="w-full max-w-4xl text-base sm:text-lg leading-relaxed text-justify">
                  <p className="mb-5 font-semibold">SARA Terms & Use</p>
                  <p className="mb-5">Last Updated: February 14, 2025</p>

                  <p className="mb-5">
                    SARA does not own or claim rights to any movie images,
                    posters, or data displayed. All content is sourced from
                    third-party providers and belongs to their respective
                    owners, used solely for informational purposes under fair
                    use.
                  </p>

                  <p className="mb-3 font-semibold">
                    1. No Ownership of Images & Data
                  </p>
                  <ul className="list-disc ml-5 mb-5">
                    <li>
                      We do not own or hold any rights to movie images,
                      trailers, or descriptions.
                    </li>
                  </ul>

                  <p className="mb-3 font-semibold">2. Source Attribution</p>
                  <ul className="list-disc ml-5 mb-5">
                    <li>
                      Content is sourced from APIs like TMDb, IMDb, OMDb, etc.
                    </li>
                    <li>
                      All rights belong to the original creators and
                      distributors.
                    </li>
                  </ul>

                  <p className="mb-3 font-semibold">
                    3. Fair Use & Informational Purpose
                  </p>
                  <ul className="list-disc ml-5 mb-5">
                    <li>
                      Used solely for informational and educational purposes.
                    </li>
                    <li>Promotes film appreciation and discovery.</li>
                  </ul>

                  <p className="mb-3 font-semibold">
                    4. Copyright & Intellectual Property Rights
                  </p>
                  <ul className="list-disc ml-5 mb-5">
                    <li>
                      All trademarks and copyrights belong to their respective
                      owners.
                    </li>
                    <li>Any violation is purely unintentional.</li>
                  </ul>

                  <p className="mb-3 font-semibold">
                    5. No Commercial Use or Distribution
                  </p>
                  <ul className="list-disc ml-5 mb-5">
                    <li>
                      This website does not host, stream, or sell copyrighted
                      media.
                    </li>
                    <li>
                      No downloads or rentals of full movies or TV shows are
                      provided.
                    </li>
                  </ul>

                  <p className="mb-3 font-semibold">
                    6. Accuracy of Information
                  </p>
                  <ul className="list-disc ml-5 mb-5">
                    <li>
                      While we aim for accuracy, we cannot guarantee full
                      correctness.
                    </li>
                    <li>Users should confirm details from official sources.</li>
                  </ul>

                  <p className="mb-3 font-semibold">
                    7. Third-Party Links & External Content
                  </p>
                  <p className="mb-5 ml-5">
                    Links to external websites may be included. We are not
                    responsible for their content or policies.
                  </p>

                  <p className="mb-3 font-semibold">8. User Responsibility</p>
                  <ul className="list-disc ml-5 mb-5">
                    <li>Users must comply with local copyright laws.</li>
                    <li>
                      We encourage legal access to movies to support creators.
                    </li>
                  </ul>

                  <p className="mb-3 font-semibold">
                    9. Content Removal Requests
                  </p>
                  <p className="mb-5 ml-5">
                    If you are a copyright owner and believe your content is
                    misused, please contact us at{" "}
                    <a
                      href="mailto:contact.sara.team@gmail.com"
                      className="text-[#008080] underline"
                    >
                      contact.sara.team@gmail.com
                    </a>
                    . We will address your concerns promptly.
                  </p>
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
