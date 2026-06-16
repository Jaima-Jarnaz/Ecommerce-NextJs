import Image from "next/image";
import { IMAGES } from "@settings/settings";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Categories = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length);
    }, 2500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const prev = () =>
    setCurrent((c) => (c - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setCurrent((c) => (c + 1) % IMAGES.length);

  const getVisible = () => {
    const result = [];
    for (let i = -1; i <= 1; i++) {
      const idx = (current + i + IMAGES.length) % IMAGES.length;
      result.push({ ...IMAGES[idx], idx, offset: i });
    }
    return result;
  };

  return (
    <div className="m-categories">
      <button
        type="button"
        className="m-categories__btn m-categories__btn--prev"
        onClick={prev}
        aria-label="Previous"
      >
        &#8249;
      </button>
      <div className="m-categories__track">
        {getVisible().map((item, i) => (
          <div
            key={i}
            className={`m-categories__slide${item.offset === 0 ? " m-categories__slide--active" : ""}`}
            style={{
              transform: `scale(${item.offset === 0 ? 1.1 : 0.85}) translateX(${item.offset * 30}px)`,
              zIndex: item.offset === 0 ? 2 : 1,
              opacity: item.offset === 0 ? 1 : 0.7,
            }}
          >
            <Link href="#">
              <Image
                src={item.img}
                className="m-categories__img"
                alt={item.title}
                width={220}
                height={220}
              />
            </Link>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="m-categories__btn m-categories__btn--next"
        onClick={next}
        aria-label="Next"
      >
        &#8250;
      </button>
    </div>
  );
};

export default Categories;
