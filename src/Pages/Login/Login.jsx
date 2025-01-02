import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { object, string, ref } from "yup";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User.context";
import { Helmet } from "react-helmet";

export default function Login() {
  let { setToken } = useContext(UserContext);

  const [InvalidEmailOrPassword, setInvalidEmailOrPassword] = useState(null);

  const navigate = useNavigate();

  const passwordRegx =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema = object({
    email: string()
      .email("Invalid email address")
      .required("Email is required"),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegx,
        " password should be at Min 8 char, at least one upper case  char, one lower case char, one number and one special character"
      ),
  });

  async function SendDataToLogin(values) {
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
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.message == "success") {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success(
          <div className="flex items-center">
            <div>
              <p className="text-lg font-bold">🎉 Welcome!</p>
              <p className="text-sm">User Logged in successfully.</p>
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
      password: "",
    },
    validationSchema,
    onSubmit: SendDataToLogin,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="flex items-center justify-center py-7 bg-white">
        <form
          className="bg-white p-8 rounded-md shadow-sm w-full max-w-md"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-700">
            Login <i className="fa-solid fa-user-tie ml-2"></i>
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

          {/* Register Link */}
          {/* Links */}
          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary-100 hover:underline cursor-pointer"
              >
                Create an account
              </Link>
            </p>
            <a
              href="./forgetpassword"
              className="text-primary-100 hover:underline text-sm mt-2 block cursor-pointer"
            >
              Forget your password?
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
