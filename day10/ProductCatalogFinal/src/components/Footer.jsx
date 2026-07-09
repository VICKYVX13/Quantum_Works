// ─────────────────────────────────────────────────────────────────────────────
//  Footer Component — with React Router links
// ─────────────────────────────────────────────────────────────────────────────
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = {
    Company:  [
      { label: "About Us",  to: "/about" },
      { label: "Careers",   to: "/about" },
      { label: "Press",     to: "/about" },
      { label: "Blog",      to: "/" },
    ],
    Products: [
      { label: "Laptops",      to: "/products?category=laptops" },
      { label: "Smartphones",  to: "/products?category=smartphones" },
      { label: "Smartwatches", to: "/products?category=smartwatches" },
      { label: "Headphones",   to: "/products?category=headphones" },
      { label: "Accessories",  to: "/products?category=accessories" },
    ],
    Support: [
      { label: "Help Centre", to: "/contact" },
      { label: "Track Order", to: "/contact" },
      { label: "Returns",     to: "/contact" },
      { label: "Warranty",    to: "/about" },
      { label: "Contact Us",  to: "/contact" },
    ],
    Legal: [
      { label: "Privacy Policy",    to: "/" },
      { label: "Terms of Service",  to: "/" },
      { label: "Cookie Policy",     to: "/" },
    ],
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand col */}
          <div className="footer-brand">
            <Link to="/" className="nav-logo" style={{ marginBottom: "1rem", display: "inline-flex" }}>
              <span className="logo-icon">⚡</span>
              <span className="logo-text">Nova<strong>Tech</strong></span>
            </Link>
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
                <a key={s.label} href={s.href} className="footer-social" aria-label={s.label}>{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading} className="footer-col">
              <h4 className="footer-heading">{heading}</h4>
              <ul>
                {items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="footer-link">{item.label}</Link>
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
          <Link to="/" className="back-top" aria-label="Back to top">↑ Top</Link>
        </div>
      </div>
    </footer>
  );
}
