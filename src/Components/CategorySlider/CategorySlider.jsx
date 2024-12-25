import axios from "axios";
import React, { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import Loading from "../Loading/Loading";

export default function CategorySlider() {
  const [categories, setCategories] = useState(null);

  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };

    let {
      data: { data },
    } = await axios.request(options);
    setCategories(data);
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <section className="my-12">
        <h2 className="mb-5 text-xl text-gray-800 font-semibold">
          Shop Popular Categories
        </h2>
        {!categories ? (
          <Loading />
        ) : (
          <Swiper slidesPerView={6} loop={true}>
            {categories.map((category) => (
              <SwiperSlide key={category._id}>
                <div className="h-60">
                  <img
                    className="w-full h-full object-cover"
                    src={category.image}
                    alt="`category ${category.name}`"
                  />
                </div>
                <h3 className="mt-2 text-center text-primary-600 font-semibold">
                  {category.name}
                </h3>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
    </>
  );
}
