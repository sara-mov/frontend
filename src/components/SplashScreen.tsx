import { useState, useEffect } from "react";
import Image from "next/image";
import sara from "../../public/sara.png";
import saraDark from "../../public/sara-dark.png";
import { useTheme } from "@/context/ThemeContext";

interface SplashScreenProps {
  isLoading?: boolean;
  duration?: number;
  children: React.ReactNode;
}

export default function SplashScreen({
  isLoading,
  duration = 2000,
  children,
}: SplashScreenProps) {
  const [showSplash, setShowSplash] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    if (isLoading === false) {
      setShowSplash(false); // Hide splash immediately when isLoading becomes false
    } else if (isLoading === undefined) {
      // If isLoading is not provided, use duration instead
      const timer = setTimeout(() => setShowSplash(false), duration);
      return () => clearTimeout(timer);
    }
  }, [isLoading, duration]);

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
