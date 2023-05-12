import Image from "next/image";
import banner2 from "@/assets/banner-2.jpg";
import banner3 from "@/assets/banner.png";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";



const Carousel = () => {
  // let imgIndex = 1;

  // const slideIndex = (n: number) => {
  //   showSlides((imgIndex += n));
  // };

  // const showSlides = (index: number) => {
  //   const slide: NodeListOf<HTMLDivElement> = document.querySelectorAll(
  //     ".o-carousel__slides"
  //   );
  //   if (index > slide.length) {
  //     imgIndex = 1;
  //   }

  //   if (index < 1) {
  //     imgIndex = slide.length;
  //   }

  //   console.log(slide);

  //   for (let i = 0; i < slide.length; i++) {
  //     slide[i].style.display = "none";
  //   }

  //   slide[imgIndex - 1].style.display = "block";
  // };

  // useEffect(() => {
  //   showSlides(imgIndex);
  // });

  return (
    // <div className="o-carousel">
    //   <div className="o-carousel__slides">
    //     <Image alt="product" src={banner3} className="o-carousel__image" />
    //   </div>

    //   <div className="o-carousel__slides">
    //     <Image alt="product" src={banner2} className="o-carousel__image" />
    //   </div>

    //   <div className="o-carousel__slides">
    //     <Image alt="product" src={banner3} className="o-carousel__image" />
    //   </div>

    //   <button
    //     onClick={() => {
    //       slideIndex(1);
    //     }}
    //   >
    //     click
    //   </button>
    // </div>
    <Swiper
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    navigation={true}
    modules={[Autoplay, Pagination, Navigation]}
    className="mySwiper"
    >
      <SwiperSlide> <Image alt="product" src={banner2}  className="o-carousel__image"/></SwiperSlide>
      <SwiperSlide><Image alt="product" className="o-carousel__image" src={banner3}  /></SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
