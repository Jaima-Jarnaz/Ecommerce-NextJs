import banner1 from "@/assets/banner-1.jpg";
import Image from "next/image";
import Text from "@/components/atoms/text";
import { IMAGES } from "@settings/settings";

const Categories = () => {
  return IMAGES.map((item, index) => {
    return (
      <div className="m-categories" key={index}>
        <Image alt="product" src={item.img} width={150} height={150} />
        <Text>{item.title}</Text>
      </div>
    );
  });
};

export default Categories;
