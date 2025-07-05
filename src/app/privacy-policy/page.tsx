"use client";
import Navbar from "@/components/Navbar";
import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

const PrivacyPolicy = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Privacy Policy - SARA";
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
        <div className="mx-5 md:mx-16">
          {/* Header */}
          <div className="fixed top-0 left-0 w-full pt-5 px-5 md:px-16 mr-0 py-4 z-20">
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
                    Privacy Policy
                  </h1>
                </div>
              </div>
            </div>

            <div className="element">
              <div className="flex flex-col items-center justify-start gap-5 w-full h-full">
                <div className="w-full max-w-4xl text-left text-base sm:text-lg leading-relaxed text-justify">
                  <p className="mb-5 font-semibold">SARA Privacy Policy</p>
                  <p className="mb-5">Last Updated: February 14, 2025</p>

                  <p className="mb-5">
                    SARA respects your privacy and is committed to protecting
                    your personal information. This Privacy Policy describes how
                    we collect, use, and protect your data when you use our
                    website and services.
                  </p>

                  <p className="mb-3 font-semibold">
                    1. Information We Collect
                  </p>
                  <p className="mb-5 ml-5">
                    We may collect the following information from you:
                  </p>
                  <ul className="list-disc ml-10 mb-7">
                    <li>
                      Information you provide directly, such as your name, email
                      address, and movie preferences.
                    </li>
                    <li>
                      Information collected automatically, such as your IP
                      address, browser type, and usage data.
                    </li>
                  </ul>

                  <p className="mb-3 font-semibold">
                    2. How We Use Your Information
                  </p>
                  <p className="mb-5 ml-5">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc ml-10 mb-7">
                    <li>Provide and improve our services.</li>
                    <li>Personalize your experience.</li>
                    <li>Communicate with you about SARA.</li>
                    <li>Comply with legal requirements.</li>
                  </ul>

                  <p className="mb-3 font-semibold">
                    3. Sharing Your Information
                  </p>
                  <p className="mb-5 ml-5">
                    We do not sell or share your personal information with third
                    parties except as necessary for providing our services or
                    with your consent.
                  </p>

                  <p className="mb-3 font-semibold">4. Security</p>
                  <p className="mb-5 ml-5">
                    We implement reasonable security measures to protect your
                    personal information from unauthorized access, use, or
                    disclosure.
                  </p>

                  <p className="mb-3 font-semibold">5. Your Choices</p>
                  <p className="mb-5 ml-5">
                    You have the right to access, correct, or delete your
                    personal information. You can also opt out of receiving
                    certain communications from us.
                  </p>

                  <p className="mb-3 font-semibold">6. Contact Us</p>
                  <p className="mb-5 ml-5">
                    If you have any questions or concerns about this Privacy
                    Policy, please contact us at{" "}
                    <a
                      href="mailto:contact.sara.team@gmail.com"
                      className="text-[#008080] underline"
                    >
                      contact.sara.team@gmail.com
                    </a>
                    .
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

export default PrivacyPolicy;
