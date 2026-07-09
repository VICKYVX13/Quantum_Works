// ─────────────────────────────────────────────────────────────────────────────
//  Products Page — full searchable, filterable catalogue
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";

const SORT_OPTIONS = [
  { value: "default",    label: "Default" },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating",     label: "Highest Rated" },
  { value: "name",       label: "Name A–Z" },
];
const PAGE_SIZE = 12;

export default function ProductsPage({ search, onWishlist, wishlist }) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

  const handleViewDetails = (product) => navigate(`/products/${product.id}`);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== "all") list = list.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    if (sort === "price-asc")  list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating")     list.sort((a, b) => b.rating - a.rating);
    if (sort === "name")       list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [activeCategory, search, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleCategory = (id) => { setActiveCategory(id); setPage(1); };

  return (
    <main className="page-main">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <span>Products</span>
          </nav>
          <h1 className="page-hero-title">All Products</h1>
          <p className="page-hero-sub">Explore our full range of premium electronics</p>
        </div>
      </div>

      <div className="container" style={{ padding: "2.5rem 1.5rem" }}>
        {/* Filters bar */}
        <div className="filters-bar">
          <div className="cat-tabs" role="tablist">
            {categories.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeCategory === c.id}
                className={`cat-tab${activeCategory === c.id ? " active" : ""}`}
                onClick={() => handleCategory(c.id)}
              >
                <span>{c.icon}</span> {c.label}
              </button>
            ))}
          </div>
          <div className="sort-wrap">
            <label htmlFor="sort-select-page">Sort by</label>
            <select
              id="sort-select-page"
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <p style={{ marginBottom: "1.5rem", color: "var(--gray)", fontSize: "0.9rem" }}>
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Grid */}
        {paged.length > 0 ? (
          <>
            <div className="products-grid">
              {paged.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onViewDetails={handleViewDetails}
                  onWishlist={onWishlist}
                  isWishlisted={wishlist.some((w) => w.id === p.id)}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button className="page-btn" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>← Prev</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button key={n} className={`page-btn${page === n ? " active" : ""}`} onClick={() => setPage(n)}>{n}</button>
                ))}
                <button className="page-btn" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>Next →</button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <span>🔍</span>
            <h3>No products found</h3>
            <p>Try a different search term or category.</p>
            <button className="btn-primary" onClick={() => handleCategory("all")}>Show All Products</button>
          </div>
        )}
      </div>
    </main>
  );
}
