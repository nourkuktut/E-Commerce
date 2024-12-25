import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function VerifyResetCode() {
  const [errorResponse, setErrorResponse] = useState(null);
  const navigator = useNavigate();
  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required("* Please provide your resetCode.")
      .matches(/^\d{5,}$/, "* Reset code must be exactly 5 digits."),
  });
  async function sendGmailForeget(values) {
    const loadingClose = toast.loading(
      "Please wait while we process your request..."
    );

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      console.log(data);
      toast.success("Verification successful! Redirecting to login...");
      setTimeout(() => {
        navigator("/resetPassword");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again.",
        {
          position: "top-center",
        }
      );
      setErrorResponse("*" + error.response.data.message);
    } finally {
      toast.dismiss(loadingClose);
    }
  }
  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: sendGmailForeget,
  });
  return (
    <>
      <Helmet>
        <title>Verify Reset Code</title>
      </Helmet>

      <div className="flex items-center justify-center min-h-50 py-5  bg-white">
        <div className="bg-white p-12 rounded-md shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
            Verify Reset Code
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Please enter your code
          </p>
          <form onSubmit={formik.handleSubmit}>
            {/* code Input */}
            <div className="mb-4">
              <label
                htmlFor="resetCode"
                className="block text-gray-600 text-sm font-medium mb-1"
              >
                ResetCode
              </label>
              <input
                type="text"
                id="resetCode"
                name="resetCode"
                placeholder="Enter your code"
                value={formik.values.resetCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // onChange={(e) => setEmail(e.target.value)}
                className="form-control w-full p-2 border rounded-md"
                required
              />
              {formik.touched.resetCode && formik.errors.resetCode ? (
                <p className="not-valid-value text-wrap break-words  text-red-600 font-medium">
                  {formik.errors.resetCode}
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
              Verity
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
