// ─────────────────────────────────────────────────────────────────────────────
//  Product Card Component
// ─────────────────────────────────────────────────────────────────────────────

function StarRating({ rating }) {
  return (
    <div className="stars" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? "star filled" : "star"}>
          ★
        </span>
      ))}
      <span className="rating-num">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ProductCard({ product, onViewDetails, onWishlist, isWishlisted }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <article className="product-card" aria-label={product.name}>
      {/* Image */}
      <div className="card-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="card-img"
          loading="lazy"
        />
        {product.badge && (
          <span
            className="card-badge"
            style={{ background: product.badgeColor || "#2563EB" }}
          >
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="card-discount">-{discount}%</span>
        )}
        {/* Wishlist */}
        <button
          className={`wishlist-btn${isWishlisted ? " active" : ""}`}
          onClick={() => onWishlist(product)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Body */}
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h3 className="card-name">{product.name}</h3>
        <StarRating rating={product.rating} />
        <span className="card-reviews">({product.reviews.toLocaleString()} reviews)</span>
        <p className="card-desc">{product.description.slice(0, 80)}…</p>

        {/* Price row */}
        <div className="card-price-row">
          <span className="card-price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="card-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
          <span className={`stock-badge ${product.inStock ? "in-stock" : "out-stock"}`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Actions */}
        <button
          className="btn-view"
          onClick={() => onViewDetails(product)}
          aria-label={`View details for ${product.name}`}
        >
          View Details →
        </button>
      </div>
    </article>
  );
}
