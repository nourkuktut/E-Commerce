import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import axios from "axios";
import { UserContext } from "../../context/User.context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Checkout() {
  const { cartInfo } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(null);

  //~Cash Order:
  async function createCashOrder(values) {
    const loadingToastId = toast.loading(
      <div className="flex items-center">
        <svg
          className="animate-spin h-5 w-5 text-blue-500 mr-3"
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
        <span>Loading, please wait...</span>
      </div>
    );
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };

      let { data } = await axios.request(options);
      if (data.status == "success") {
        toast.success(
          <div className="flex items-center">
            <div>
              <p className="text-lg font-bold">🎉 Success!</p>
              <p className="text-sm">Your order has been created.</p>
            </div>
          </div>,
          {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
        setTimeout(() => {
          navigate("/allorders");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);

      console.log(error);
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  //* Online Payment:
  async function handleanlinePayment(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.status == "success") {
        const loadingToastId = toast.loading(
          "You are being redirected to the payment page, please wait..."
        );
        setTimeout(() => {
          location.href = data.session.url;
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {
      if (paymentMethod == "cash") createCashOrder(values);
      else handleanlinePayment(values);
    },
  });

  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>

      <div className="flex items-center justify-center pt-5  bg-white">
        <form
          className="bg-white p-8 rounded-md shadow-md w-full max-w-md"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="text-2xl font-bold text-start mb-2 text-gray-700">
            Shipping Address
          </h2>
          {/* city */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              city
            </label>
            <input
              type="text"
              name="shippingAddress.city"
              placeholder="Enter your city"
              className="form-control w-full"
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="shippingAddress.phone"
              placeholder="Enter your phone number"
              className="form-control w-full"
              value={formik.values.shippingAddress.phone}
              onChange={formik.handleChange}
            />
          </div>
          {/* details */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Details
            </label>
            <textarea
              name="shippingAddress.details"
              placeholder=" details"
              className="form-control w-full"
              value={formik.values.shippingAddress.details}
              onChange={formik.handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-start justify-between gap-3 pt-3 bg-white ">
            <button
              onClick={() => {
                setPaymentMethod("cash");
              }}
              type="submit"
              className="w-full btn bg-blue-500  hover:bg-blue-600  font-semibold"
            >
              Cash Order
            </button>
            <button
              onClick={() => {
                setPaymentMethod("online");
              }}
              type="submit"
              className="w-full btn  font-semibold"
            >
              Online Payment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
