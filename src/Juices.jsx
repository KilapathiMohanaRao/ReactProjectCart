import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./juices.css"; // ✅ Add same responsive styles as veg.css

function Juices() {
  const juiceItems = useSelector((state) => state.products.Juices || []);
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
    ? juiceItems.filter((item) => {
        const range = priceRanges.find((r) => r.label === selectedFilter);
        return item.price >= range.min && item.price <= range.max;
      })
    : juiceItems;

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handleAdd = (item) => {
    const newQty = (quantities[item.id] || 0) + 1;
    setQuantities({ ...quantities, [item.id]: newQty });
    dispatch(addItem(item));
    toast.success(`${item.name} added to cart!`);
  };

  const handleRemove = (item) => {
    const newQty = (quantities[item.id] || 0) - 1;
    if (newQty <= 0) {
      const updated = { ...quantities };
      delete updated[item.id];
      setQuantities(updated);
    } else {
      setQuantities({ ...quantities, [item.id]: newQty });
    }
    toast.error(`Removed ${item.name}`);
  };

  return (
    <div className="veg-container"> {/* ✅ Same as veg */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Filters */}
      <div className="filter-section">
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
          <button className="clear-btn" onClick={() => setSelectedFilter("")}>
            Clear
          </button>
        )}
      </div>

      {/* Grid */}
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
                  <h3 className="veg-title">{item.name}</h3>
                  <p className="veg-desc">{item.description}</p>
                  <p className="veg-price">₹{item.price}</p>

                  {qty === 0 ? (
                    <button className="add-btn" onClick={() => handleAdd(item)}>
                      🛒 Add
                    </button>
                  ) : (
                    <div className="qty-control">
                      <button className="dec" onClick={() => handleRemove(item)}>
                        −
                      </button>
                      <span>{qty}</span>
                      <button className="inc" onClick={() => handleAdd(item)}>
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center w-100">No juices found for this price range.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            className="prev-btn"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            ◀
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="next-btn"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
}

export default Juices;
