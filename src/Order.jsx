import React from "react";
import { useSelector } from "react-redux";
import "./Order.css";

function Order() {
  const orders = useSelector((state) => state.order);

  return (
    <>
      <h2 className="orders-main-header">📦 My Orders</h2>

      <div className="order-container">
        {orders.length > 0 ? (
          orders.map((order, idx) => (
            <div key={idx} className="order-card">
              {/* Order Header */}
              <div className="order-header-block">
                <h3 className="order-number">Order #{idx + 1}</h3>
                <p className="order-time">🕒 Placed on {order.time}</p>
              </div>

              {/* Items Row */}
              <div className="order-items-wrapper">
                {order.items.map((item, i) => (
                  <div key={i} className="order-item-block">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="order-item-img"
                    />
                    <p className="order-item-name">{item.name}</p>
                    <p className="order-item-qty">Quantity: {item.quantity}</p>
                    <p className="order-item-price">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Final Price (center bottom) */}
              <div className="order-total">
                <span>Total:</span>
                <span className="order-total-price">
                  ₹{order.finalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-cart">No orders placed yet 🛒</p>
        )}
      </div>
    </>
  );
}

export default Order;
