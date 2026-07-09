// ─────────────────────────────────────────────────────────────────────────────
//  About Section Component
// ─────────────────────────────────────────────────────────────────────────────
export default function About() {
  const pillars = [
    { icon: "🔬", title: "Innovation First",   desc: "Every product is designed with breakthrough technology at its core." },
    { icon: "🛡️", title: "Built to Last",      desc: "Premium materials and rigorous testing ensure lasting quality." },
    { icon: "🌍", title: "Sustainable Future", desc: "Eco-friendly packaging and carbon-offset logistics on all orders." },
    { icon: "🤝", title: "Customer First",     desc: "24/7 support, 30-day returns and a 2-year warranty on every product." },
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-grid">
          {/* Image side */}
          <div className="about-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=700&q=80"
              alt="NovaTech headquarters"
              className="about-img"
              loading="lazy"
            />
            <div className="about-badge">
              <span className="badge-icon">🏆</span>
              <div>
                <strong>Award Winning</strong>
                <p>CES Best Brand 2024</p>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="about-content">
            <span className="section-tag">About NovaTech</span>
            <h2 className="section-title">Pioneering the Future of Consumer Electronics</h2>
            <p className="about-desc">
              Founded in 2015, NovaTech is a global electronics brand trusted by over 50,000 customers
              in 45 countries. We combine cutting-edge engineering with thoughtful design to create
              technology that genuinely improves everyday life.
            </p>
            <div className="pillars-grid">
              {pillars.map((p) => (
                <div key={p.title} className="pillar-card">
                  <span className="pillar-icon">{p.icon}</span>
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
