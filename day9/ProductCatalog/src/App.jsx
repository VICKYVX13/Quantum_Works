// ─────────────────────────────────────────────────────────────────────────────
//  NovaTech Product Catalogue — Root App
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";

import Navbar          from "./components/Navbar";
import Hero            from "./components/Hero";
import About           from "./components/About";
import Categories      from "./components/Categories";
import ProductsSection from "./components/ProductsSection";
import Featured        from "./components/Featured";
import Testimonials    from "./components/Testimonials";
import Contact         from "./components/Contact";
import Footer          from "./components/Footer";
import ProductModal    from "./components/ProductModal";
import WishlistDrawer  from "./components/WishlistDrawer";

import "./App.css";

// Load wishlist from localStorage (persisted)
const getStoredWishlist = () => {
  try {
    return JSON.parse(localStorage.getItem("nt_wishlist")) || [];
  } catch {
    return [];
  }
};

export default function App() {
  const [search,         setSearch]         = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [modalProduct,   setModalProduct]   = useState(null);
  const [wishlist,       setWishlist]       = useState(getStoredWishlist);
  const [wishlistOpen,   setWishlistOpen]   = useState(false);

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

  const openModal   = (product) => setModalProduct(product);
  const closeModal  = ()        => setModalProduct(null);

  return (
    <>
      {/* ── Navigation ───────────────────────────────── */}
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

      {/* ── Main content ─────────────────────────────── */}
      <main>
        <Hero />
        <About />
        <Categories onCategorySelect={setActiveCategory} />
        <ProductsSection
          search={search}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onViewDetails={openModal}
          onWishlist={handleWishlist}
          wishlist={wishlist}
        />
        <Featured onViewDetails={openModal} />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      {/* ── Modals / Drawers ─────────────────────────── */}
      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={closeModal}
          onWishlist={handleWishlist}
          isWishlisted={wishlist.some((p) => p.id === modalProduct.id)}
        />
      )}

      {wishlistOpen && (
        <WishlistDrawer
          wishlist={wishlist}
          onClose={() => setWishlistOpen(false)}
          onRemove={handleWishlist}
          onViewDetails={(p) => { openModal(p); setWishlistOpen(false); }}
        />
      )}
    </>
  );
}
