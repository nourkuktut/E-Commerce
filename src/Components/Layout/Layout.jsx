import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className=" container pb-10 min-h-[60vh] pt-20 ">
        <Outlet></Outlet>
      </div>

      <Footer />
    </>
  );
}
