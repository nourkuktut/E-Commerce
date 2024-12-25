import React from "react";
import imgError from "../../assets/imgs/404error.svg";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-100 ">
        <img
          src={imgError}
          alt="404 Not Found"
          className="max-w-full h-80 mb-6"
        />

        <Link
          to="/"
          className="btn px-6 py-3 bg-pink-800  text-white font-semibold rounded-md shadow "
        >
          Go Back Home
        </Link>
      </div>
    </>
  );
}
