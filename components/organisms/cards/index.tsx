import { Card, CardProps } from "../../molecules/card";

export interface CardsProps {
  productData: CardProps[];
}
const Cards: React.FC<CardsProps> = ({ productData }) => {
  return (
    <section className="o-cards">
      {productData.map((item, index) => {
        return (
          <Card
            src={item.src}
            title={item.title}
            description={item.description}
            key={index}
          />
        );
      })}
    </section>
  );
};

export default Cards;
