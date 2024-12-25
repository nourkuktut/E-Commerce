import React from "react";
import Login from "./Pages/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import Home from "./Pages/Home/Home";
import Layout from "./Components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./Components/GuestRoute/GuestRoute";
import UserProvider from "./context/User.context";
import CartProvider from "./context/Cart.context";
import Cart from "./Pages/Cart/Cart";
import ProductDetuils from "./Pages/ProductDetuils/ProductDetuils";
import Checkout from "./Pages/Checkout/Checkout";
import Orders from "./Pages/Orders/Orders";
import Online from "./Components/Online/Online";
import Offline from "./Components/Offline/Offline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Brands from "./Pages/Brands/Brands";
import Categories from "./Pages/Categories/Categories";
import Products from "./Pages/Products/Products";
import WishList from "./Pages/WishList/WishList";
import WishListProvider from "./context/WishList.context";
import ForgetPassword from "./Pages/Login/ForgetPassword";
import VerifyResetCode from "./Pages/Login/VerifyResetCode";
import ResetPassword from "./Pages/Login/ResetPassword";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "product/:id", element: <ProductDetuils /> },
        { path: "checkout", element: <Checkout /> },
        { path: "allorders", element: <Orders /> },
        { path: "brands", element: <Brands /> },
        { path: "categories", element: <Categories /> },
        { path: "products", element: <Products /> },
        { path: "wistList", element: <WishList /> },
      ],
    },

    {
      path: "/",
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "/verifyResetCode", element: <VerifyResetCode /> },
        { path: "resetPassword", element: <ResetPassword /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CartProvider>
            <WishListProvider>
              <RouterProvider router={router} />
            </WishListProvider>
          </CartProvider>
        </UserProvider>
        <Toaster position="top-center" />
        <Offline>
          <div className=" p-4  fixed right-8 bottom-8 z-50 rounded-lg shadow-md bg-gray-200 text-gray-600  font-semibold ">
            <i className=" fa-solid fa-wifi mr-2"></i>
            <span>Check Your Internet Connection</span>
          </div>
        </Offline>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
