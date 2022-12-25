import Text from "@/components/atoms/text";
import Image from "next/image";
import Button from "@/components/atoms/button";
import Heading from "@/components/atoms/heading";
export type CardProps = {
  title: string;
  description: string;
  alt: string;
  src: string;
  price: number;
};

export const Card: React.FC<CardProps> = ({
  src,
  title,
  description,
  alt,
  price,
}) => {
  return (
    <div className="m-card">
      <div className="m-card__img">
        <Image src={src} alt={alt} width={250} height={250} />
      </div>
      <Heading tag="h5" fontSize="16" alignment="left">
        {title}
      </Heading>
      <Text fontSize="14">{description}</Text>
      <Text fontSize="16" fontWeight="bold">
        {price}
      </Text>
      <div className="m-card__button">
        <Button>Add To Card</Button>
      </div>
    </div>
  );
};
