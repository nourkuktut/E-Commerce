import { useContext, useState } from "react";
import img1 from "../../assets/imgs/img1.jpeg";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";
import { wishListContext } from "../../context/WishList.context";

export default function Card({ productInfo }) {
  const {
    id,
    title,
    price,
    category,
    imageCover,
    ratingsAverage,
    description,
  } = productInfo;
  let { addProductToCart } = useContext(CartContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeProductFromWishList({ productId: id });
    } else {
      addProductToWistList({ productId: id });
    }
    setIsFavorite(!isFavorite);
  };

  let { addProductToWistList, removeProductFromWishList } =
    useContext(wishListContext);

  return (
    <>
      <div className="card   my-4 group/card  rounded-lg overflow-hidden shadow-md ">
        <div className=" relative">
          <img src={imageCover} alt={description} />

          <div className="layer translate-opacity duration-400  group-hover/card:opacity-100 gap-4 flex justify-center items-center absolute w-full h-full  left-0 top-0 bg-slate-500 bg-opacity-40 opacity-0">
            {/* <div
              onClick={() => {
                addProductToWistList({ productId: id });
              }}
              className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-600  text-xl text-white flex justify-center items-center"
            >
              <i className=" fa-solid fa-heart "></i>
            </div> */}

            <div
              onClick={handleFavoriteClick}
              className={`icon cursor-pointer w-8 h-8 rounded-full text-xl flex justify-center items-center ${
                isFavorite
                  ? "bg-red-600 text-white"
                  : "bg-primary-600 text-white"
              }`}
            >
              <i
                className={`fa-solid ${isFavorite ? "fa-heart" : "fa-heart"}`}
              ></i>
            </div>

            <div
              onClick={() => {
                addProductToCart({ productId: id });
              }}
              className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-600  text-xl text-white flex justify-center items-center"
            >
              <i className=" fa-solid fa-cart-shopping "></i>
            </div>
            <Link
              to={`/product/${id}`}
              className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-600  text-xl text-white flex justify-center items-center"
            >
              <i className=" fa-solid fa-eye "></i>
            </Link>
          </div>
        </div>

        <div className="Card-body p-4 space-y-3">
          <header>
            <Link to={`/product/${id}`}>
              <h3 className="text-lg text-gray-600 font-semibold line-clamp-1 cursor-pointer">
                {title}
              </h3>
            </Link>
            <Link to={`/product/${id}`}>
              <h4 className="text-primary-600 font-semibold  cursor-pointer">
                {category.name}
              </h4>
            </Link>
          </header>
          <p className="text-gray-600 text-sm line-clamp-2 ">{description}</p>
          <div className=" flex justify-between items-center ">
            <span>{`${price} L.E`}</span>
            <div>
              <i className=" fa-solid text-yellow-500  fa-star mr-1"></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
