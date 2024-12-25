import React, { useContext, useEffect } from "react";
import freshCartLogo from "../../assets/imgs/shopping-cart.png";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/User.context";
import { CartContext } from "../../context/Cart.context";

export default function Navbar() {
  // login?token? change navbar:
  const { token, logOut } = useContext(UserContext);
  const { cartInfo, getProducts } = useContext(CartContext);

  // ? dispaly nvbar in mothing phanes:
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <nav className=" bg-slate-100  shadow-md py-3 fixed top-0 left-0 right-0 z-50">
        <div className=" container flex items-center gap-12">
          <a href="">
            <img
              className="w-7 h-7"
              src={freshCartLogo}
              alt="this is freshCart Logo website"
            />
          </a>

          {token && (
            <>
              <ul className=" flex gap-5  items-center">
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return ` relative before:absolute  before:w-0 before:h-0.5 before:bg-primary-800  before:left-0 before:-bottom-1 hover:before:w-full before:duration-300 before:transition-[width]
                  ${isActive ? "before:!w-full  font-semibold" : ""}`;
                    }}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return ` relative before:absolute  before:w-0 before:h-0.5  before:bg-primary-800  before:left-0 before:-bottom-1 hover:before:w-full before:duration-300 before:transition-[width]
                  
                  ${isActive ? "before:!w-full font-semibold" : ""}`;
                    }}
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return ` relative before:absolute  before:w-0 before:h-0.5  before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:duration-300 before:transition-[width]
                  ${isActive ? "before:!w-full font-semibold" : ""}`;
                    }}
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return ` relative before:absolute  before:w-0 before:h-0.5  before:bg-primary-800  before:left-0 before:-bottom-1 hover:before:w-full before:duration-300 before:transition-[width]
                   ${isActive ? "before:!w-full font-semibold" : ""}`;
                    }}
                    to="/brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return ` relative before:absolute  before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:duration-300 before:transition-[width]
                   ${isActive ? "before:!w-full font-semibold" : ""}`;
                    }}
                    to="/wistList"
                  >
                    WistList
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return ` relative before:absolute  before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:duration-300 before:transition-[width]
                   ${isActive ? "before:!w-full font-semibold" : ""}`;
                    }}
                    to="/allorders"
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>
              {/* cart icon */}
              <Link
                to={"/cart"}
                className="cart relative ml-auto cursor-pointer  "
              >
                <i className="fa-solid fa-cart-shopping text-lg"></i>

                <div className="cart-counter flex justify-center items-center absolute right-0 top-0  h-5 w-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-800 text-white">
                  <span className="text-sm ">
                    {cartInfo == null ? (
                      <i className="fa-solid fa-spinner fa-spin "></i>
                    ) : (
                      <span className=" font-semibold">
                        {cartInfo.numOfCartItems}
                      </span>
                    )}
                  </span>
                </div>
              </Link>
            </>
          )}

          {/* seciol medea icon */}
          <ul
            className={`flex gap-5  items-center text-lg ${
              !token && "ms-auto"
            }`}
          >
            <li>
              <a href="https://www.facebook.com/nourkutkut23" target=" _blank">
                <i className="fa-brands fa-facebook  text-xl "></i>
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com/nourkutkut23/"
                target=" _blank"
              >
                <i className="fa-brands text-xl fa-square-instagram "></i>
              </a>
            </li>

            <li>
              <a href="https://www.tiktok.com" target=" _blank">
                <i className="fa-brands fa-tiktok  text-xl "></i>
              </a>
            </li>

            <li>
              <a href="https://www.x.com" target=" _blank">
                <i className="fa-brands fa-square-x-twitter  text-xl "></i>
              </a>
            </li>

            <li>
              <a href="https://www.linkedin.com" target=" _blank">
                <i className="fa-brands fa-linkedin  text-xl "></i>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com" target=" _blank">
                <i className="fa-brands fa-youtube   text-xl"></i>
              </a>
            </li>
          </ul>
          <ul className=" flex gap-5  items-center">
            {!token && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return ` relative before:absolute  before:w-0 before:h-0.5  before:bg-primary-800  before:left-0 before:-bottom-1 hover:before:w-full before:duration-300 before:transition-[width]
                   ${isActive ? "before:!w-full font-semibold" : ""}`;
                    }}
                    to="/signup"
                  >
                    SignUp
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return ` relative before:absolute  before:w-0 before:h-0.5 before:bg-primary-800  before:left-0 before:-bottom-1 hover:before:w-full before:duration-300 before:transition-[width]
                   ${isActive ? "before:!w-full font-semibold" : ""}`;
                    }}
                    to="/login"
                  >
                    LogIn
                  </NavLink>
                </li>
              </>
            )}
            {token && (
              <>
                <li onClick={logOut}>
                  <a to="">
                    <i className="fa-solid fa-right-from-bracket text-lg"></i>
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
