// ─────────────────────────────────────────────────────────────────────────────
//  Products Section (Search + Filter + Grid)
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useMemo } from "react";
import { products, categories } from "../data/products";
import ProductCard from "./ProductCard";

const SORT_OPTIONS = [
  { value: "default",      label: "Default" },
  { value: "price-asc",    label: "Price: Low → High" },
  { value: "price-desc",   label: "Price: High → Low" },
  { value: "rating",       label: "Highest Rated" },
  { value: "name",         label: "Name A–Z" },
];

const PAGE_SIZE = 9;

export default function ProductsSection({
  search,
  activeCategory,
  onCategoryChange,
  onViewDetails,
  onWishlist,
  wishlist,
}) {
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

  // Reset page on filter changes
  const filtered = useMemo(() => {
    let list = [...products];

    // Category filter
    if (activeCategory && activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sort === "price-asc")  list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating")     list.sort((a, b) => b.rating - a.rating);
    if (sort === "name")       list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [activeCategory, search, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleCategory = (id) => {
    onCategoryChange(id);
    setPage(1);
  };

  return (
    <section id="products" className="products-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Our Catalogue</span>
          <h2 className="section-title">All Products</h2>
          <p className="section-subtitle">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* ── Filters bar ── */}
        <div className="filters-bar">
          {/* Category tabs */}
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

          {/* Sort dropdown */}
          <div className="sort-wrap">
            <label htmlFor="sort-select">Sort by</label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Grid ── */}
        {paged.length > 0 ? (
          <>
            <div className="products-grid">
              {paged.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onViewDetails={onViewDetails}
                  onWishlist={onWishlist}
                  isWishlisted={wishlist.some((w) => w.id === p.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    className={`page-btn${page === n ? " active" : ""}`}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                ))}
                <button
                  className="page-btn"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <span>🔍</span>
            <h3>No products found</h3>
            <p>Try a different search term or category.</p>
            <button className="btn-primary" onClick={() => handleCategory("all")}>
              Show All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
