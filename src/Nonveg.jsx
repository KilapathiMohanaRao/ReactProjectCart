import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./nonveg.css";

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
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

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

      {/* Products Grid - Strict 4 Columns */}
      <div className="container">
        <div className="nonveg-grid-4">
          {currentItems.length > 0 ? (
            currentItems.map((item) => {
              const qty = quantities[item.id] || 0;
              return (
                <div className="nonveg-card shadow-sm" key={item.id}>
                  <img src={item.image} className="nonveg-img" alt={item.name} />
                  <div className="nonveg-body">
                    <h5 className="nonveg-title">{item.name}</h5>
                    <p className="nonveg-desc">{item.description}</p>
                    <p className="nonveg-price fw-bold">Price: ₹{item.price}</p>

                    {qty === 0 ? (
                      <button
                        type="button"
                        className="btn btn-success mt-auto w-100"
                        onClick={() => {
                          handleAdd(item);
                          toast.success(
                            `Product ${item.name} added to cart successfully!`
                          );
                        }}
                      >
                        🛒 Add To Cart
                      </button>
                    ) : (
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => {
                            handleRemove(item);
                            toast.error(
                              `Product ${item.name} decreasing quantity`
                            );
                          }}
                        >
                          −
                        </button>
                        <span className="fw-bold">{qty}</span>
                        <button
                          className="btn btn-outline-success"
                          onClick={() => {
                            handleAdd(item);
                            toast.info(
                              `Product ${item.name} increasing quantity`
                            );
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
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="nav-btn"
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
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="nav-btn"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Nonveg;
