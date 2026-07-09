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
              className={`cat-card cat-card-${cat.id}`}
              onClick={() => handleClick(cat.id)}
              aria-label={`Browse ${cat.label}`}
            >
              {/* Top gradient accent line */}
              <div className="cat-accent-bar" style={{ background: cat.gradient }}></div>
              
              <div className="cat-card-inner">
                <div className="cat-icon-wrapper" style={{ background: cat.gradient }}>
                  <span className="cat-icon">{cat.icon}</span>
                </div>
                
                <div className="cat-info-wrap">
                  <h3 className="cat-label">{cat.label}</h3>
                  <p className="cat-desc">{cat.description}</p>
                </div>

                <div className="cat-footer">
                  <span className="cat-count">{cat.count} products</span>
                  <span className="cat-arrow-btn" style={{ color: cat.gradient.includes("#2563EB") ? "#2563EB" : cat.gradient.match(/#[0-9a-fA-F]{6}/)?.[0] }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
