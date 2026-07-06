// ─────────────────────────────────────────────────────────────────────────────
//  Product Detail Page — full product view with related products
// ─────────────────────────────────────────────────────────────────────────────
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

function StarRating({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? "star filled" : "star"}>★</span>
      ))}
      <span className="rating-num">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ProductDetailPage({ onWishlist, wishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <main className="page-main">
        <div className="container" style={{ textAlign: "center", padding: "6rem 1.5rem" }}>
          <span style={{ fontSize: "4rem" }}>😕</span>
          <h2 style={{ marginTop: "1rem" }}>Product Not Found</h2>
          <p style={{ color: "var(--gray)", marginBottom: "2rem" }}>The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn-primary">Browse All Products</Link>
        </div>
      </main>
    );
  }

  const isWishlisted = wishlist.some((p) => p.id === product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Related products: same category, exclude current
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <main className="page-main">
      {/* Breadcrumb */}
      <div className="page-hero" style={{ padding: "2rem 0" }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <Link to="/products">Products</Link>
            <span className="breadcrumb-sep">›</span>
            <span className="card-category" style={{ textTransform: "capitalize" }}>{product.category}</span>
            <span className="breadcrumb-sep">›</span>
            <span>{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container" style={{ padding: "2rem 1.5rem 4rem" }}>
        {/* Main detail card */}
        <div className="detail-card">
          {/* Image column */}
          <div className="detail-img-col">
            <div style={{ position: "relative" }}>
              <img src={product.image} alt={product.name} className="detail-img" />
              {product.badge && (
                <span className="card-badge" style={{ background: product.badgeColor }}>
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="card-discount">-{discount}%</span>
              )}
            </div>
          </div>

          {/* Info column */}
          <div className="detail-info">
            <span className="card-category">{product.category}</span>
            <h1 className="detail-title">{product.name}</h1>
            <StarRating rating={product.rating} />
            <p className="detail-reviews">{product.reviews.toLocaleString()} verified reviews</p>

            <div className="modal-price-row" style={{ margin: "1.5rem 0" }}>
              <span className="modal-price">₹{product.price.toLocaleString("en-IN")}</span>
              {product.originalPrice && (
                <>
                  <span className="card-original">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                  <span className="modal-save">Save {discount}%</span>
                </>
              )}
            </div>

            <span className={`stock-badge ${product.inStock ? "in-stock" : "out-stock"}`} style={{ display: "inline-block", marginBottom: "1.5rem" }}>
              {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
            </span>

            <p className="detail-desc">{product.description}</p>

            {/* Features */}
            <div className="modal-features" style={{ marginTop: "1.5rem" }}>
              <h4>Key Features</h4>
              <ul>
                {product.features.map((f) => (
                  <li key={f}><span>✓</span> {f}</li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            <div className="modal-specs">
              <h4>Specifications</h4>
              <table>
                <tbody>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <td className="spec-key">{key}</td>
                      <td className="spec-val">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CTA */}
            <div className="detail-actions">
              <button
                className={`wishlist-btn-lg${isWishlisted ? " active" : ""}`}
                onClick={() => onWishlist(product)}
              >
                {isWishlisted ? "❤️ In Wishlist" : "🤍 Add to Wishlist"}
              </button>
              <button className="btn-primary modal-buy">
                {product.inStock ? "🛒 Add to Cart" : "🔔 Notify Me"}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop: "4rem" }}>
            <div className="section-header" style={{ textAlign: "left", marginBottom: "1.5rem" }}>
              <span className="section-tag">You Might Also Like</span>
              <h2 className="section-title">Related Products</h2>
            </div>
            <div className="products-grid">
              {related.map((p) => (
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
        )}
      </div>
    </main>
  );
}
