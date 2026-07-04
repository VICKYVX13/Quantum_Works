// ─────────────────────────────────────────────────────────────────────────────
//  Footer Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Footer() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const year = new Date().getFullYear();

  const links = {
    Company:  ["About Us", "Careers", "Press", "Blog"],
    Products: ["Laptops", "Smartphones", "Smartwatches", "Headphones", "Accessories"],
    Support:  ["Help Centre", "Track Order", "Returns", "Warranty", "Contact Us"],
    Legal:    ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand col */}
          <div className="footer-brand">
            <div className="nav-logo" style={{ marginBottom: "1rem" }}>
              <span className="logo-icon">⚡</span>
              <span className="logo-text">Nova<strong>Tech</strong></span>
            </div>
            <p className="footer-tagline">
              Pioneering the future of consumer electronics. Premium products, trusted by 50,000+ customers worldwide.
            </p>
            <div className="footer-socials">
              {[
                { icon: "𝕏",  href: "#", label: "X / Twitter" },
                { icon: "in", href: "#", label: "LinkedIn" },
                { icon: "f",  href: "#", label: "Facebook" },
                { icon: "▶",  href: "#", label: "YouTube" },
                { icon: "📸", href: "#", label: "Instagram" },
              ].map((s) => (
                <a key={s.label} href={s.href} className="footer-social" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading} className="footer-col">
              <h4 className="footer-heading">{heading}</h4>
              <ul>
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="footer-link">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter strip */}
        <div className="footer-newsletter">
          <div>
            <h4>Stay in the loop 📬</h4>
            <p>Get the latest drops, deals and tech news delivered to your inbox.</p>
          </div>
          <form
            className="newsletter-form"
            onSubmit={(e) => { e.preventDefault(); e.target.reset(); alert("🎉 Subscribed! Thank you."); }}
          >
            <input type="email" placeholder="your@email.com" required aria-label="Newsletter email" />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {year} NovaTech Electronics. All rights reserved.</p>
          <button className="back-top" onClick={() => scrollTo("hero")} aria-label="Back to top">
            ↑ Top
          </button>
        </div>
      </div>
    </footer>
  );
}
