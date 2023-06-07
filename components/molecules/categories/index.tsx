import banner1 from "@/assets/banner-1.jpg";
import banner2 from "@/assets/banner-2.jpg";

import Image, { StaticImageData } from "next/image";
import Text from "@/components/atoms/text";
import { IMAGES } from "@settings/settings";
import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";

// export type Type = {
//   img: string;
//   title: string;
// };

// export interface CategoriesProps {
//   data: Type[];
// }

// const Categories: any = () => {
//   return IMAGES.map((item: any, index: number) => {
//     return (
//       <div className="m-categories" key={index}>
//         <Image alt="product" src={item.img} width={150} height={150} />
//         <Text>{item.title}</Text>
//       </div>
//     );
//   });
// };

const Categories: any = () => {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1.5,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="swiper-container"
      >
        <SwiperSlide className="swiper-slider">
          <Image
            src={banner1}
            className="swiper-slider-img"
            alt=""
            width={100}
            height={100}
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slider">
          <Image
            alt=""
            src={banner2}
            width={100}
            height={100}
            className="swiper-slider-img"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slider">
          <Image
            alt=""
            src={banner1}
            width={200}
            height={200}
            className="swiper-slider-img"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slider">
          <Image
            alt=""
            src={banner1}
            width={100}
            height={100}
            className="swiper-slider-img"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Categories;
