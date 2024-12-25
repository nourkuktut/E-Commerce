import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/Cart.context";
import { wishListContext } from "../../context/WishList.context";

export default function Products() {
  let { addProductToCart } = useContext(CartContext);
  let { addProductToWistList, removeProductFromWishList } =
    useContext(wishListContext);
  const [favorites, setFavorites] = useState({});
  const handleFavoriteClick = (productId) => {
    const isFavorite = favorites[productId];
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !isFavorite,
    }));

    if (isFavorite) {
      removeProductFromWishList({ productId });
    } else {
      addProductToWistList({ productId });
    }
  };

  // استعلام لجلب المنتجات
  function getAllProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let { data, isLoading } = useQuery({
    queryKey: "getProducts",
    queryFn: getAllProducts,
  });

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {data?.data?.data.map((product) => {
          const isFavorite = favorites[product.id] || false; // حالة المفضلة للمنتج
          return (
            <div
              key={product.id}
              className="card my-4 group/card rounded-lg overflow-hidden shadow-md"
            >
              <div className="relative">
                <img src={product.imageCover} alt={product.description} />
                <div className="layer translate-opacity duration-400 group-hover/card:opacity-100 gap-4 flex justify-center items-center absolute w-full h-full left-0 top-0 bg-slate-500 bg-opacity-40 opacity-0">
                  {/* زر المفضلة */}
                  <div
                    onClick={() => handleFavoriteClick(product.id)}
                    className={`icon cursor-pointer w-8 h-8 rounded-full text-xl flex justify-center items-center ${
                      isFavorite
                        ? "bg-red-600 text-white"
                        : "bg-primary-600 text-white"
                    }`}
                  >
                    <i
                      className={`fa-solid ${
                        isFavorite ? "fa-heart" : "fa-heart"
                      }`}
                    ></i>
                  </div>
                  {/* زر إضافة إلى السلة */}
                  <div
                    onClick={() => addProductToCart({ productId: product.id })}
                    className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-600 text-xl text-white flex justify-center items-center"
                  >
                    <i className="fa-solid fa-cart-shopping"></i>
                  </div>
                  {/* زر عرض التفاصيل */}
                  <Link
                    to={`/product/${product.id}`}
                    className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-600 text-xl text-white flex justify-center items-center"
                  >
                    <i className="fa-solid fa-eye"></i>
                  </Link>
                </div>
              </div>

              <div className="Card-body p-4 space-y-3">
                <header>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg text-gray-600 font-semibold line-clamp-1 cursor-pointer">
                      {product.title}
                    </h3>
                  </Link>
                  <Link to={`/product/${product.id}`}>
                    <h4 className="text-primary-600 font-semibold cursor-pointer">
                      {product.category.name}
                    </h4>
                  </Link>
                </header>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span>{`${product.price} L.E`}</span>
                  <div>
                    <i className="fa-solid text-yellow-500 fa-star mr-1"></i>
                    <span>{product.ratingsAverage}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
