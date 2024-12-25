import axios from "axios";
import { createContext, useCallback, useContext, useState } from "react";
import React from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "./User.context";

export const wishListContext = createContext();

export default function WishListProvider({ children }) {
  const [wistList, setWistList] = useState(null);
  const { token } = useContext(UserContext);

  // ~1- addProdecutToWishList
  async function addProductToWistList({ productId }) {
    // console.log("add product to wishList");
    const loadingToastId = toast.loading(
      <div className="flex items-center">
        <svg
          className="animate-spin h-5 w-5 text-primary-500 mr-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <span>Adding Product, please wait...</span>
      </div>
    );
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };

      let { data } = await axios.request(options);
      // console.log(data);
      if (data.status == "success") {
        toast.success(
          <div className="flex items-center">
            <div>
              <p className="text-lg font-bold">🎉success!</p>
              <p className="text-sm">
                Product added successfully to your wishList.
              </p>
            </div>
          </div>,
          {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
        getWishList();
      }
    } catch (error) {
      toast.error("error");
      console.log(error);
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  // *2- getWishList
  async function getWishList() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token,
        },
      };

      const { data } = await axios.request(options);
      setWistList(data);
      // console.log(data);
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  }

  //~ 3-Remove Specific product fromWishList :
  async function removeProductFromWishList({ productId }) {
    let toastId = toast.loading("Deleting Product From Wish List ....", {
      position: "top-right",
    });
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);
      if (data.status == "success") {
        toast.success("Product has been deleted", { position: "top-right" });
        getWishList();

        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <wishListContext.Provider
      value={{
        wistList,
        getWishList,
        addProductToWistList,
        removeProductFromWishList,
      }}
    >
      {children}
    </wishListContext.Provider>
  );
}
