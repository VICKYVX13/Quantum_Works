// ─────────────────────────────────────────────────────────────────────────────
//  Deals Page — products with discounts
// ─────────────────────────────────────────────────────────────────────────────
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function DealsPage({ onWishlist, wishlist }) {
  const navigate = useNavigate();
  const [sort, setSort] = useState("discount");

  const dealProducts = useMemo(() => {
    let list = products.filter((p) => p.originalPrice && p.originalPrice > p.price);
    if (sort === "discount") {
      list.sort((a, b) => {
        const da = ((a.originalPrice - a.price) / a.originalPrice) * 100;
        const db = ((b.originalPrice - b.price) / b.originalPrice) * 100;
        return db - da;
      });
    } else if (sort === "price-asc")  list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc")   list.sort((a, b) => b.price - a.price);
    else if (sort === "rating")       list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [sort]);

  const totalSavings = dealProducts.reduce((acc, p) => acc + (p.originalPrice - p.price), 0);

  return (
    <main className="page-main">
      {/* Hero */}
      <div className="deals-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <span>Deals</span>
          </nav>
          <div className="deals-hero-content">
            <div>
              <span className="section-tag">🔥 Limited Time</span>
              <h1 className="page-hero-title">Hot Deals & Offers</h1>
              <p className="page-hero-sub">Up to 40% off on premium electronics. Don't miss out!</p>
            </div>
            <div className="deals-stats">
              <div className="deal-stat">
                <span className="deal-stat-num">{dealProducts.length}</span>
                <span className="deal-stat-label">Active Deals</span>
              </div>
              <div className="deal-stat">
                <span className="deal-stat-num">₹{totalSavings.toLocaleString("en-IN")}</span>
                <span className="deal-stat-label">Total Savings</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "2.5rem 1.5rem" }}>
        {/* Sort bar */}
        <div className="filters-bar" style={{ justifyContent: "flex-end", marginBottom: "2rem" }}>
          <div className="sort-wrap">
            <label htmlFor="deals-sort">Sort by</label>
            <select id="deals-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="discount">Biggest Discount</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Countdown banner */}
        <div className="deals-banner">
          <span>⚡</span>
          <span>Flash Sale prices are valid while stocks last — grab yours before they're gone!</span>
        </div>

        {/* Grid */}
        <div className="products-grid" style={{ marginTop: "2rem" }}>
          {dealProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onViewDetails={(pr) => navigate(`/products/${pr.id}`)}
              onWishlist={onWishlist}
              isWishlisted={wishlist.some((w) => w.id === p.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
