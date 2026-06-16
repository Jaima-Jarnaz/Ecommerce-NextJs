import Image from "next/image";
import { IMAGES_BRANDS } from "@settings/settings";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const Brands = () => {
  const [offset, setOffset] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const visibleCount = 4;
  const total = IMAGES_BRANDS.length;

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setOffset((prev) => (prev + 1) % total);
    }, 2500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total]);

  const prev = () => setOffset((o) => (o - 1 + total) % total);
  const next = () => setOffset((o) => (o + 1) % total);

  const getVisible = () => {
    const items = [];
    for (let i = 0; i < visibleCount; i++) {
      items.push(IMAGES_BRANDS[(offset + i) % total]);
    }
    return items;
  };

  return (
    <div className="m-brands">
      <button
        type="button"
        className="m-brands__btn m-brands__btn--prev"
        onClick={prev}
        aria-label="Previous"
      >
        &#8249;
      </button>
      <div className="m-brands__track">
        {getVisible().map((item, index) => (
          <div className="m-brands__slide" key={index}>
            <Link href="#">
              <Image
                src={item.img}
                className="m-brands__img"
                alt={item.alt}
                width={220}
                height={175}
              />
            </Link>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="m-brands__btn m-brands__btn--next"
        onClick={next}
        aria-label="Next"
      >
        &#8250;
      </button>

      <div className="m-brands__mobile-grid">
        {IMAGES_BRANDS.map((item, index) => (
          <div className="m-brands__slide" key={index}>
            <Link href="#">
              <Image
                src={item.img}
                className="m-brands__img"
                alt={item.alt}
                width={120}
                height={80}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
