// ─────────────────────────────────────────────────────────────────────────────
//  Wishlist Drawer Component — uses router Link for product navigation
// ─────────────────────────────────────────────────────────────────────────────
import { Link } from "react-router-dom";

export default function WishlistDrawer({ wishlist, onClose, onRemove }) {
  return (
    <>
      {/* Backdrop */}
      <div className="drawer-backdrop" onClick={onClose} />

      <aside className="drawer" role="complementary" aria-label="Wishlist">
        <div className="drawer-header">
          <h3>❤️ My Wishlist ({wishlist.length})</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close wishlist">✕</button>
        </div>

        {wishlist.length === 0 ? (
          <div className="drawer-empty">
            <span>🤍</span>
            <p>Your wishlist is empty.</p>
          </div>
        ) : (
          <ul className="drawer-list">
            {wishlist.map((p) => (
              <li key={p.id} className="drawer-item">
                <img src={p.image} alt={p.name} className="drawer-thumb" loading="lazy" />
                <div className="drawer-item-info">
                  <span className="drawer-item-name">{p.name}</span>
                  <span className="drawer-item-price">₹{p.price.toLocaleString("en-IN")}</span>
                  <div className="drawer-item-actions">
                    {/* Navigate to product page and close drawer */}
                    <Link
                      to={`/products/${p.id}`}
                      className="btn-sm"
                      onClick={onClose}
                    >
                      View
                    </Link>
                    <button className="btn-sm danger" onClick={() => onRemove(p)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </>
  );
}
