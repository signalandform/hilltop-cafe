"use client";

import { useEffect, useMemo, useState } from "react";
import type { GalleryItem } from "@/lib/cms/types";

export function HeroGallery({ items }: { items: GalleryItem[] }) {
  const slides = useMemo(() => items.filter((item) => item.isPublished), [items]);
  const [current, setCurrent] = useState(0);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = window.setInterval(() => {
      setCurrent((value) => (value + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  if (!slides.length) {
    return null;
  }

  function goTo(index: number) {
    setCurrent(((index % slides.length) + slides.length) % slides.length);
  }

  return (
    <div className="hero-gallery" aria-label="Product gallery">
      <div className="hero-gallery-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((item) => (
          <figure className="hero-gallery-slide" key={item.id}>
            <img src={item.imageUrl} alt={item.altText} loading={item.sortOrder === 1 ? "eager" : "lazy"} />
            <figcaption className="hero-gallery-caption">{item.caption}</figcaption>
          </figure>
        ))}
      </div>
      <button
        className="hero-gallery-arrow hero-gallery-prev"
        type="button"
        aria-label="Previous image"
        onClick={() => goTo(current - 1)}
      >
        &#8249;
      </button>
      <button
        className="hero-gallery-arrow hero-gallery-next"
        type="button"
        aria-label="Next image"
        onClick={() => goTo(current + 1)}
      >
        &#8250;
      </button>
      <div className="hero-gallery-dots">
        {slides.map((item, index) => (
          <button
            className={`hero-gallery-dot${index === current ? " active" : ""}`}
            type="button"
            aria-label={`Show image ${index + 1}`}
            key={item.id}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
      <div
        className="hero-gallery-number"
        aria-live="polite"
        onPointerDown={(event) => setStartX(event.clientX)}
        onPointerUp={(event) => {
          const diff = event.clientX - startX;
          if (Math.abs(diff) > 40) {
            goTo(current + (diff < 0 ? 1 : -1));
          }
        }}
      >
        {current + 1} / {slides.length}
      </div>
    </div>
  );
}
