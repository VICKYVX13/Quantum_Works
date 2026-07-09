// ─────────────────────────────────────────────────────────────────────────────
//  Featured Products Carousel
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from "react";
import { products } from "../data/products";

const featured = products.filter((p) => p.featured);

export default function Featured({ onViewDetails }) {
  const [idx, setIdx] = useState(0);

  const next = useCallback(() => setIdx((i) => (i + 1) % featured.length), []);
  const prev = () => setIdx((i) => (i - 1 + featured.length) % featured.length);

  // Autoplay
  useEffect(() => {
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [next]);

  const p = featured[idx];

  return (
    <section id="featured" className="featured section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Staff Picks</span>
          <h2 className="section-title">Featured Products</h2>
        </div>

        <div className="carousel-wrapper">
          {/* Left arrow */}
          <button className="carousel-arrow left" onClick={prev} aria-label="Previous">‹</button>

          {/* Slide */}
          <div className="carousel-slide" key={p.id}>
            <div className="carousel-img-col">
              <img src={p.image} alt={p.name} className="carousel-img" loading="lazy" />
            </div>
            <div className="carousel-info">
              <span className="card-category">{p.category}</span>
              <h3 className="carousel-name">{p.name}</h3>
              <p className="carousel-desc">{p.description}</p>
              <div className="stars">
                {[1,2,3,4,5].map((s) => (
                  <span key={s} className={s <= Math.round(p.rating) ? "star filled" : "star"}>★</span>
                ))}
                <span className="rating-num">{p.rating} ({p.reviews.toLocaleString()} reviews)</span>
              </div>
              <div className="carousel-price-row">
                <span className="modal-price">₹{p.price.toLocaleString('en-IN')}</span>
                {p.originalPrice && (
                  <span className="card-original">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                )}
              </div>
              <div className="carousel-actions">
                <button className="btn-primary" onClick={() => onViewDetails(p)}>
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Right arrow */}
          <button className="carousel-arrow right" onClick={next} aria-label="Next">›</button>
        </div>

        {/* Dots */}
        <div className="carousel-dots">
          {featured.map((_, i) => (
            <button
              key={i}
              className={`dot${i === idx ? " active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
