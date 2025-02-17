"use client";
import Image from "next/image";
import React from "react";
import saraMov from "../../public/sara-mov.png";
import saraMovDark from "../../public/sara-mov-dark.png";
import { useTheme } from "@/context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="flex items-center justify-between py-4 pt-10">
      <div className="flex items-center gap-2">
        <Image
          src={theme === "light" ? saraMov : saraMovDark}
          alt="sara-mov-logo"
          height={28}
        />
      </div>
      <nav className="max-w-full relative h-full flex flex-col text-sm">
        <ul className="flex flex-wrap z-50">
          <li className="block relative">
            <a
              href="#"
              className="px-5 transition duration-300 hover:text-[#008080]"
            >
              Terms and Conditions
            </a>
          </li>
          <li className="block relative">
            <a
              href="#"
              className="px-5 transition duration-300 hover:text-[#008080]"
            >
              Privacy Policy
            </a>
          </li>
        </ul>{" "}
      </nav>
      <div className=" font-semibold text-sm">
        © 2025 | All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
