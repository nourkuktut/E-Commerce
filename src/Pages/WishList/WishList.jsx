import React, { useContext, useEffect } from "react";
import { wishListContext } from "../../context/WishList.context";

import { CartContext } from "../../context/Cart.context";
import Loading from "../../Components/Loading/Loading";
import WishListItem from "../../Components/WishListItem/WishListItem";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function WishList() {
  let { wistList, getWishList } = useContext(wishListContext);

  useEffect(() => {
    getWishList();
  }, []);
  // console.log(wistList, "wistlist:");

  return (
    <>
      <Helmet>
        <title>WistList</title>
      </Helmet>
      {wistList == null ? (
        <Loading />
      ) : (
        <div className=" container mx-auto  px-4  pb-6">
          <div className=" flex gap-4 text-3xl text-primary-800 font-bold text-center items-center justify-center my-2  pb-2  ">
            <h2 className="  relative pb-1 after:absolute  after:w-0.5 pr-3  after:h-3/4 after:bg-primary-600 after:-right-1 after:top-1/2  after:-translate-y-1/2">
              Your WishList
            </h2>
            <i className=" fa-solid fa-heart "></i>
          </div>
          {wistList.count == 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600">
                Your wishlist is empty!
              </h2>
              <p className="text-gray-500 mt-2 mb-4">
                Start adding some favorite products.
              </p>
              <Link
                to="/"
                className="btn bg-primary-800 text-white hover:bg-primary-900  text-center rounded-xl"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {wistList.data.map((product) => (
                <WishListItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
