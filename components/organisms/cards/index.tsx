import { Card } from "@/components/molecules/card";

export type CardDataTypes = {
  _id: string;
  title: string;
  description: string;
  alt: string;
  src: string;
  price: number;
  imageUrl: { id: string; url: string };
};

export interface CardsProps {
  productData: CardDataTypes[];
}
const Cards: React.FC<CardsProps> = ({ productData }) => {
  return (
    <section className="o-cards">
      {productData &&
        productData.map((item, index: number) => {
          const src = item.imageUrl.url;
          return (
            <Card
              src={src}
              title={item.title}
              description={item.description}
              key={index}
              alt={item.alt ? item.alt : "Product image"}
              price={item.price}
              id={item._id}
              imageUrl={item.imageUrl}
            />
          );
        })}
    </section>
  );
};

export default Cards;
