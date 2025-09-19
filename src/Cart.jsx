import { useState, useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  addToOrder,
} from "./store";
import "./Cart.css";
import { calculateTotal, getcoupandiscount } from "./discountuntils";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import QRCode from "react-qr-code";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [manualDiscount, setManualDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState({
    isValid: null,
    discountPercent: 0,
  });
  const [customerEmail, setCustomerEmail] = useState("");
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);
  const [paymentmethod, setPaymentmethod] = useState("");

  // ✅ Prefill email
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("loggedInUser"));
    if (saved?.email) setCustomerEmail(saved.email);
  }, []);

  // ===== Calculations =====
  const basePrice = useMemo(() => calculateTotal(cartItems), [cartItems]);
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const couponDiscountAmount = useMemo(
    () =>
      couponResult.isValid
        ? (basePrice * couponResult.discountPercent) / 100
        : 0,
    [couponResult, basePrice]
  );

  const afterCoupon = basePrice - couponDiscountAmount;
  const manualDiscountAmount = (afterCoupon * manualDiscount) / 100;
  const discountedPrice = afterCoupon - manualDiscountAmount;
  const taxAmount = discountedPrice * 0.18;
  const finalPrice = discountedPrice + taxAmount;

  // ===== Reset Discounts =====
  const resetDiscounts = useCallback(() => {
    setManualDiscount(0);
    setCouponCode("");
    setCouponResult({ isValid: null, discountPercent: 0 });
  }, []);

  // ===== Apply Coupon =====
  const handleApplyCoupon = useCallback(() => {
    const result = getcoupandiscount(couponCode, basePrice);
    setCouponResult(result);
    Swal.fire({
      icon: result.isValid ? "success" : "error",
      title: result.isValid
        ? `Coupon Applied! 🎉 ${result.discountPercent}% Off`
        : "Invalid Coupon ❌",
      text: result.isValid ? "" : "Please try again!",
      timer: result.isValid ? 2000 : undefined,
      showConfirmButton: !result.isValid,
    });
  }, [couponCode, basePrice]);

  // ===== Memoized order list HTML =====
  const orderListHTML = useMemo(
    () =>
      cartItems
        .map(
          (item) => `
        <tr>
          <td>${item.name}</td>
          <td align="center">${item.quantity}</td>
          <td align="right">₹${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`
        )
        .join(""),
    [cartItems]
  );

  // ===== SEND EMAIL =====
  const handleSendEmail = useCallback(() => {
    if (!customerEmail)
      return Swal.fire({
        icon: "warning",
        title: "Enter your email!",
        text: "We need your email to send the receipt.",
      });

    if (!cartItems.length)
      return Swal.fire({
        icon: "info",
        title: "Cart is Empty 🛒",
        text: "Please add items before sending email.",
      });

    emailjs
      .send(
        "service_440iqf6",
        "template_vv3ywhe",
        {
          order_id: Date.now(),
          email: customerEmail,
          order_list: orderListHTML,
          tax: taxAmount.toFixed(2),
          total: finalPrice.toFixed(2),
        },
        "ChDagKhpgA-0Ea52I"
      )
      .then(() =>
        Swal.fire({
          icon: "success",
          title: "📧 Order Confirmation Sent",
          text: `Receipt sent to ${customerEmail}`,
        })
      )
      .catch(() =>
        Swal.fire({
          icon: "warning",
          title: "⚠️ Mail Failed",
          text: "Please check your EmailJS setup.",
        })
      );
  }, [cartItems.length, finalPrice, taxAmount, customerEmail, orderListHTML]);

  // ===== PLACE ORDER =====
  const handlePlaceOrder = useCallback(() => {
    if (!cartItems.length)
      return Swal.fire({
        icon: "info",
        title: "Cart is Empty 🛒",
        text: "Please add items before placing order.",
      });

    const logged = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!logged) return navigate(`/login?redirect=${encodeURIComponent("/cart")}`);

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      finalPrice,
      time: new Date().toLocaleString(),
    };

    dispatch(addToOrder(newOrder));
    dispatch(clearCart());
    localStorage.setItem(
      "orders",
      JSON.stringify([...(JSON.parse(localStorage.getItem("orders")) || []), newOrder])
    );

    Swal.fire({
      icon: "success",
      title: "✅ Order Placed Successfully",
      text: "You can view this order in your Orders page.",
    });

    confetti();
    setShowPurchaseSuccess(true);
    setTimeout(() => setShowPurchaseSuccess(false), 3000);
  }, [cartItems, finalPrice, dispatch, navigate]);

  // ===== Quantity Handler (✅ Fixed) =====
  const handleQtyChange = (item, action) => {
    if (action === "inc") {
      dispatch(increaseQty(item.name));
      toast.info(`${item.name} quantity increased`);
    } else if (action === "dec") {
      if (item.quantity > 1) {
        dispatch(decreaseQty(item.name));
        toast.error(`${item.name} quantity decreased`);
      } else {
        toast.warn(`${item.name} is already at minimum. Use Remove button.`);
      }
    } else if (action === "remove") {
      dispatch(removeFromCart(item.name));
      toast.error(`${item.name} removed directly`);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="cart-container">
        <h2 className="text-center mb-4 fw-bold">🛒 Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart text-center">
            <h4>Your cart is empty</h4>
          </div>
        ) : (
          <div className="row g-4 align-items-start">
            {/* Left Side - Items */}
            <div className="col-12 col-lg-7 d-flex flex-column">
              {cartItems.map((item) => (
                <div key={item.name} className="cart-item-card shadow-sm mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={item.image || "https://via.placeholder.com/60"}
                      alt={item.name}
                      className="cart-item-img"
                    />
                    <div>
                      <h6 className="mb-1 fw-bold">{item.name}</h6>
                      <p className="mb-0 text-muted">
                        ₹{item.price} × {item.quantity} ={" "}
                        <span className="fw-bold">
                          ₹{item.price * item.quantity}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="d-flex gap-2 mt-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleQtyChange(item, "inc")}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleQtyChange(item, "dec")}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleQtyChange(item, "remove")}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Summary */}
            <div className="col-12 col-lg-5">
              <div className="cart-summary-card sticky-top">
                <h5 className="fw-bold text-center mb-3">🧾 Order Summary</h5>
                <hr />

                <div className="d-flex justify-content-between mb-2">
                  <span>Total Items</span>
                  <span className="fw-semibold">{totalItems}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span className="fw-semibold">₹{basePrice.toFixed(2)}</span>
                </div>

                {couponResult.isValid && (
                  <div className="d-flex justify-content-between text-primary mb-2">
                    <span>Coupon ({couponCode})</span>
                    <span>- ₹{couponDiscountAmount.toFixed(2)}</span>
                  </div>
                )}

                {manualDiscount > 0 && (
                  <div className="d-flex justify-content-between text-success mb-2">
                    <span>Manual Discount ({manualDiscount}%)</span>
                    <span>- ₹{manualDiscountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="d-flex justify-content-between mb-2">
                  <span>Tax (18%)</span>
                  <span>₹{taxAmount.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between border-top pt-3">
                  <span className="fw-bold fs-5">Final Amount</span>
                  <span className="fw-bold fs-5 text-success">
                    ₹{finalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Coupon Input */}
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="form-control mb-2"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleApplyCoupon}
                  >
                    Apply Coupon
                  </button>
                </div>

                {/* Manual Discount */}
                <div className="mt-3">
                  {[10, 20, 30].map((val) => (
                    <button
                      key={val}
                      className={`btn me-2 ${
                        manualDiscount === val
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => setManualDiscount(val)}
                    >
                      {val}% Off
                    </button>
                  ))}
                  <button
                    className="btn btn-outline-danger mt-2 w-100"
                    onClick={resetDiscounts}
                  >
                    Reset Discounts
                  </button>
                </div>

                {/* Email + Checkout */}
                <div className="mt-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="form-control mb-2"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />

                  <div className="d-flex gap-2">
                    {customerEmail && (
                      <button
                        className="btn btn-info w-50"
                        onClick={handleSendEmail}
                      >
                        📧 Send Email
                      </button>
                    )}
                    <button
                      className="btn btn-success w-50"
                      onClick={handlePlaceOrder}
                    >
                      🛒 Place Order
                    </button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="payment-method mt-3">
                  <h6>Select payment method:</h6>
                  <button
                    className="btn btn-outline-dark me-2"
                    onClick={() => setPaymentmethod("qr")}
                  >
                    QR Code
                  </button>
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => setPaymentmethod("card")}
                  >
                    Card
                  </button>

                  {paymentmethod === "qr" && (
                    <div className="qr-selection">
                      <h6>Scan to pay ₹{finalPrice.toFixed(2)}</h6>
                      <QRCode
                        value={`upi://pay?pa=9949237674-2@ybl&pn=Ratanstore&am=${finalPrice.toFixed(
                          2
                        )}&cu=INR`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showPurchaseSuccess && (
          <div className="success-modal">
            <div className="success-content">
              <div className="checkmark">
                <span>✔</span>
              </div>
              <h3>Purchase Successful 🎉</h3>
              <p>Total: ₹{finalPrice.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
