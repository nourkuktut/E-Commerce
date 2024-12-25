import React, { useContext } from "react";
import img1 from "../../assets/imgs/img1.jpeg";
import { CartContext } from "../../context/Cart.context";
import { wishListContext } from "../../context/WishList.context";

export default function WishListItem({ product }) {
  let { addProductToCart } = useContext(CartContext);
  let { removeProductFromWishList } = useContext(wishListContext);
  const { id, title, price, imageCover } = product;
  return (
    <>
      <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* صورة المنتج */}
        <div className="aspect-w-4 aspect-h-3">
          <img
            src={imageCover}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        {/* تفاصيل المنتج */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 mt-2">{price} L.E</p>
        </div>
        {/* الأزرار */}
        <div className="flex justify-between gap-4 px-4 pb-4">
          {/* زر الإضافة للسلة */}
          <div
            onClick={() => {
              if (id) {
                addProductToCart({ productId: id });
              } else {
                console.error("Product ID is undefined");
              }
            }}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-primary-600 bg-gray-100 rounded-xl hover:bg-primary-600 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-cart-shopping mr-2"></i>
            Add to Cart
          </div>
          {/* زر الإزالة */}
          <div
            onClick={() => {
              if (id) {
                removeProductFromWishList({ productId: id });
              } else {
                console.error("Product ID is undefined");
              }
            }}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-red-600 bg-gray-100 rounded-xl hover:bg-red-600 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-trash mr-2"></i>
            Remove
          </div>
        </div>
      </div>
    </>
  );
}
