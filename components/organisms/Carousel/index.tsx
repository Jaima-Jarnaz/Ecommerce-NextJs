import Image, { StaticImageData } from "next/image";
import banner2 from "@/assets/banner-2.jpg";
import banner3 from "@/assets/banner.png";
import { useEffect, useRef, useState } from "react";

const slides: StaticImageData[] = [banner2, banner3];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (idx: number) => {
    setCurrent((idx + slides.length) % slides.length);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => goTo(current + 1), 2500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current]);

  return (
    <div className="o-carousel">
      <div
        className="o-carousel__track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`slide-${i}`}
            className="o-carousel__image"
            priority={i === 0}
          />
        ))}
      </div>
      <button
        type="button"
        className="o-carousel__btn o-carousel__btn--prev"
        onClick={() => goTo(current - 1)}
        aria-label="Previous"
      >
        &#8249;
      </button>
      <button
        type="button"
        className="o-carousel__btn o-carousel__btn--next"
        onClick={() => goTo(current + 1)}
        aria-label="Next"
      >
        &#8250;
      </button>
      <div className="o-carousel__dots">
        {slides.map((_, i) => (
          <span
            key={i}
            role="button"
            tabIndex={0}
            className={`o-carousel__dot${i === current ? " o-carousel__dot--active" : ""}`}
            onClick={() => goTo(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") goTo(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
