import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./store";
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
    <div className="veg-container">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Filter Section */}
      <div className="filter-section">
        {priceRanges.map(({ label }) => (
          <button
            key={label}
            className={`filter-btn ${selectedFilter === label ? "active" : ""}`}
            onClick={() => handleFilterChange(label)}
          >
            {label}
          </button>
        ))}
        {selectedFilter && (
          <button className="clear-btn" onClick={() => setSelectedFilter("")}>
            Clear
          </button>
        )}
      </div>

      {/* Product Grid */}
      <div className="veg-grid">
        {currentItems.length > 0 ? (
          currentItems.map((item) => {
            const qty = quantities[item.id] || 0;
            return (
              <div className="veg-card" key={item.id}>
                <div className="card-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="card-body">
                  <h5 className="veg-title">{item.name}</h5>
                  <p className="veg-desc">{item.description || "Fresh and healthy"}</p>
                  <p className="veg-price">₹{item.price}</p>

                  {qty === 0 ? (
                    <button
                      className="add-btn"
                      onClick={() => {
                        updateQuantity(item, 1);
                        showToast("success", `Added ${item.name} to cart!`);
                      }}
                    >
                      🛒 Add
                    </button>
                  ) : (
                    <div className="qty-control">
                      <button
                        className="dec"
                        onClick={() => {
                          updateQuantity(item, -1);
                          showToast("error", `Removed one ${item.name}`);
                        }}
                      >
                        −
                      </button>
                      <span>{qty}</span>
                      <button
                        className="inc"
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
          <p className="no-products">No products found.</p>
        )}
      </div>

      {/* Pagination */}
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

export default Veg;
