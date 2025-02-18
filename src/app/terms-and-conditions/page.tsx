"use client";
import Navbar from "@/components/Navbar";
import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";

const TermsAndConditions = () => {
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
                    <h1 className="text-5xl font-bold">Terms and Conditions</h1>{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="element">
              <div className="flex flex-col items-center justify-start gap-5 w-full h-full">
                <div className="max-w-full w-[66%] text-left text-lg">
                  <div className="h-full">
                    <p className=" mb-5">
                      <b>SARA Terms and Conditions</b>
                    </p>
                    <p className=" mb-5">Last Updated: February 14, 2025</p>
                    <p className=" mb-5">
                      Welcome to SARA! These Terms and Conditions govern your
                      use of our website and services. By accessing or using
                      SARA, you agree to be bound by these terms.
                    </p>
                    <p className=" mb-5">
                      <b>1. Acceptance of Terms</b>
                    </p>
                    <p className=" mb-5">
                      By using SARA, you acknowledge that you have read,
                      understood, and agree to be bound by these Terms and
                      Conditions. If you do not agree to these terms, you are
                      prohibited from using SARA.
                    </p>
                    <p className=" mb-5">
                      <b>2. User Accounts</b>
                    </p>
                    <p className=" mb-5">
                      If you create an account with SARA, you are responsible
                      for maintaining the confidentiality of your account
                      credentials. You agree to notify SARA immediately of any
                      unauthorized use of your account.
                    </p>
                    <p className=" mb-5">
                      <b>3. Content</b>
                    </p>
                    <p className=" mb-5">
                      You are responsible for all content you submit or post to
                      SARA. You agree that your content will not violate any
                      applicable laws or regulations. SARA reserves the right to
                      remove any content that violates these terms.
                    </p>
                    <p className=" mb-5">
                      <b>4. Intellectual Property</b>
                    </p>
                    <p className=" mb-5">
                      All intellectual property rights, including copyrights and
                      trademarks, related to SARA and its content remain the
                      property of SARA or its licensors. You are granted a
                      limited, non-exclusive, non-transferable license to use
                      SARA&apos;s services in accordance with these Terms and
                      Conditions.
                    </p>
                    <p className=" mb-5">
                      <b>5. Disclaimer of Warranties</b>
                    </p>
                    <p className=" mb-5">
                      SARA provides its services on an &apos;as is&apos; and
                      &apos;as available&apos; basis. SARA does not warrant the
                      accuracy, completeness, or reliability of any information
                      provided on the website.
                    </p>
                    <p className=" mb-5">
                      <b>6. Limitation of Liability</b>
                    </p>
                    <p className=" mb-5">
                      In no event shall SARA be liable for any direct, indirect,
                      incidental, special, or consequential damages arising out
                      of or in connection with your use of SARA.
                    </p>
                    <p className=" mb-5">
                      <b>7. Governing Law These</b>
                    </p>
                    <p className=" mb-5">
                      Terms and Conditions shall be governed by and construed in
                      accordance with the laws of [State/Country].
                    </p>
                    <p className=" mb-5">
                      <b>8. Changes to Terms</b>
                    </p>
                    <p className=" mb-5">
                      SARA reserves the right to modify these Terms and
                      Conditions at any time. Any changes will be effective upon
                      posting on the website.
                    </p>
                    <p className=" mb-5">
                      <b>9. Contact Us</b>
                    </p>
                    <p className=" mb-5">
                      If you have any questions or concerns regarding these
                      Terms and Conditions, please contact us at{" "}
                      <a
                        href="mailto:support@sara.com"
                        className=" text-[#008080]"
                      >
                        support@sara.com
                      </a>
                      .
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

export default TermsAndConditions;
