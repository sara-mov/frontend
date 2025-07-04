/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  faMagnifyingGlass,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchValue,
  setSearchValue,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = React.useRef<SpeechRecognition | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://sara-mov.vercel.app/api/movie/recommend",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: searchValue }),
        }
      );
      const data = await res.json();

      if (data.movies) {
        // Save to localStorage
        localStorage.setItem("latestMovies", JSON.stringify(data.movies));
        router.push(`/recommend?q=${searchValue}`);
      }

      setLoading(true);
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionAPI =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (!SpeechRecognitionAPI) {
        setError("Speech recognition is not supported in your browser.");
        return;
      }

      recognitionRef.current = new SpeechRecognitionAPI();
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false; // Stop after one speech input
        recognitionRef.current.interimResults = false; // Get final result only
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onstart = () => setIsListening(true);
        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          setSearchValue(transcript);
        };
        recognitionRef.current.onerror = (event: SpeechRecognitionEvent) => {
          setError(`Error: ${event.error}`);
        };
        recognitionRef.current.onend = () => setIsListening(false);
      }
    }
  }, [setSearchValue]);

  const handleVoiceSearch = () => {
    if (!recognitionRef.current) return;

    if (!isListening) {
      recognitionRef.current.start();
    } else {
      recognitionRef.current.stop();
    }
  };

  return (
    <>
      <div className="relative mx-auto mb-8 max-w-2xl">
        <div className="relative w-full group">
          <input
            type="text"
            placeholder="What are you in the mood for? Type or speak…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full rounded-full border border-neutral-300 bg-neutral-100 px-6 py-4 pr-32 shadow-lg focus:outline-none dark:border-neutral-700 dark:bg-neutral-200 dark:text-black relative z-10 text-xs md:text-sm lg:text-base placeholder:text-xs sm:placeholder:text-sm"
          />
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 blur-xl opacity-0 transition-opacity duration-300 group-focus-within:opacity-60 animate-moveGradient z-0 ${
              isListening && "opacity-60"
            }`}
          ></div>
        </div>

        <button
          onClick={handleVoiceSearch}
          className={`absolute flex gap-2 right-[80px] top-1/2 -translate-y-1/2 rounded-full px-4 py-3 z-20 transition ${
            isListening ? "bg-red-500" : "bg-black"
          } text-white`}
        >
          {isListening ? (
            <span className="animate-pulse text-xs">Listening...</span>
          ) : (
            <FontAwesomeIcon icon={faMicrophone} className="text-lg" />
          )}
        </button>

        <button
          onClick={fetchMovies}
          className="absolute flex gap-2 right-2 top-1/2 -translate-y-1/2 rounded-full bg-black text-white px-6 py-3 z-20"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-lg" />
        </button>
      </div>
      {error && <p className="text-red-500 mb-4 -mt-3">{error}</p>}
    </>
  );
};

export default SearchBar;
