"use client";
import ExampleQueries from "@/components/ExampleQueries";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import SplashScreen from "@/components/SplashScreen";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    document.title = "Search - SARA";
  }, []);

  if (!session) {
    redirect("/sign-in"); // Redirects unauthenticated users
  }

  return (
    <SplashScreen duration={2000}>
      <div className="bg-gradient-to-br transition duration-200 text-black dark:text-white from-neutral-100 dark:from-neutral-800 dark:to-neutral-900 to-neutral-200">
        <div className="py-5 px-5 md:px-20">
          {/* Header */}
          <Navbar />
          {/* Hero Section */}
          <main className="relative pt-20 text-center lg:px-8">
            {/* Gradient Background */}
            <div className="absolute left-1/2 top-0 h-[300px] sm:h-[400px] md:h-[500px] w-[90%] sm:w-[600px] md:w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-800 blur-3xl" />

            {/* Heading & Description */}
            <div className="relative max-w-4xl mx-auto">
              <h1 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-snug">
                Lights, Camera, Curate – <br className="hidden sm:block" />
                Your Perfect Movie Awaits.
              </h1>
              <p className="mx-auto mb-12 max-w-xl text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                Discover the magic behind every movie night with personalized
                recommendations tailored to your taste. Dive into a curated
                world of films where your perfect pick is always waiting!
              </p>

              {/* Search Bar */}
              <div className="mb-10">
                <SearchBar
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              </div>

              {/* Example Queries */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-neutral-600">
                <ExampleQueries
                  title={"Inception"}
                  description={"Search by a specific movie title."}
                  setSearchValue={setSearchValue}
                />
                <ExampleQueries
                  title={"Tom Hanks movies"}
                  description={"Find films featuring your favorite actor."}
                  setSearchValue={setSearchValue}
                />
                <ExampleQueries
                  title={"Best comedies of 2024"}
                  description={"Look up recent films in a particular genre."}
                  setSearchValue={setSearchValue}
                />
                <ExampleQueries
                  title={"Mind-bending thrillers"}
                  description={"Search by mood or film style."}
                  setSearchValue={setSearchValue}
                />
                <ExampleQueries
                  title={"Oscar-winning dramas"}
                  description={"Filter by award-winning criteria."}
                  setSearchValue={setSearchValue}
                />
              </div>
            </div>
          </main>

          {/* Footer */}
          <div className="mt-10">
            <Footer />
          </div>
        </div>
      </div>
    </SplashScreen>
  );
}
