// ─────────────────────────────────────────────────────────────────────────────
//  Categories Page — visual category showcase
// ─────────────────────────────────────────────────────────────────────────────
import { Link, useNavigate } from "react-router-dom";
import { categoryCards, products } from "../data/products";

export default function CategoriesPage() {
  const navigate = useNavigate();

  return (
    <main className="page-main">
      {/* Hero */}
      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <span>Categories</span>
          </nav>
          <h1 className="page-hero-title">Shop by Category</h1>
          <p className="page-hero-sub">Find exactly what you need from our curated product lines</p>
        </div>
      </div>

      <div className="container" style={{ padding: "3rem 1.5rem 5rem" }}>
        <div className="cat-page-grid">
          {categoryCards.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            const topProducts = products.filter((p) => p.category === cat.id).slice(0, 3);

            return (
              <div
                key={cat.id}
                className="cat-page-card"
                onClick={() => navigate(`/products?category=${cat.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate(`/products?category=${cat.id}`)}
                aria-label={`Browse ${cat.label}`}
              >
                <div className="cat-page-header" style={{ background: cat.gradient }}>
                  <span className="cat-page-icon">{cat.icon}</span>
                  <div>
                    <h2 className="cat-page-name">{cat.label}</h2>
                    <p className="cat-page-count">{count} products</p>
                  </div>
                </div>

                <div className="cat-page-body">
                  <p className="cat-page-desc">{cat.description}</p>

                  {/* Preview images */}
                  <div className="cat-page-previews">
                    {topProducts.map((p) => (
                      <div key={p.id} className="cat-preview-item">
                        <img src={p.image} alt={p.name} loading="lazy" />
                        <span>₹{p.price.toLocaleString("en-IN")}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}
                    onClick={(e) => { e.stopPropagation(); navigate(`/products?category=${cat.id}`); }}
                  >
                    Browse {cat.label} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
