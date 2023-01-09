import banner1 from "@/assets/banner-1.jpg";
import Image, { StaticImageData } from "next/image";
import Text from "@/components/atoms/text";
import { IMAGES } from "@settings/settings";
import React from "react";

// export type Type = {
//   img: string;
//   title: string;
// };

// export interface CategoriesProps {
//   data: Type[];
// }

const Categories: any = () => {
  return IMAGES.map((item: any, index: number) => {
    return (
      <div className="m-categories" key={index}>
        <Image alt="product" src={item.img} width={150} height={150} />
        <Text>{item.title}</Text>
      </div>
    );
  });
};

export default Categories;
