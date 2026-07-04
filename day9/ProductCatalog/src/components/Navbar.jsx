// ─────────────────────────────────────────────────────────────────────────────
//  Navbar Component
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";

export default function Navbar({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
    onSearch(e.target.value);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: "Home",       id: "hero" },
    { label: "About",      id: "about" },
    { label: "Categories", id: "categories" },
    { label: "Products",   id: "products" },
    { label: "Featured",   id: "featured" },
    { label: "Contact",    id: "contact" },
  ];

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo" onClick={() => scrollTo("hero")}>
          <span className="logo-icon">⚡</span>
          <span className="logo-text">Nova<strong>Tech</strong></span>
        </div>

        {/* Desktop Links */}
        <ul className="nav-links">
          {navLinks.map((l) => (
            <li key={l.id}>
              <button className="nav-link" onClick={() => scrollTo(l.id)}>
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Search (desktop) */}
        <div className="nav-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products…"
            value={searchVal}
            onChange={handleSearch}
            aria-label="Search products"
          />
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map((l) => (
            <button key={l.id} className="mobile-link" onClick={() => scrollTo(l.id)}>
              {l.label}
            </button>
          ))}
          <div className="mobile-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search products…"
              value={searchVal}
              onChange={handleSearch}
            />
          </div>
        </div>
      )}
    </nav>
  );
}
