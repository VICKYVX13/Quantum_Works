// ─────────────────────────────────────────────────────────────────────────────
//  NovaTech Product Catalogue — Root App with React Router
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar         from "./components/Navbar";
import Footer         from "./components/Footer";
import Contact        from "./components/Contact";
import WishlistDrawer from "./components/WishlistDrawer";

// Pages
import HomePage          from "./pages/HomePage";
import ProductsPage      from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import DealsPage         from "./pages/DealsPage";
import CategoriesPage    from "./pages/CategoriesPage";
import AboutPage         from "./pages/AboutPage";
import ContactPage       from "./pages/ContactPage";

import "./App.css";

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);
  return null;
}

// Load wishlist from localStorage (persisted)
const getStoredWishlist = () => {
  try {
    return JSON.parse(localStorage.getItem("nt_wishlist")) || [];
  } catch {
    return [];
  }
};

function AppInner() {
  const [search,       setSearch]       = useState("");
  const [wishlist,     setWishlist]     = useState(getStoredWishlist);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const location = useLocation();

  // Persist wishlist to localStorage on every change
  useEffect(() => {
    localStorage.setItem("nt_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Toggle a product in/out of wishlist
  const handleWishlist = (product) => {
    setWishlist((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const sharedProps = { onWishlist: handleWishlist, wishlist };

  return (
    <>
      <ScrollToTop />

      {/* ── Navigation ─────────────────────────────── */}
      <Navbar onSearch={setSearch} />

      {/* Floating Wishlist toggle */}
      <button
        className="wishlist-fab"
        onClick={() => setWishlistOpen(true)}
        aria-label="Open wishlist"
      >
        ❤️
        {wishlist.length > 0 && (
          <span className="fab-badge">{wishlist.length}</span>
        )}
      </button>

      {/* ── Routes ─────────────────────────────────── */}
      <Routes>
        <Route path="/"            element={<HomePage      {...sharedProps} search={search} />} />
        <Route path="/products"    element={<ProductsPage  {...sharedProps} search={search} />} />
        <Route path="/products/:id" element={<ProductDetailPage {...sharedProps} />} />
        <Route path="/deals"       element={<DealsPage     {...sharedProps} />} />
        <Route path="/categories"  element={<CategoriesPage />} />
        <Route path="/about"       element={<AboutPage />} />
        <Route path="/contact"     element={<ContactPage />} />

        {/* 404 fallback */}
        <Route path="*" element={
          <main className="page-main">
            <div className="container" style={{ textAlign: "center", padding: "8rem 1.5rem" }}>
              <span style={{ fontSize: "5rem" }}>🔌</span>
              <h1 style={{ marginTop: "1rem", fontSize: "2.5rem" }}>404 — Page Not Found</h1>
              <p style={{ color: "var(--gray)", margin: "1rem 0 2rem" }}>
                Looks like this page is disconnected.
              </p>
              <a href="/" className="btn-primary">Go Home</a>
            </div>
          </main>
        } />
      </Routes>

      <Footer />

      {/* ── Wishlist Drawer ─────────────────────────── */}
      {wishlistOpen && (
        <WishlistDrawer
          wishlist={wishlist}
          onClose={() => setWishlistOpen(false)}
          onRemove={handleWishlist}
          onViewDetails={(p) => {
            setWishlistOpen(false);
            // navigation handled inside WishlistDrawer via Link
          }}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
