import React, { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./fruites.css";

function Fruits() {
  const fruitItems = useSelector((state) => state.products.Fruits);
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState({});
  const [selectedFilter, setSelectedFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const priceRanges = useMemo(
    () => [
      { label: "Below ₹50", min: 0, max: 50 },
      { label: "₹50 - ₹100", min: 50, max: 100 },
      { label: "₹100 - ₹200", min: 100, max: 200 },
      { label: "Above ₹200", min: 200, max: Infinity },
    ],
    []
  );

  // Get selected range only once
  const selectedRange = useMemo(
    () => priceRanges.find((r) => r.label === selectedFilter) || null,
    [selectedFilter, priceRanges]
  );

  // Filtered items
  const filteredItems = useMemo(() => {
    if (!selectedRange) return fruitItems;
    return fruitItems.filter(
      (item) => item.price >= selectedRange.min && item.price <= selectedRange.max
    );
  }, [fruitItems, selectedRange]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle filter change
  const handleFilterChange = useCallback((label) => {
    setSelectedFilter((prev) => (prev === label ? "" : label));
    setCurrentPage(1);
  }, []);

  // Add Item
  const handleAdd = useCallback(
    (item) => {
      setQuantities((prev) => ({
        ...prev,
        [item.id]: (prev[item.id] || 0) + 1,
      }));
      dispatch(addItem(item));
      toast.success(`✅ ${item.name} added to cart!`);
    },
    [dispatch]
  );

  // Remove Item
  const handleRemove = useCallback((item) => {
    setQuantities((prev) => {
      const newQty = (prev[item.id] || 0) - 1;
      const updated = { ...prev };
      if (newQty <= 0) delete updated[item.id];
      else updated[item.id] = newQty;
      return updated;
    });
    toast.error(`❌ ${item.name} quantity decreased`);
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Filter Section */}
      <div className="mb-4 text-center">
        <h5 className="mb-3">Filter by Price</h5>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {priceRanges.map((range) => (
            <div key={range.label} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id={range.label}
                checked={selectedFilter === range.label}
                onChange={() => handleFilterChange(range.label)}
              />
              <label className="form-check-label" htmlFor={range.label}>
                {range.label}
              </label>
            </div>
          ))}
          {selectedFilter && (
            <button
              className="btn btn-outline-danger btn-sm ms-3"
              onClick={() => setSelectedFilter("")}
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="fruit-grid">
        {currentItems.length > 0 ? (
          currentItems.map((item) => {
            const qty = quantities[item.id] || 0;
            return (
              <div className="fruit-card shadow-sm" key={item.id}>
                <img src={item.image} alt={item.name} className="card-img-top" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text text-muted">{item.description}</p>
                  <p className="card-text fw-bold">₹{item.price}</p>

                  {qty === 0 ? (
                    <button
                      type="button"
                      className="btn btn-success mt-auto w-100"
                      onClick={() => handleAdd(item)}
                    >
                      🛒 Add To Cart
                    </button>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleRemove(item)}
                      >
                        −
                      </button>
                      <span className="fw-bold">{qty}</span>
                      <button
                        className="btn btn-outline-success"
                        onClick={() => handleAdd(item)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-muted w-100">
            No fruits found for this price range.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container d-flex justify-content-center gap-2 my-3">
          <button
            className="nav-btn"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="nav-btn"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default Fruits;
