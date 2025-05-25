"use client"; // This directive marks the component as a Client Component

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { fetchAllPhotographers } from "../api/photographers";
import useDebounce from "../hooks/useDebounce";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [allPhotographers, setAllPhotographers] = useState([]);
  const [photographers, setPhotographers] = useState([]); // Filtered and sorted list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters and Sorting
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // Debounce search input
  const [priceRange, setPriceRange] = useState([0, 20000]); // Assuming max price is 20k
  const [minRating, setMinRating] = useState(0); // 0, 3, 4
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [sortOption, setSortOption] = useState("default"); // 'price-asc', 'rating-desc', 'recent'

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 6; // Number of items to load per page

  // Fetch initial photographers
  useEffect(() => {
    const getPhotographers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAllPhotographers();
        setAllPhotographers(data);
        setPhotographers(data); // Initialize filtered list with all data
      } catch (err) {
        setError(
          "Failed to fetch photographers. Please check your network and JSON Server."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getPhotographers();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = allPhotographers.filter((photographer) => {
      // Search
      const matchesSearch =
        debouncedSearchQuery === "" ||
        photographer.name
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) ||
        photographer.location
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) ||
        photographer.tags.some((tag) =>
          tag.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        );

      // Price Range
      const matchesPrice =
        photographer.price >= priceRange[0] &&
        photographer.price <= priceRange[1];

      // Rating
      const matchesRating = photographer.rating >= minRating;

      // Styles
      const matchesStyles =
        selectedStyles.length === 0 ||
        selectedStyles.some((style) => photographer.styles.includes(style));

      // City
      const matchesCity =
        selectedCity === "" || photographer.location === selectedCity;

      return (
        matchesSearch &&
        matchesPrice &&
        matchesRating &&
        matchesStyles &&
        matchesCity
      );
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortOption === "price-asc") {
        return a.price - b.price;
      } else if (sortOption === "rating-desc") {
        return b.rating - a.rating;
      } else if (sortOption === "recent") {
        // Simulate "recently added" by ID, assuming higher ID means more recent
        return b.id - a.id;
      }
      return 0; // Default or no sort
    });

    setPhotographers(filtered);
    setPage(1); // Reset pagination when filters/sort change
    setHasMore(true); // Assume there's more data initially after filter/sort
  }, [
    allPhotographers,
    debouncedSearchQuery,
    priceRange,
    minRating,
    selectedStyles,
    selectedCity,
    sortOption,
  ]);

  // Infinite Scroll / Load More Logic
  const paginatedPhotographers = photographers.slice(0, page * ITEMS_PER_PAGE);

  useEffect(() => {
    setHasMore(paginatedPhotographers.length < photographers.length);
  }, [paginatedPhotographers.length, photographers.length]);

  const loadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  // Derived state for filter options
  const uniqueCities = [...new Set(allPhotographers.map((p) => p.location))];
  const uniqueStyles = [...new Set(allPhotographers.flatMap((p) => p.styles))];

  const contextValue = {
    photographers: paginatedPhotographers, // Pass paginated photographers
    allPhotographers, // To access all data for filter options
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
    ITEMS_PER_PAGE,
    currentPage: page, // Current pagination page
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
