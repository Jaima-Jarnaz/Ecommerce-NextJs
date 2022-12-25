import { Card, CardProps } from "../../molecules/card";
import camera from "../../../public/camera.jpg";

export interface CardsProps {
  productData: CardProps[];
}
const Cards: React.FC<CardsProps> = ({ productData }) => {
  return (
    <section className="o-cards">
      {productData &&
        productData.map((item, index: number) => {
          return (
            <Card
              src={item.imageUrl ? item.imageUrl.url : camera}
              title={item.title}
              description={item.description}
              key={index}
              alt={item.alt ? item.alt : "Product image"}
              price={item.price}
            />
          );
        })}
    </section>
  );
};

export default Cards;
