import Image from "next/image";
import banner1 from "@/assets/banner-6.jpg";
import banner2 from "assets/preview-page0.jpg";
import banner3 from "assets/Gaming-Gadgets-and-Accessories-copy.webp";

import React from "react";
import Link from "next/link";

export interface BannerProps {
  imgSrc: any;
  width?: number;
  height?: number;
}

const Banner: React.FC<BannerProps> = ({ imgSrc, width, height }) => {
  return (
    <div className="m-banner-container__banner">
      <Link href="#">
        <Image
          src={imgSrc}
          className="m-banner-container__img"
          alt="images"
          width={width}
          height={height}
        />
      </Link>
    </div>
  );
};

export const BannerContainer: any = () => {
  return (
    <div className="m-banner-container">
      <div className="m-banner-container__left-banner">
        <Banner imgSrc={banner1} width={700} height={600} />
      </div>
      <div className="m-banner__right-banners">
        <Banner imgSrc={banner2} width={600} height={300} />
        <Banner imgSrc={banner3} width={600} height={300} />
      </div>
    </div>
  );
};

export default Banner;
