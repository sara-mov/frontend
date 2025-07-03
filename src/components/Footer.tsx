"use client";
import Image from "next/image";
import React from "react";
import saraMov from "../../public/sara-mov.png";
import saraMovDark from "../../public/sara-mov-dark.png";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <>
      {/* Desktop Footer */}
      <div className="hidden md:block">
        <div className="flex flex-col gap-5">
          <div
            className="discover-points-element"
            style={{ flexDirection: "column" }}
          >
            <div className="flex flex-row justify-center items-center">
              <div className="flex flex-row"></div>
              <div className="max-w-full ">
                <div className="flex flex-wrap flex-col mx-[10px] h-full">
                  <nav className="">
                    <ul className="flex flex-row relative z-50">
                      <li className="block relative">
                        <Link
                          href="/about-us"
                          className="px-5 transition duration-300 hover:text-[#008080]"
                        >
                          About Us
                        </Link>
                      </li>
                      <li className="block relative">
                        <Link
                          href="/how-it-works"
                          className="px-5 transition duration-300 hover:text-[#008080]"
                        >
                          How It Works
                        </Link>
                      </li>
                      <li className="block relative">
                        <Link
                          href="/contact-us"
                          className="px-5 transition duration-300 hover:text-[#008080]"
                        >
                          Contact Us
                        </Link>
                      </li>
                      <li className="block relative">
                        <Link
                          href="/search"
                          className="px-5 transition duration-300 hover:text-[#008080]"
                        >
                          Movies
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div className="max-w-full">
              <div className="h-full">
                <div className="flex pt-5">
                  <span className="border-t border-solid border-black dark:border-white w-full flex"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-5 w-full">
          <footer className="flex items-center justify-between py-4 pt-10">
            <div className="flex items-center gap-2">
              <Link href="/">
                <Image
                  src={theme === "light" ? saraMov : saraMovDark}
                  alt="sara-mov-logo"
                  height={28}
                />
              </Link>
            </div>
            <nav className="max-w-full relative h-full flex flex-col text-sm">
              <ul className="flex flex-wrap z-50">
                <li className="block relative">
                  <Link
                    href="/disclaimer"
                    className="px-5 transition duration-300 hover:text-[#008080]"
                  >
                    Disclaimer
                  </Link>
                </li>
                <li className="block relative">
                  <Link
                    href="/terms-and-conditions"
                    className="px-5 transition duration-300 hover:text-[#008080]"
                  >
                    Terms and Conditions
                  </Link>
                </li>
                <li className="block relative">
                  <Link
                    href="/privacy-policy"
                    className="px-5 transition duration-300 hover:text-[#008080]"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="font-semibold text-sm">
              © 2025 | All rights reserved.
            </div>
          </footer>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="block md:hidden">
        <footer className="flex flex-col items-center gap-4 text-center p-4">
          <Link href="/">
            <Image
              src={theme === "light" ? saraMov : saraMovDark}
              alt="sara-mov-logo"
              height={28}
            />
          </Link>

          <nav>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-[#008080] transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-[#008080] transition"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-[#008080] transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="hover:text-[#008080] transition"
                >
                  Movies
                </Link>
              </li>
            </ul>
          </nav>

          {/* <div className="max-w-full">
              <div className="h-full">
                <div className="flex pt-5">
                  <span className="border-t border-solid border-black dark:border-white w-full flex"></span>
                </div>
              </div>
            </div> */}

          <nav className="mt-4 border-t border-solid border-black dark:border-white w-full flex items-center justify-center">
            <ul className="flex flex-col gap-1 text-xs mt-5">
              <li>
                <Link
                  href="/disclaimer"
                  className="hover:text-[#008080] transition"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-[#008080] transition"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-[#008080] transition"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>

          <div className="text-xs font-medium mt-2">
            © 2025 | All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
