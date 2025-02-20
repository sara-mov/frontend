"use client";
import Navbar from "@/components/Navbar";
import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import SplashScreen from "@/components/SplashScreen";

const ContactUs = () => {
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

          <div className=" pt-20 flex items-center justify-center h-[75vh]">
            <div className="block">
              <div className="tailored-container">
                <div className="flex flex-row w-full h-full">
                  <div className=" max-w-full w-[33%]">
                    <div className="h-full">
                      <div className=" text-left block">
                        <div className="mb-4">
                          <span className="text-3xl">
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              className=" text-[#ff6f61]"
                            />{" "}
                          </span>
                        </div>

                        <div className="block">
                          <h4 className="elementor-icon-box-title">
                            <span>Email Us </span>
                          </h4>

                          <p className="elementor-icon-box-description">
                            For any inquiries or support, feel free to reach out
                            to us at{" "}
                            <a
                              href="mailto:contact.sara.team@gmail.com"
                              className=" text-[#008080]"
                            >
                              contact.sara.team@gmail.com
                            </a>
                            . We are here to assist you with your movie
                            recommendations and any questions you may have.{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" max-w-full w-[33%]">
                    <div className="h-full">
                      <div className=" text-left block">
                        <div className="mb-4">
                          <span className="text-3xl">
                            <FontAwesomeIcon
                              icon={faPhoneAlt}
                              className=" text-[#ff6f61] rotate-90"
                            />{" "}
                          </span>
                        </div>

                        <div className="block">
                          <h4 className="elementor-icon-box-title">
                            <span>Call Us </span>
                          </h4>

                          <p className="elementor-icon-box-description">
                            You can also contact us by phone at{" "}
                            <strong>+91-12345-67890</strong>. Our team is
                            available to help you during business hours.
                            Don&apos;t hesitate to give us a call!{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" max-w-full w-[33%]">
                    <div className="h-full">
                      <div className=" text-left block">
                        <div className="mb-4">
                          <span className="text-3xl">
                            <FontAwesomeIcon
                              icon={faMapMarkerAlt}
                              className=" text-[#ff6f61]"
                            />{" "}
                          </span>
                        </div>

                        <div className="block">
                          <h4 className="elementor-icon-box-title">
                            <span>Visit Us </span>
                          </h4>

                          <p className="elementor-icon-box-description">
                            If you prefer to visit us, we are located at:
                            <br />
                            <strong>Pune, Maharashtra, India</strong>. We
                            welcome film enthusiasts to stop by and share their
                            thoughts!{" "}
                          </p>
                        </div>
                      </div>
                    </div>
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

export default ContactUs;
