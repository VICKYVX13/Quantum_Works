// ─────────────────────────────────────────────────────────────────────────────
//  Hero Section Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="hero">
      {/* Animated blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">✨ Next-Gen Electronics</div>
          <h1 className="hero-title">
            Technology That
            <br />
            <span className="gradient-text">Elevates Your Life</span>
          </h1>
          <p className="hero-subtitle">
            Discover NovaTech's curated collection of premium laptops, smartphones,
            wearables, headphones and accessories — engineered for the future, built for today.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo("products")}>
              Explore Products
            </button>
            <button className="btn-outline" onClick={() => scrollTo("categories")}>
              Browse Categories
            </button>
          </div>
          <div className="hero-stats">
            {[
              { value: "200+", label: "Products" },
              { value: "50k+", label: "Happy Customers" },
              { value: "4.8★", label: "Avg Rating" },
            ].map((s) => (
              <div key={s.label} className="stat">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card-stack">
            <img
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700&q=85"
              alt="NovaTech ProBook Ultra"
              className="hero-img hero-img-main"
              loading="eager"
            />
            <div className="hero-float-card card-1">
              <span>⭐</span>
              <div>
                <strong>4.9 / 5</strong>
                <p>Customer Rating</p>
              </div>
            </div>
            <div className="hero-float-card card-2">
              <span>🚀</span>
              <div>
                <strong>Free Shipping</strong>
                <p>On all orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" onClick={() => scrollTo("about")}>
        <div className="scroll-dot" />
      </div>
    </section>
  );
}
