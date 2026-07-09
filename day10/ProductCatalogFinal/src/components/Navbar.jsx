// ─────────────────────────────────────────────────────────────────────────────
//  Navbar Component — with React Router navigation
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ onSearch }) {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [searchVal,  setSearchVal]  = useState("");
  const navigate  = useNavigate();
  const location  = useLocation();
  const isHome    = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
    onSearch(e.target.value);
  };

  // Scroll to section only when on home; otherwise navigate home first
  const scrollTo = (id) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150);
    }
    setMenuOpen(false);
  };

  const pageLinks = [
    { label: "Home",       to: "/" },
    { label: "Products",   to: "/products" },
    { label: "Categories", to: "/categories" },
    { label: "Deals",      to: "/deals" },
    { label: "About",      to: "/about" },
    { label: "Contact",    to: "/contact" },
  ];

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo" aria-label="NovaTech Home">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">Nova<strong>Tech</strong></span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          {pageLinks.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) => `nav-link${isActive ? " nav-link-active" : ""}`}
                end={l.to === "/"}
              >
                {l.label}
              </NavLink>
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
          {pageLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `mobile-link${isActive ? " mobile-link-active" : ""}`}
              end={l.to === "/"}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </NavLink>
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
