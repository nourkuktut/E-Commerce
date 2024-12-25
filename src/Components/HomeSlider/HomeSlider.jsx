import silderImage1 from "../../assets/imgs/slider-image-1.jpeg";
import silderImage2 from "../../assets/imgs/slider-image-2.jpeg";
import silderImage3 from "../../assets/imgs/slider-image-3.jpeg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

export default function HomeSlider() {
  return (
    <>
      <section className=" grid grid-cols-12 mb-12 mt-2">
        <div className=" col-span-8 ">
          <Swiper slidesPerView={1} loop={true} className="h-full">
            <SwiperSlide>
              <img
                className="w-full h-full   "
                src={silderImage3}
                alt="THis is img describes cokoadnl kolutici product"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full h-full "
                src={silderImage3}
                alt="THis is img describes cokoadnl kolutici product"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="col-span-4 h-full">
          <img
            className="w-full h-1/2"
            src={silderImage1}
            alt="this is  img describes a bag containing a variety of vegetables."
          />
          <img
            className="w-full h-1/2"
            src={silderImage2}
            alt="this is  img describes wafer rolls prodect"
          />
        </div>
      </section>
    </>
  );
}
