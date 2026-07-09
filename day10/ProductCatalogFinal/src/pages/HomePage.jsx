// ─────────────────────────────────────────────────────────────────────────────
//  Home Page — full single-page scroll experience
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";
import Hero            from "../components/Hero";
import About           from "../components/About";
import Categories      from "../components/Categories";
import ProductsSection from "../components/ProductsSection";
import Featured        from "../components/Featured";
import Testimonials    from "../components/Testimonials";
import { useNavigate } from "react-router-dom";

export default function HomePage({ search, onWishlist, wishlist }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  // Navigate to product detail page instead of opening modal
  const handleViewDetails = (product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <main>
      <Hero />
      <About />
      <Categories onCategorySelect={setActiveCategory} />
      <ProductsSection
        search={search}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onViewDetails={handleViewDetails}
        onWishlist={onWishlist}
        wishlist={wishlist}
      />
      <Featured onViewDetails={handleViewDetails} />
      <Testimonials />
    </main>
  );
}
