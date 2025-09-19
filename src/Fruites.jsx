import React, { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./veg.css"; // ✅ Use same CSS as Veg

function Fruits() {
  const fruitItems = useSelector((state) => state.products.Fruits);
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState({});
  const [selectedFilter, setSelectedFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const priceRanges = useMemo(() => [
    { label: "Below ₹50", min: 0, max: 50 },
    { label: "₹50 - ₹100", min: 50, max: 100 },
    { label: "₹100 - ₹200", min: 100, max: 200 },
    { label: "Above ₹200", min: 200, max: Infinity },
  ], []);

  const selectedRange = useMemo(() =>
    priceRanges.find((r) => r.label === selectedFilter) || null,
    [selectedFilter, priceRanges]
  );

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

  const handleFilterChange = useCallback((label) => {
    setSelectedFilter((prev) => (prev === label ? "" : label));
    setCurrentPage(1);
  }, []);

  const handleAdd = useCallback((item) => {
    setQuantities((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
    dispatch(addItem(item));
    toast.success(`✅ ${item.name} added to cart!`);
  }, [dispatch]);

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

      {/* ✅ Same container class as Veg */}
      <div className="veg-container">

        {/* Filter Section */}
        <div className="filter-section mb-4">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              className={`filter-btn ${selectedFilter === range.label ? "active" : ""}`}
              onClick={() => handleFilterChange(range.label)}
            >
              {range.label}
            </button>
          ))}
          {selectedFilter && (
            <button
              className="clear-btn"
              onClick={() => setSelectedFilter("")}
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* ✅ Same grid class as Veg */}
        <div className="veg-grid">
          {currentItems.length > 0 ? currentItems.map((item) => {
            const qty = quantities[item.id] || 0;
            return (
              <div className="veg-card" key={item.id}>
                <div className="card-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="veg-title">{item.name}</h5>
                  <p className="veg-desc">{item.description}</p>
                  <p className="veg-price">₹{item.price}</p>

                  {qty === 0 ? (
                    <button
                      className="add-btn mt-auto"
                      onClick={() => handleAdd(item)}
                    >
                      🛒 Add To Cart
                    </button>
                  ) : (
                    <div className="qty-control mt-auto">
                      <button className="dec" onClick={() => handleRemove(item)}>−</button>
                      <span>{qty}</span>
                      <button className="inc" onClick={() => handleAdd(item)}>+</button>
                    </div>
                  )}
                </div>
              </div>
            );
          }) : (
            <p className="text-center text-muted w-100">
              No fruits found for this price range.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-container">
            <button
              className="prev-btn"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ◀
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="next-btn"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              ▶
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Fruits;
