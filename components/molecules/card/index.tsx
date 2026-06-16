import Image, { StaticImageData } from "next/image";
import Button from "@/components/atoms/button";
import Link from "next/link";
import { CartContext } from "../../../contexts/card/cardContext";
import { useContext, useEffect, useState } from "react";
import { mapModifiers } from "helpers/libs/utils";

export type CardProps = {
  id: string;
  title: string;
  description: string;
  alt: string;
  src: string | StaticImageData;
  price: number;
};

const getImageUrl = (src: string | StaticImageData) =>
  typeof src === "string" ? src : src.src;

export const Card: React.FC<CardProps> = ({
  src,
  title,
  description,
  alt,
  price,
  id,
}) => {
  const cartContext = useContext(CartContext);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const storedButtonState = localStorage.getItem(`buttonState_${id}`);
    if (storedButtonState) {
      setButtonClicked(JSON.parse(storedButtonState));
    }
  }, [id]);

  useEffect(() => {
    if (!cartContext?.cartItems) return;
    const inCart = cartContext.cartItems.some((item) => {
      const productId = item.productId;
      return (
        productId === id ||
        productId?._id === id ||
        (typeof productId === "object" && productId?._id === id)
      );
    });
    if (inCart) setButtonClicked(true);
  }, [cartContext?.cartItems, id]);

  const handleClick = () => {
    if (!cartContext) return;

    cartContext.addToCart({
      _id: id,
      name: title,
      title,
      price,
      imageUrl: { url: getImageUrl(src) },
    });
    localStorage.setItem(`buttonState_${id}`, JSON.stringify(true));
    setButtonClicked(true);
  };

  return (
    <div className={mapModifiers("m-card", buttonClicked && "disabled")}>
      <Link href={`/product/${id}`}>
        <div className="m-card__img-wrapper">
          <Image
            className="m-card__img"
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 50vw, 270px"
          />
        </div>
      </Link>
      <div className="m-card__body">
        <p className="m-card__name">{title}</p>
        <p className="m-card__desc">{description}</p>
        <p className="m-card__price">{price.toLocaleString()}</p>
        <div className="m-card__button">
          <Button type="primary" onClick={handleClick} isDisabled={buttonClicked}>
            {!buttonClicked ? "Add To Cart" : "Added ✓"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
