import Text from "../../atoms/text";
import Image from "next/image";
import Button from "../../atoms/button";
import headphone from "../../../public/headphone.jpeg";

export interface CardProps {
  src: string;
}

const Card = () => {
  return (
    <div className="m-card">
      <Image
        src={headphone}
        className="m-card__image"
        alt="Picture of the author"
      />
      <div className="m-card__content">
        <h5 className="m-card__title">Card title</h5>
        <Text>Product quality is very good.</Text>
        <div className="m-card__button">
          <Button>Add to card</Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
