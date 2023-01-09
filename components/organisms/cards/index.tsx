import { Card } from "@/components/molecules/card";
import banner from "@/assets/banner-1.jpg";

export type CardDataTypes = {
  _id: string;
  name: string;
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
          const src = item.imageUrl ? item.imageUrl.url : banner;

          return (
            <Card
              src={src}
              title={item.name}
              description={item.description}
              key={index}
              alt={item.alt ? item.alt : "Product image"}
              price={item.price}
              id={item._id}
            />
          );
        })}
    </section>
  );
};

export default Cards;
