import axios from "axios";
import imgcover from "../../assets/imgs/imgcover.jpeg";
import { useContext, useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/Cart.context";
import ReactImageGallery from "react-image-gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import "Swiper/css";
import Card from "../../Components/Card/Card";
import useOnline from "../../hooks/UseOnline";
import { Helmet } from "react-helmet";

export default function ProductDetuils() {
  const [productDetuils, setProductDetuils] = useState(null);
  const [relatedProducts, SetRelatedProducts] = useState(null);
  let { id } = useParams();

  let { addProductToCart } = useContext(CartContext);

  async function getProductDetuils() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: "GET",
      };

      let { data } = await axios.request(options);
      console.log(data);
      setProductDetuils(data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }

  async function getRelatedProducts() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetuils.category._id}`,
        method: "GET",
      };

      let { data } = await axios.request(options);
      SetRelatedProducts(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  // Intial Render +  update id:
  useEffect(() => {
    getProductDetuils();
  }, [id]);

  //* update Render:
  useEffect(() => {
    if (productDetuils == null) return;
    getRelatedProducts();
  }, [productDetuils]);

  let isOnline = useOnline();

  return (
    <>
      {productDetuils ? (
        <>
          <Helmet>
            <title>{productDetuils.title}</title>
          </Helmet>
          <section className="grid grid-cols-2 md:grid-cols-3 l:grid-cols-4 xl:grid-cols-5   p-4 bg-gray-50 rounded-lg shadow-md">
            <div className="flex   items-center justify-center pl-5 pr-5 ">
              <div className="max-w-xs md:max-w-sm w-full object-cover ">
                <ReactImageGallery
                  showFullscreenButton={false}
                  showPlayButton={false}
                  showNav={false}
                  items={
                    productDetuils.images
                      ? productDetuils.images.map((image) => ({
                          original: image,
                          thumbnail: image,
                        }))
                      : []
                  }
                ></ReactImageGallery>
              </div>
            </div>

            <div className="flex flex-col justify-center pr-5 mx-5 my-auto space-y-4">
              <div>
                <h1 className="text-3xl font-semibold text-gray-800">
                  {productDetuils.title}
                </h1>
                <p className="text-sm text-primary-800 mt-1">
                  {productDetuils.category?.name}
                </p>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                {productDetuils.description}
              </p>

              <div className="text-xl font-bold text-primary-600">
                {productDetuils.price} L.E
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <i className=" fa-solid text-yellow-500  fa-star mr-1"></i>
                <span className="ml-2">{productDetuils.ratingsAverage}</span>
              </div>

              {/* hook online or offline */}

              {isOnline && (
                <button
                  onClick={() => {
                    if (id) {
                      addProductToCart({ productId: id });
                    } else {
                      console.error("Product ID is undefined");
                    }
                  }}
                  className="btn text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-300"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </section>

          {/* Related Products Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Related Products
            </h2>
            {relatedProducts ? (
              <Swiper
                slidesPerView={6}
                spaceBetween={20}
                loop={true}
                navigation
              >
                {relatedProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <Card productInfo={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Loading />
            )}
          </section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
