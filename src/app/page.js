"use client";

import React from "react";
import PhotographerCard from "../components/PhotographerCard";
import FilterSidebar from "../components/FilterSidebar";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const {
    photographers,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    selectedStyles,
    setSelectedStyles,
    selectedCity,
    setSelectedCity,
    sortOption,
    setSortOption,
    hasMore,
    loadMore,
    uniqueCities,
    uniqueStyles,
    allPhotographers,
  } = useAppContext();

  const getSmartSuggestion = () => {
    const topRatedOutdoorMaternity = allPhotographers
      .filter(
        (p) =>
          p.styles.includes("Outdoor") &&
          p.tags.includes("Maternity") &&
          p.rating >= 4.5 &&
          p.location === "Bengaluru"
      )
      .sort((a, b) => b.rating - a.rating);

    if (topRatedOutdoorMaternity.length > 0) {
      return (
        <p className="text-sm text-gray-600 mb-4 bg-yellow-50 p-3 rounded-md border border-yellow-200">
          ✨ <strong>Smart Suggestion:</strong> Top-rated outdoor maternity
          photographers in Bengaluru:{" "}
          {topRatedOutdoorMaternity.map((p) => p.name).join(", ")}
        </p>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between sticky top-0 sm:z-10 lg:z-50 w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-4 md:mb-0">
          Pixisphere
        </h1>
        <div className="w-full md:w-auto flex-grow md:flex-grow-0">
          <div className="relative md:hidden w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-3 pl-10 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              width="20"
              height="20"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.39L19.02 18.02a.75.75 0 11-1.06 1.06l-6.57-6.57A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row container mx-auto px-4 py-8 gap-6">
        <FilterSidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          minRating={minRating}
          setMinRating={setMinRating}
          selectedStyles={selectedStyles}
          setSelectedStyles={setSelectedStyles}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          sortOption={sortOption}
          setSortOption={setSortOption}
          uniqueCities={uniqueCities}
          uniqueStyles={uniqueStyles}
        />

        <section className="flex-grow p-4 md:p-6 bg-white rounded-lg shadow-md min-h-[calc(100vh-120px)]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Maternity Photographers in Bengaluru
          </h2>

          {getSmartSuggestion()}

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg shadow-md h-96">
                  <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-10 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <p className="text-red-600 text-center text-lg mt-8">{error}</p>
          )}

          {!loading && !error && photographers.length === 0 && (
            <p className="text-gray-600 text-center text-lg mt-8">
              No photographers found matching your criteria.
            </p>
          )}

          {!loading && !error && photographers.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {photographers.map((photographer) => (
                  <PhotographerCard
                    key={photographer.id}
                    photographer={photographer}
                  />
                ))}
              </div>
              {hasMore && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMore}
                    className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}
