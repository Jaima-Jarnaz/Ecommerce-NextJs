import Image from "next/image";
import { IMAGES_BRANDS } from "@settings/settings";
import React from "react";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const Brands: any = () => {
  return (
    <div className="m-brands">
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay
        slidesPerView={4}
        spaceBetween={80}
        navigation={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        modules={[Autoplay, Navigation]}
        className="swiper-container"
      >
        {IMAGES_BRANDS.map((item, index) => {
          return (
            <SwiperSlide className="swiper-slider" key={index}>
              <div style={{ width: "240px" }}>
                <Link href="#">
                  <Image
                    src={item.img}
                    className="swiper-slider-img"
                    alt="images"
                    width={220}
                    height={175}
                  />
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Brands;
