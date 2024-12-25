import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { object, string, ref } from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Signup() {
  const navigate = useNavigate();
  const [accountExistError, setAccountExistError] = useState(null);

  const passwordRegx =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema = object({
    name: string()
      .min(3, "Name must be at least 3 characters")
      .max(25, "Name can not be more than 25 characters")
      .required("Name is required"),
    email: string()
      .email("Invalid email address")
      .required("Email is required"),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegx,
        " password should be at Min 8 char, at least one upper case  char, one lower case char, one number and one special character"
      ),
    rePassword: string()
      .oneOf([ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    phone: string()
      .matches(
        /^(010|011|012|015)\d{8}$/,
        "Phone number must be a valid Egyptian number"
      )
      .required("Phone number is required"),
  });

  async function SendDataToRegister(values) {
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
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.message == "success") {
        toast.success(
          <div className="flex items-center">
            <div>
              <p className="text-lg font-bold">🎉 Success!</p>
              <p className="text-sm">Your action was completed successfully.</p>
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
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setAccountExistError(error.response.data.message);
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: SendDataToRegister,
  });

  return (
    <>
      <Helmet>
        <title>SignUp</title>
      </Helmet>

      <div className="flex items-center justify-center pt-5  bg-white">
        <form
          className="bg-white p-8 rounded-md shadow-md w-full max-w-md"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-700">
            Register <i className="fa-solid fa-user-tie ml-2"></i>
          </h2>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className={` form-control w-full ${
                formik.touched.name && formik.errors.name
                  ? "border-red-600"
                  : ""
              } `}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>
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
            {accountExistError && (
              <p className="text-red-500 text-sm mt-1">{accountExistError}</p>
            )}
          </div>
          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className={` form-control w-full ${
                formik.touched.password && formik.errors.password
                  ? "border-red-600"
                  : ""
              } `}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>
          {/* Re-enter Password */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Re-enter Password
            </label>
            <input
              type="password"
              name="rePassword"
              placeholder="Re-enter your password"
              className={` form-control w-full ${
                formik.touched.rePassword && formik.errors.rePassword
                  ? "border-red-600"
                  : ""
              } `}
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.rePassword && formik.errors.rePassword && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.rePassword}
              </p>
            )}
          </div>
          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              className={` form-control w-full ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-600"
                  : ""
              } `}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
            )}
          </div>
          {/* Submit Button */}
          <button type="submit" className="w-full btn mt-2">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
