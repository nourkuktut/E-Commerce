import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useFormik } from "formik";
import { object, string, ref } from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { UserContext } from "../../context/User.context";

export default function ResetPassword() {
  let { setToken } = useContext(UserContext);
  const [InvalidEmailOrPassword, setInvalidEmailOrPassword] = useState(null);

  const navigate = useNavigate();
  const passwordRegx =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema = object({
    email: string()
      .email("Invalid email address")
      .required("Email is required"),
    newPassword: string()
      .required("Password is required")
      .matches(
        passwordRegx,
        " password should be at Min 8 char, at least one upper case  char, one lower case char, one number and one special character"
      ),
  });

  async function SendDataToResetPass(values) {
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
        <span>Loading, please wait...</span>
      </div>
    );
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };
      let { data } = await axios.request(options);
      console.log(data);

      if (data.message == "success") {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success(
          <div className="flex items-center">
            <div>
              <p className="text-lg font-bold">🎉 Welcome Back!</p>
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
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setInvalidEmailOrPassword(error.response.data.message);
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: SendDataToResetPass,
  });

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>

      <div className="flex items-center justify-center py-7 bg-white">
        <form
          className="bg-white p-8 rounded-md shadow-sm w-full max-w-md"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-700">
            Reset Password <i className="fa-solid fa-user-tie ml-2"></i>
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={` form-control w-full ${
                formik.touched.email && formik.errors.email
                  ? "border-red-600"
                  : ""
              } `}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter your password"
              className={` form-control w-full ${
                formik.touched.newPassword && formik.errors.newPassword
                  ? "border-red-600"
                  : ""
              } `}
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.newPassword}
              </p>
            )}
            {InvalidEmailOrPassword && (
              <p className="text-red-500 text-sm mt-1">
                {InvalidEmailOrPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full btn">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
