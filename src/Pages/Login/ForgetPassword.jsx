import React, { useContext, useState } from "react";
import { UserContext } from "../../context/User.context";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import axios from "axios";

export default function ForgetPassword() {
  const emailRegx = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const [errorResponse, setErrorResponse] = useState(null);
  const navigator = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("* Email is required.")
      .matches(emailRegx, "* Invalid email."),
  });

  async function sendGmailForeget(values) {
    const loadingClose = toast.loading("Sending reset email... Please wait.");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      console.log(data);
      if (data.statusMsg === "success") {
        toast.success(
          "Reset email sent successfully! Redirecting to verification page...",
          {
            position: "top-center",
          }
        );
        setTimeout(() => {
          navigator("/verifyResetCode");
        }, 2000);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send reset email. Please try again later.";
      toast.error(errorMessage);
      setErrorResponse("*" + error.response.data.message);
    } finally {
      toast.dismiss(loadingClose);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: sendGmailForeget,
  });

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-50 py-5  bg-white">
        <div className="bg-white p-12 rounded-md shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
            Forgot Password
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Please enter your email
          </p>
          <form onSubmit={formik.handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 text-sm font-medium mb-1"
              >
                Email
                <i class="fa-regular fa-envelope ml-2  text-primary-800"></i>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // onChange={(e) => setEmail(e.target.value)}
                className="form-control w-full p-2 border rounded-md"
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="not-valid-value text-wrap break-words  text-red-600 font-medium">
                  {formik.errors.email}
                </p>
              ) : (
                ""
              )}
              {errorResponse ? (
                <p className="not-valid-value text-red-600 font-medium">
                  {errorResponse}
                </p>
              ) : (
                ""
              )}
            </div>
            {/* Verify Button */}
            <button
              type="submit"
              className="w-full btn bg-primary-900 uppercase text-white font-medium py-2 rounded-md hover:bg-primary-700 transition"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
