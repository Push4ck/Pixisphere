"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaMapMarkerAlt,
  FaRupeeSign,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { fetchPhotographerById } from "../../../api/photographers";
import InquiryModal from "../../../components/InquiryModal";
import ReviewCard from "../../../components/ReviewCard";

const PhotographerProfilePage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [photographer, setPhotographer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const getPhotographer = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchPhotographerById(id);
          if (data) {
            setPhotographer(data);
          } else {
            setError("Photographer not found.");
          }
        } catch (err) {
          setError("Failed to fetch photographer details. Please try again.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      getPhotographer();
    }
  }, [id]);

  const handleNextImage = () => {
    if (photographer && photographer.portfolio.length > 0) {
      setCurrentGalleryIndex(
        (prevIndex) => (prevIndex + 1) % photographer.portfolio.length
      );
    }
  };

  const handlePrevImage = () => {
    if (photographer && photographer.portfolio.length > 0) {
      setCurrentGalleryIndex(
        (prevIndex) =>
          (prevIndex - 1 + photographer.portfolio.length) %
          photographer.portfolio.length
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="animate-pulse bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="h-64 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
            <div>
              <div className="h-32 bg-gray-300 rounded mb-4"></div>
              <div className="h-24 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-20 bg-gray-300 rounded"></div>
            <div className="h-20 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-600 text-xl">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="ml-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300 cursor-pointer"
        >
          Back to Listing
        </button>
      </div>
    );
  }

  if (!photographer) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-xl">
          Photographer data is not available.
        </p>
        <button
          onClick={() => router.push("/")}
          className="ml-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300 cursor-pointer"
        >
          Back to Listing
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      <header className="bg-white shadow-sm py-4 px-6 md:px-8 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={() => router.push("/")}
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-300 cursor-pointer"
        >
          <FaChevronLeft className="mr-2" /> Back to Listing
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-700">
          Pixisphere
        </h1>
      </header>

      <main className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-1 bg-white rounded-lg shadow-md p-6 h-fit relative lg:sticky lg:top-24">
          <div className="flex flex-col items-center mb-6">
            <img
              src={photographer.profilePic}
              alt={photographer.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 shadow-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/128x128/E5E7EB/1F2937?text=${photographer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}`;
              }}
            />
            <h2 className="text-3xl font-bold text-gray-800 mt-4">
              {photographer.name}
            </h2>
            <p className="text-gray-600 flex items-center mt-1">
              <FaMapMarkerAlt className="mr-1 text-gray-500" />{" "}
              {photographer.location}
            </p>
            <div className="flex items-center text-lg mt-2">
              <FaStar className="text-yellow-500 mr-1" />
              <span className="font-semibold text-gray-700">
                {photographer.rating}
              </span>
            </div>
            <p className="text-2xl font-bold text-indigo-700 mt-3 flex items-center">
              <FaRupeeSign className="mr-1" />{" "}
              {photographer.price.toLocaleString()}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">About</h3>
            <p className="text-gray-700 leading-relaxed">{photographer.bio}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Styles & Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {[...photographer.styles, ...photographer.tags].map(
                (item, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Send Inquiry
          </button>
        </section>

        <section className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Gallery
            </h3>
            {photographer.portfolio && photographer.portfolio.length > 0 ? (
              <div className="relative">
                <img
                  src={photographer.portfolio[currentGalleryIndex]}
                  alt={`Portfolio image ${currentGalleryIndex + 1}`}
                  className="w-full h-96 object-cover rounded-lg shadow-inner mb-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/900x600/E5E7EB/1F2937?text=Image+Not+Found`;
                  }}
                />
                {photographer.portfolio.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors duration-300"
                      aria-label="Previous image"
                    >
                      <FaChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors duration-300"
                      aria-label="Next image"
                    >
                      <FaChevronRight size={20} />
                    </button>
                  </>
                )}
                <div className="flex justify-center gap-2">
                  {photographer.portfolio.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentGalleryIndex(index)}
                      className={`h-2 w-2 rounded-full ${
                        index === currentGalleryIndex
                          ? "bg-indigo-600"
                          : "bg-gray-300"
                      } transition-colors duration-200`}
                      aria-label={`Go to image ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No gallery images available.</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Reviews ({photographer.reviews.length})
            </h3>
            {photographer.reviews && photographer.reviews.length > 0 ? (
              <div className="space-y-4">
                {photographer.reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet.</p>
            )}
          </div>
        </section>
      </main>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        photographerName={photographer.name}
      />
    </div>
  );
};

export default PhotographerProfilePage;
