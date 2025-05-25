"use client";

import Image from "next/image";
import Link from "next/link";
import NProgress from "nprogress";

export default function PhotographerCard({ photographer }) {
  const { id, name, location, price, rating, tags, profilePic } =
    photographer || {};

  if (!photographer) {
    return null;
  }

  const handleViewProfileClick = () => {
    NProgress.start();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <Image
        src={profilePic || "/images/default-profile.jpg"}
        alt={name || "Photographer Profile"}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate mb-2">
          {name}
        </h3>
        <p className="text-gray-600 text-sm mb-1">{location}</p>
        <p className="text-indigo-600 font-bold text-lg mb-2">₹{price}+</p>
        <div className="flex items-center mb-3">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="text-gray-700">{rating} Rating</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/photographer/${id}`} passHref legacyBehavior>
          <a
            className="block text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleViewProfileClick}
          >
            View Profile
          </a>
        </Link>
      </div>
    </div>
  );
}
