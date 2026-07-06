// ─────────────────────────────────────────────────────────────────────────────
//  Product Modal (Detail Popup)
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect } from "react";

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

export default function ProductModal({ product, onClose, onWishlist, isWishlisted }) {
  // Close on Escape key
  useEffect(() => {
    const handle = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handle);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handle);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${product.name}`}
    >
      <div className="modal-card">
        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>

        <div className="modal-grid">
          {/* Left – image */}
          <div className="modal-img-col">
            <img src={product.image} alt={product.name} className="modal-img" />
            {product.badge && (
              <span className="card-badge modal-badge" style={{ background: product.badgeColor }}>
                {product.badge}
              </span>
            )}
          </div>

          {/* Right – details */}
          <div className="modal-info">
            <span className="card-category">{product.category}</span>
            <h2 className="modal-title">{product.name}</h2>
            <StarRating rating={product.rating} />
            <p className="modal-reviews">
              {product.reviews.toLocaleString()} verified reviews
            </p>

            <div className="modal-price-row">
              <span className="modal-price">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <>
                  <span className="card-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="modal-save">Save {discount}%</span>
                </>
              )}
            </div>

            <span className={`stock-badge ${product.inStock ? "in-stock" : "out-stock"}`}>
              {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
            </span>

            <p className="modal-desc">{product.description}</p>

            {/* Features */}
            <div className="modal-features">
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

            {/* CTA buttons */}
            <div className="modal-actions">
              <button
                className={`wishlist-btn-lg${isWishlisted ? " active" : ""}`}
                onClick={() => onWishlist(product)}
              >
                {isWishlisted ? "❤️ In Wishlist" : "🤍 Add to Wishlist"}
              </button>
              <button className="btn-primary modal-buy">
                {product.inStock ? "🛒 Add to Cart" : "Notify Me"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
