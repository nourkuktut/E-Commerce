import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import Loading from "../Components/Loading/Loading";
import { toast } from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  //~get token :
  let { token } = useContext(UserContext);
  let [cartInfo, setCartInfo] = useState(null);

  //* 1-add prodect to cart:
  async function addProductToCart({ productId }) {
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
        url: "https://ecommerce.routemisr.com/api/v1/cart",
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
                Product added successfully to your cart.
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
        getProducts();
      }
    } catch (error) {
      toast.error("error");
      console.log(error);
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  //^ 2-Get prodect :
  async function getProducts() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);
      setCartInfo(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  //~ 3-Remove Specific product from cart:
  async function removeProductFromCart({ productId }) {
    let toastId = toast.loading("Deleting Product ....", {
      position: "top-right",
    });
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);
      if (data.status == "success") {
        toast.success("Product has been deleted", { position: "top-right" });
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  //! 4-Clear Cart:
  async function clearCart() {
    let toastId = toast.loading("Deleting All Product ....", {
      position: "bottom-right",
    });
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);
      if (data.message == "success") {
        toast.success("All Product has been deleted", {
          position: "bottom-right",
        });

        setCartInfo({
          numOfCartItems: 0,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  // ? Update Count:
  async function updateCountProduct({ productId, count }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };
      let { data } = await axios.request(options);
      if (data.status == "success") {
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getProducts,
        cartInfo,
        removeProductFromCart,
        clearCart,
        updateCountProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
