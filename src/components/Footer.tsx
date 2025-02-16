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
      <div className=" font-semibold text-sm">2025 | All rights reserved.</div>
    </footer>
  );
};

export default Footer;
