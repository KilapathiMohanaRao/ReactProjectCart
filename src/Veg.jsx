import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./store"; // ✅ Ensure this import exists
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./veg.css";

function Veg() {
  const vegitems = useSelector((state) => state.products.Veg);
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState({});
  const [selectedFilter, setSelectedFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const priceRanges = [
    { label: "Below ₹50", min: 0, max: 50 },
    { label: "₹50 - ₹100", min: 50, max: 100 },
    { label: "₹100 - ₹200", min: 100, max: 200 },
    { label: "Above ₹200", min: 200, max: Infinity },
  ];

  const handleFilterChange = (label) => {
    setSelectedFilter((prev) => (prev === label ? "" : label));
    setCurrentPage(1);
  };

  const filteredItems = selectedFilter
    ? vegitems.filter((item) => {
        const range = priceRanges.find((r) => r.label === selectedFilter);
        return range && item.price >= range.min && item.price <= range.max;
      })
    : vegitems;

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const updateQuantity = (item, delta) => {
    const newQty = (quantities[item.id] || 0) + delta;
    setQuantities((prev) => {
      const updated = { ...prev };
      if (newQty <= 0) delete updated[item.id];
      else updated[item.id] = newQty;
      return updated;
    });
    if (delta > 0) dispatch(addItem(item));
  };

  const showToast = (type, message) => toast[type](message);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Filter Section */}
      <div className="mb-4 text-center">
        <h5 className="mb-3">Filter by Price</h5>
        <div className="filter-container">
          {priceRanges.map(({ label }) => (
            <label key={label} className="form-check-inline">
              <input
                type="checkbox"
                checked={selectedFilter === label}
                onChange={() => handleFilterChange(label)}
              />
              {label}
            </label>
          ))}
          {selectedFilter && (
            <button
              className="btn btn-outline-danger btn-sm clear-btn"
              onClick={() => setSelectedFilter("")}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="veg-grid">
        {currentItems.length > 0 ? (
          currentItems.map((item) => {
            const qty = quantities[item.id] || 0;
            return (
              <div className="veg-card shadow-sm" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="card-body">
                  <h5 className="veg-title">{item.name}</h5>
                  <p className="veg-desc">{item.description}</p>
                  <p className="veg-price">₹{item.price}</p>

                  {qty === 0 ? (
                    <button
                      className="btn btn-success add-btn"
                      onClick={() => {
                        updateQuantity(item, 1);
                        showToast("success", `Added ${item.name} to cart!`);
                      }}
                    >
                      🛒 Add To Cart
                    </button>
                  ) : (
                    <div className="qty-control">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                          updateQuantity(item, -1);
                          showToast("error", `Removed one ${item.name}`);
                        }}
                      >
                        −
                      </button>
                      <span className="fw-bold">{qty}</span>
                      <button
                        className="btn btn-outline-success"
                        onClick={() => {
                          updateQuantity(item, 1);
                          showToast("info", `Added one more ${item.name}`);
                        }}
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
          <p className="text-center text-muted w-100">No products found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
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

export default Veg;
