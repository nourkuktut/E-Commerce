import React from "react";

export default function BrandCard() {
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <img
          src={brand.image}
          alt={brand.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{brand.name}</h3>
        </div>
      </div>
    </>
  );
}
