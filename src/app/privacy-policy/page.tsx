"use client";
import Navbar from "@/components/Navbar";
import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
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
            <Navbar />
          </div>
          <div className="pt-20">
            <div className="discover-container-inner">
              <div className="flex flex-col items-center justify-start gap-5 w-full h-full">
                <div className="max-w-full w-[66%] text-left">
                  <div className="h-full">
                    <h1 className="text-5xl font-bold">Privacy Policy</h1>{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="element">
              <div className="flex flex-col items-center justify-start gap-5 w-full h-full">
                <div className="max-w-full w-[66%] text-left text-lg">
                  <div className="h-full">
                    <p className=" mb-5">
                      <b>SARA Privacy Policy</b>
                    </p>
                    <p className=" mb-5">Last Updated: February 14, 2025</p>
                    <p className=" mb-5">
                      SARA respects your privacy and is committed to protecting
                      your personal information. This Privacy Policy describes
                      how we collect, use, and protect your data when you use
                      our website and services.
                    </p>
                    <p className=" mb-5">
                      <b>1. Information We Collect</b>
                    </p>
                    <p className=" mb-5">
                      We may collect the following information from you:
                    </p>
                    <ul className=" block list-disc ml-14 mb-7">
                      <li>
                        Information you provide directly, such as your name,
                        email address, and movie preferences.
                      </li>
                      <li>
                        Information collected automatically, such as your IP
                        address, browser type, and usage data.
                      </li>
                    </ul>
                    <p className=" mb-5">
                      <b>2. How We Use Your Information</b>
                    </p>
                    <p className=" mb-5">
                      We use the information we collect to:
                    </p>
                    <ul className=" block list-disc ml-14 mb-7">
                      <li>Provide and improve our services.</li>
                      <li>Personalize your experience.</li>
                      <li>Communicate with you about sara.</li>
                      <li>Comply with legal requirements.</li>
                    </ul>
                    <p className=" mb-5">
                      <b>3. Sharing Your Information</b>
                    </p>
                    <p className=" mb-5">
                      We do not sell or share your personal information with
                      third parties except as necessary for providing our
                      services or with your consent.
                    </p>
                    <p className=" mb-5">
                      <b>4. Security</b>
                    </p>
                    <p className=" mb-5">
                      We implement reasonable security measures to protect your
                      personal information from unauthorized access, use, or
                      disclosure.
                    </p>
                    <p className=" mb-5">
                      <b>5. Your Choices</b>
                    </p>
                    <p className=" mb-5">
                      You have the right to access, correct, or delete your
                      personal information. You can also opt out of receiving
                      certain communications from us.
                    </p>
                    <p className=" mb-5">
                      <b>6. Contact Us</b>
                    </p>
                    <p className=" mb-5">
                      If you have any questions or concerns about this Privacy
                      Policy, please contact us at{" "}
                      <a href="mailto:support@sara.com" className=" text-[#008080]">support@sara.com</a>.
                    </p>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
