import React from "react";

export default function CategorieCard() {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 text-center">
          <h3 className="text-xl font-semibold">{category.name}</h3>
        </div>
      </div>
    </>
  );
}
