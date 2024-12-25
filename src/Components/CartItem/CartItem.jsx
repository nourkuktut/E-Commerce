import React, { useContext } from "react";
import img1 from "../../assets/imgs/img1.jpeg";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";

export default function CartItem({ productInfo }) {
  let { count, price, product } = productInfo;
  let { imageCover, title, category, id } = product;

  let { removeProductFromCart, updateCountProduct } = useContext(CartContext);
  return (
    <>
      <section>
        <div className="flex items-center justify-between p-6 bg-white shadow-md rounded-lg mb-6 transition-transform transform hover:scale-105">
          {/* صورة المنتج */}
          <div className="flex items-center space-x-6">
            <img
              src={imageCover}
              alt={product}
              className="w-24 h-24 object-cover rounded-md border border-gray-200"
            />
            <div>
              {/* اسم المنتج */}
              <Link to={`/product/${id}`}>
                <h3 className="text-xl font-semibold text-gray-800">
                  ${title}
                </h3>
              </Link>
              {/* السعر */}
              <p className="text-lg text-gray-600 font-medium">{price} L.E</p>
            </div>
          </div>

          {/* فئة المنتج */}
          <h3 className="text-l font-semibold text-gray-500">
            {category.name}
          </h3>

          {/* التحكم في الكمية */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                updateCountProduct({ productId: id, count: count - 1 });
              }}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-md transition cursor-pointer"
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <span className="text-lg font-medium">{count}</span>
            <button
              onClick={() => {
                updateCountProduct({ productId: id, count: count + 1 });
              }}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-md cursor-pointer transition"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>

          {/* زر الحذف */}
          <button
            onClick={() => {
              removeProductFromCart({ productId: id });
            }}
            className=" text-red-600 font-semibold hover:text-white hover:bg-red-600    transition  rounded-xl p-3 bg-gray-100"
          >
            Remove
            <i className="fa-solid fa-trash ml-2"></i>
          </button>
        </div>
      </section>
    </>
  );
}
