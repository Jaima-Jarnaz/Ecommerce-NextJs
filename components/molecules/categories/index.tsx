import Image from "next/image";
import { IMAGES } from "@settings/settings";
import React from "react";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow } from "swiper";

const Categories: any = () => {
  return (
    <div className="m-categories">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 200,
          modifier: 1,
        }}
        pagination={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="swiper-container"
      >
        {IMAGES.map((item, index) => {
          return (
            <SwiperSlide className="swiper-slider" key={index}>
              <Link href="#">
                <Image
                  src={item.img}
                  className="swiper-slider-img"
                  alt="images"
                  width={220}
                  height={220}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Categories;
