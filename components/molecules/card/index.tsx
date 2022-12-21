import Text from "../../atoms/text";
import Image from "next/image";
import Button from "../../atoms/button";

export type CardProps = {
  src: string;
  title: string;
  description: string;
};

export const Card: React.FC<CardProps> = ({ src, title, description }) => {
  return (
    <div className="m-card">
      <Image src={src} alt="Picture of the author" width={250} height={250} />
      <div className="m-card__content">
        <h5 className="m-card__title">{title}</h5>
        <Text>{description}</Text>
        <div className="m-card__button">
          <Button>Add To Card</Button>
        </div>
      </div>
    </div>
  );
};
