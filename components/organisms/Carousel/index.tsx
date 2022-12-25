import Image from "next/image";
import banner2 from "@/assets/banner-2.jpg";
import banner4 from "@/assets/banner-4.png";
import banner5 from "@/assets/banner-5.png";

const Carousel = () => {
  return (
    <div className="o-carousel">
      <div>
        <Image alt="product" src={banner2} className="o-carousel__image" />
      </div>
    </div>
  );
};

export default Carousel;
