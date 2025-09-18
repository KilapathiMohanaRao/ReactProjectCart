import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Veg from "./veg";
import Nonveg from "./Nonveg";
import Fruits from "./Fruites";
import Juices from "./Juices";
import Cart from "./Cart";
import Login from "./Login";
import Order from "./Order";
import About from "./About";
import Notfound from "./Notfound";

import { useSelector } from "react-redux";

import {
  Home as HomeIcon,
  Leaf,
  Drumstick,
  Apple,
  CupSoda,
  ShoppingCart,
  User,
  Package,
  Info,
} from "lucide-react";

function App() {
  const cartItems = useSelector((state) => state.cart);
  const cartcount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ Dynamically adjust header height for navbar & page content
  useEffect(() => {
    const header = document.querySelector(".top-header");
    if (header) {
      document.documentElement.style.setProperty(
        "--header-height",
        `${header.offsetHeight}px`
      );
    }
    // Recalculate on window resize (important for mobile view)
    const handleResize = () => {
      if (header) {
        document.documentElement.style.setProperty(
          "--header-height",
          `${header.offsetHeight}px`
        );
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      {/* ================= Top Header ================= */}
      <header className="top-header text-light bg-success shadow-sm">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2 mb-2 mb-md-0">
            <img
              src="/image/icon.png"
              alt="Logo"
              className="img-fluid"
              style={{ maxHeight: "40px" }}
            />
            <div>
              <h2 className="brand-title mb-0">Ratan Mart</h2>
              <p className="tagline mb-0 small">
                Your one-stop shop for fresh and organic food
              </p>
            </div>
          </div>

          {/* Search + Cart + Login */}
          <div className="d-flex align-items-center gap-3">
            <input
              type="text"
              className="form-control search-box"
              placeholder="Search products..."
              style={{ maxWidth: "250px" }}
            />
            <NavLink to="/cart" className="btn btn-cart position-relative">
              <ShoppingCart size={18} />
              Cart
              {cartcount > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                  {cartcount}
                </span>
              )}
            </NavLink>
            <NavLink to="/login" className="btn btn-login">
              <User size={18} />
              Login
            </NavLink>
          </div>
        </div>
      </header>

      {/* ================= Navbar ================= */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink to="/" end className="nav-link d-flex align-items-center gap-2">
                  <HomeIcon className="nav-icon home-icon" size={20} /> Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/veg" className="nav-link d-flex align-items-center gap-2">
                  <Leaf className="nav-icon veg-icon" size={20} /> Veg
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/nonveg" className="nav-link d-flex align-items-center gap-2">
                  <Drumstick className="nav-icon nonveg-icon" size={20} /> Non-Veg
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/fruits" className="nav-link d-flex align-items-center gap-2">
                  <Apple className="nav-icon fruits-icon" size={20} /> Fruits
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/juices" className="nav-link d-flex align-items-center gap-2">
                  <CupSoda className="nav-icon juices-icon" size={20} /> Juices
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/order" className="nav-link d-flex align-items-center gap-2">
                  <Package className="nav-icon order-icon" size={20} /> Orders
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link d-flex align-items-center gap-2">
                  <Info className="nav-icon about-icon" size={20} /> About Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ================= Routes ================= */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<Nonveg />} />
          <Route path="/fruits" element={<Fruits />} />
          <Route path="/juices" element={<Juices />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<Order />} />
          <Route path="/about" element={<About />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
