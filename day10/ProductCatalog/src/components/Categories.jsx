// ─────────────────────────────────────────────────────────────────────────────
//  Category Cards Section — navigates to /products page with category filter
// ─────────────────────────────────────────────────────────────────────────────
import { useNavigate } from "react-router-dom";
import { categoryCards } from "../data/products";

export default function Categories({ onCategorySelect }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    if (onCategorySelect) onCategorySelect(id);
    navigate(`/products?category=${id}`);
  };

  return (
    <section id="categories" className="categories section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Browse by Category</span>
          <h2 className="section-title">What Are You Looking For?</h2>
          <p className="section-subtitle">
            Explore our full range of premium electronics — from powerful laptops to everyday accessories.
          </p>
        </div>

        <div className="cat-grid">
          {categoryCards.map((cat) => (
            <button
              key={cat.id}
              className="cat-card"
              style={{ background: cat.gradient }}
              onClick={() => handleClick(cat.id)}
              aria-label={`Browse ${cat.label}`}
            >
              <span className="cat-icon">{cat.icon}</span>
              <h3 className="cat-label">{cat.label}</h3>
              <p className="cat-desc">{cat.description}</p>
              <span className="cat-count">{cat.count} products →</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
