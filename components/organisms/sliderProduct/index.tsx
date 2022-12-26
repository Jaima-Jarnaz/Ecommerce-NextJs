import { Card } from "@/components/molecules/card";
import { CardDataTypes } from "@/components/organisms/cards";
import Slider from "react-slick";

export interface SliderProductProps {
  product: CardDataTypes[];
}
const SliderProduct: React.FC<SliderProductProps> = ({ product }: any) => {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="o-slider">
      <Slider {...settings}>
        {product &&
          product.map((item: any, index: number) => {
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
              />
            );
          })}
      </Slider>
    </section>
  );
};

export default SliderProduct;
