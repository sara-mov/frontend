"use client";
import Navbar from "@/components/Navbar";
import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

const TermsAndConditions = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Terms and Conditions - SARA";
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
                    Terms and Conditions
                  </h1>
                </div>
              </div>
            </div>

            <div className="element">
              <div className="flex flex-col items-center justify-start gap-5 w-full h-full">
                <div className="w-full max-w-4xl text-left text-base sm:text-lg leading-relaxed text-justify">
                  <p className="mb-5 font-semibold">
                    SARA Terms and Conditions
                  </p>
                  <p className="mb-5">Last Updated: February 14, 2025</p>

                  <p className="mb-5">
                    Welcome to SARA! These Terms and Conditions govern your use
                    of our website and services. By accessing or using SARA, you
                    agree to be bound by these terms.
                  </p>

                  <p className="mb-3 font-semibold">1. Acceptance of Terms</p>
                  <p className="mb-5 ml-5">
                    By using SARA, you acknowledge that you have read,
                    understood, and agree to be bound by these Terms and
                    Conditions. If you do not agree, you may not use SARA.
                  </p>

                  <p className="mb-3 font-semibold">2. User Accounts</p>
                  <p className="mb-5 ml-5">
                    If you create an account, you are responsible for
                    maintaining its confidentiality. Notify SARA of any
                    unauthorized access to your account immediately.
                  </p>

                  <p className="mb-3 font-semibold">3. Content</p>
                  <p className="mb-5 ml-5">
                    You are responsible for the content you share on SARA. Do
                    not post anything unlawful or inappropriate. We reserve the
                    right to remove such content.
                  </p>

                  <p className="mb-3 font-semibold">4. Intellectual Property</p>
                  <p className="mb-5 ml-5">
                    All copyrights and trademarks remain with SARA or its
                    licensors. You are granted limited usage rights as per these
                    terms.
                  </p>

                  <p className="mb-3 font-semibold">
                    5. Disclaimer of Warranties
                  </p>
                  <p className="mb-5 ml-5">
                    SARA is provided “as is” without warranties of any kind. We
                    do not guarantee accuracy or completeness of information.
                  </p>

                  <p className="mb-3 font-semibold">
                    6. Limitation of Liability
                  </p>
                  <p className="mb-5 ml-5">
                    SARA is not liable for any damages arising from your use of
                    the platform.
                  </p>

                  <p className="mb-3 font-semibold">7. Governing Law</p>
                  <p className="mb-5 ml-5">
                    These terms shall be governed in accordance with the laws of
                    [State/Country].
                  </p>

                  <p className="mb-3 font-semibold">8. Changes to Terms</p>
                  <p className="mb-5 ml-5">
                    We may update these Terms at any time. Continued use implies
                    acceptance of the updated terms.
                  </p>

                  <p className="mb-3 font-semibold">9. Contact Us</p>
                  <p className="mb-5 ml-5">
                    For any questions, contact us at{" "}
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

export default TermsAndConditions;
