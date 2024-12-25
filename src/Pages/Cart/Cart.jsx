import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import Loading from "../../Components/Loading/Loading";
import CartItem from "../../Components/CartItem/CartItem";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  let { getProducts, cartInfo, clearCart } = useContext(CartContext);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>cart</title>
      </Helmet>

      {cartInfo == null ? (
        <Loading />
      ) : (
        <section>
          <div className=" flex gap-4 items-start my-3 text-xl pb-5 font-semibold text-slate-600">
            <i className="fa-brands fa-opencart "></i>
            <h2 className=" relative before:absolute  before:w-0.5 pl-3  before:h-3/4 before:bg-slate-600 before:-left-1  before:top-1/2  before:-translate-y-1/2">
              Your Shopping Cart
            </h2>
          </div>

          {cartInfo.numOfCartItems == 0 ? (
            <>
              <div className="max-w-4xl mx-auto mb-10 mt-10 bg-gray-100 rounded-2xl shadow-md flex flex-col gap-3 items-center justify-center p-4">
                <h2 className="text-xl font-bold text-gray-700  text-center pt-3 pb-2">
                  Oops! Your cart is empty . Start shopping now by clicking the
                  button below and find something you Love !
                </h2>
                <Link
                  to="/"
                  className="btn bg-primary-800 text-white hover:bg-primary-900  text-center rounded-xl "
                >
                  Back to home
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className=" bg-gray-50 p-6">
                {cartInfo.data.products.map((product) => (
                  <CartItem key={product._id} productInfo={product}></CartItem>
                ))}
              </div>
              <div className="  flex justify-between  items-center my-4 font-semibold p-3">
                <p className=" text-xl">
                  <i className="fa-solid fa-dollar-sign mr-1 text-primary-800"></i>
                  Your Total Cart Price is
                  <span className=" text-primary-800 ml-2 font-bold">
                    ${cartInfo.data.totalCartPrice} L.E
                  </span>
                </p>
                <button
                  onClick={clearCart}
                  className=" text-red-600 font-semibold hover:text-white hover:bg-red-600    transition  rounded-xl p-3 bg-gray-100"
                >
                  Remove Cart
                  <i className="fa-solid fa-trash ml-2"></i>
                </button>
              </div>

              <Link
                to="/checkout"
                className=" btn inline-block w-full text-center mt-6 font-bold  "
              >
                Next Step (Payment)
              </Link>
            </>
          )}
        </section>
      )}
    </>
  );
}
