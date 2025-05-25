"use client";

import React, { useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";

const FilterSidebar = ({
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
  uniqueCities,
  uniqueStyles,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStyleChange = (style) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 20000]);
    setMinRating(0);
    setSelectedStyles([]);
    setSelectedCity("");
    setSortOption("default");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg z-20"
        aria-label="Open Filters"
      >
        <FaFilter className="text-xl" />
      </button>

      <div
        className={`fixed inset-y-0 left-0 bg-white w-64 p-6 shadow-xl z-30 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:shadow-none md:bg-transparent md:w-auto md:min-w-[250px] md:pt-0`}
      >
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-2xl font-bold text-indigo-700">Filters</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Search</h3>
          <input
            type="text"
            placeholder="Search by name, tag, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Price Range
          </h3>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-gray-700">
              Min: ₹{priceRange[0].toLocaleString()}
            </span>
            <span className="text-gray-700">
              Max: ₹{priceRange[1].toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="20000"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([parseInt(e.target.value), priceRange[1]])
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-2"
          />
          <input
            type="range"
            min="0"
            max="20000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Ratings</h3>
          <div className="flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="minRating"
                value="4"
                checked={minRating === 4}
                onChange={() => setMinRating(4)}
                className="form-radio text-indigo-600 h-4 w-4"
              />
              <span className="ml-2 text-gray-700">4+ Stars</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="minRating"
                value="3"
                checked={minRating === 3}
                onChange={() => setMinRating(3)}
                className="form-radio text-indigo-600 h-4 w-4"
              />
              <span className="ml-2 text-gray-700">3+ Stars</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="minRating"
                value="0"
                checked={minRating === 0}
                onChange={() => setMinRating(0)}
                className="form-radio text-indigo-600 h-4 w-4"
              />
              <span className="ml-2 text-gray-700">Any Rating</span>
            </label>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Styles</h3>
          <div className="grid grid-cols-2 gap-2">
            {uniqueStyles.map((style) => (
              <label key={style} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={style}
                  checked={selectedStyles.includes(style)}
                  onChange={() => handleStyleChange(style)}
                  className="form-checkbox text-indigo-600 h-4 w-4 rounded"
                />
                <span className="ml-2 text-gray-700">{style}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">City</h3>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          >
            <option value="">All Cities</option>
            {uniqueCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Sort By</h3>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="rating-desc">Rating: High to Low</option>
            <option value="recent">Recently Added</option>
          </select>
        </div>

        <button
          onClick={handleClearFilters}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Clear Filters
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default FilterSidebar;
