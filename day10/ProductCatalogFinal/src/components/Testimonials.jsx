// ─────────────────────────────────────────────────────────────────────────────
//  Testimonials Section
// ─────────────────────────────────────────────────────────────────────────────
import { testimonials } from "../data/products";

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">What Customers Say</span>
          <h2 className="section-title">Trusted by 50,000+ Happy Customers</h2>
        </div>

        <div className="testi-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testi-card">
              <div className="testi-stars">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="star filled">★</span>
                ))}
              </div>
              <p className="testi-review">"{t.review}"</p>
              <div className="testi-author">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="testi-avatar"
                  loading="lazy"
                />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
