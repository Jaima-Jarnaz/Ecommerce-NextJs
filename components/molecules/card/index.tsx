import Text from "@/components/atoms/text";
import Image, { StaticImageData } from "next/image";
import Button from "@/components/atoms/button";
import Heading from "@/components/atoms/heading";
import Link from "next/link";
import { CartContext } from "../../../contexts/card/cardContext";
import { useContext, useState, useEffect } from "react";
import { mapModifiers } from "helpers/libs/utils";

export type CardProps = {
  id: string;
  title: string;
  description: string;
  alt: string;
  src: string | StaticImageData;
  price: number;
};

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

  // Retrieve the button state from localStorage on component mount
  useEffect(() => {
    const storedButtonState = localStorage.getItem(`buttonState_${id}`);
    if (storedButtonState) {
      setButtonClicked(JSON.parse(storedButtonState));
    }
  }, [id]);
  // const cartContext = useContext(CartContext);

  // if (!cartContext) {
  //   // Handle the case where the context is undefined (optional)
  //   return (
  //     <div className="m-card">
  //       <p>Cart context is not available.</p>
  //     </div>
  //   );
  // }

  const TOTAL_CART_ITEMS = "total_card_items";

  const { setItemsCount, itemsCount, addToCart, cartItems }: any =
    useContext(CartContext);
  const handleClick = (id: string) => {
    addToCart(id);
    // Save the button state to localStorage whenever it changes
    localStorage.setItem(`buttonState_${id}`, JSON.stringify(!buttonClicked));
    setButtonClicked(true);
  };
  return (
    <div className={mapModifiers("m-card", buttonClicked && "disabled")}>
      <div className="m-card__img">
        <Link href={`product/${id}`}>
          <Image src={src} alt={alt} width={250} height={250} />
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
        <Button
          type="primary"
          onClick={() => handleClick(id)}
          isDisabled={buttonClicked}
        >
          {!buttonClicked ? "Add To Cart" : "Added to cart"}
        </Button>
      </div>
    </div>
  );
};
