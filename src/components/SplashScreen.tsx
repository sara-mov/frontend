// components/SplashScreen.tsx
import { useState, useEffect } from "react";
import Image from "next/image";
import sara from "../../public/sara.png";
import saraDark from "../../public/sara-dark.png";
import { useTheme } from "@/context/ThemeContext";

interface SplashScreenProps {
  duration?: number; // Duration in milliseconds, default is 2000ms (2 seconds)
  children: React.ReactNode;
}

export default function SplashScreen({
  duration = 2000,
  children,
}: SplashScreenProps) {
  const [showSplash, setShowSplash] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (showSplash) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br text-black dark:text-white from-neutral-100 dark:from-neutral-800 dark:to-neutral-900 to-neutral-200">
        <div className="animate-pulse">
          <Image
            src={theme === "light" ? sara : saraDark}
            alt="sara-logo"
            width={150}
            height={150}
          />
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
