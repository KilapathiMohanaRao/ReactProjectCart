import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./veg.css"; // ✅ Use same CSS as Veg

function Nonveg() {
  const nonVegitems = useSelector((state) => state.products.Nonveg);
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

  const handleAdd = (item) => {
    const newQty = (quantities[item.id] || 0) + 1;
    setQuantities({ ...quantities, [item.id]: newQty });
    dispatch(addItem(item));
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
  };

  const handleFilterChange = (label) => {
    setSelectedFilter((prev) => (prev === label ? "" : label));
    setCurrentPage(1);
  };

  const filteredItems =
    selectedFilter !== ""
      ? nonVegitems.filter((item) => {
          const range = priceRanges.find((r) => r.label === selectedFilter);
          return item.price >= range.min && item.price <= range.max;
        })
      : nonVegitems;

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="veg-container">
        {/* Filter Section */}
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
              Clear Filter
            </button>
          )}
        </div>

        {/* Products Grid */}
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
                    <p className="veg-desc">{item.description}</p>
                    <p className="veg-price">₹{item.price}</p>

                    {qty === 0 ? (
                      <button
                        className="add-btn"
                        onClick={() => {
                          handleAdd(item);
                          toast.success(`${item.name} added to cart!`);
                        }}
                      >
                        🛒 Add To Cart
                      </button>
                    ) : (
                      <div className="qty-control">
                        <button
                          className="dec"
                          onClick={() => {
                            handleRemove(item);
                            toast.warning(`${item.name} quantity decreased`);
                          }}
                        >
                          −
                        </button>
                        <span>{qty}</span>
                        <button
                          className="inc"
                          onClick={() => {
                            handleAdd(item);
                            toast.info(`${item.name} quantity increased`);
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
            <p className="text-center w-100">No products found.</p>
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

export default Nonveg;
