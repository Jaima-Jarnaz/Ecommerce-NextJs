import Text from "@/components/atoms/text";
import Image from "next/image";
import Button from "@/components/atoms/button";
import Heading from "@/components/atoms/heading";
import Link from "next/link";
import { useEffect, useState } from "react";

export type CardProps = {
  id: string;
  title: string;
  description: string;
  alt: string;
  src: string;
  price: number;
  imageUrl: { id: string; url: string };
};

export const Card: React.FC<CardProps> = ({
  src,
  title,
  description,
  alt,
  price,
  id,
  imageUrl,
}) => {
  const [blurred, setBlurred] = useState("");

  const getBase64ImageUrl = async (imageId: string) => {
    console.log(imageId);

    const response = await fetch(
      `https://res.cloudinary.com/dgtz6af7c/image/upload/${imageId}`
    );
    const buffer = await response.arrayBuffer();
    const data = Buffer.from(buffer).toString("base64");
    const url = `data:image/webp;base64,${data}`;
    setBlurred(url);
  };

  useEffect(() => {
    if (imageUrl) {
      getBase64ImageUrl(imageUrl.id);
    }
  }, []);

  console.log(blurred);

  return (
    <div className="m-card">
      <div className="m-card__img">
        <Link href={`product/${id}`}>
          <Image
            src={src}
            alt={alt}
            width={250}
            height={250}
            placeholder="blur"
            blurDataURL={blurred}
          />
        </Link>
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
