import React, { useState, useEffect } from "react";
import "./Login.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: "" });

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = new URLSearchParams(location.search).get("redirect") || "/";

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (savedUser) {
      setIsAuthenticated(true);
      setCurrentUser(savedUser);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = e.target;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) =>
        u.username === username.value.trim() &&
        u.password === password.value.trim()
    );

    if (!foundUser) {
      Swal.fire({
        icon: "error",
        title: "❌ Invalid username or password!",
      });
      return;
    }

    const loggedInUser = {
      username: foundUser.username,
      email: foundUser.email || "",
    };
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    setCurrentUser(loggedInUser);
    setIsAuthenticated(true);

    Swal.fire({
      icon: "success",
      title: `✅ Welcome, ${foundUser.username}!`,
      timer: 2000,
      showConfirmButton: false,
    });
    navigate(redirectTo, { replace: true });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = e.target;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    // ✅ Username validation: only letters & special characters allowed
    const usernameRegex = /^[A-Za-z!@#$%^&*()_+\-=,.?]+$/;
    if (!usernameRegex.test(usernameValue)) {
      Swal.fire({
        icon: "error",
        title: "❌ Invalid Username",
        text: "Only letters and special symbols are allowed. Numbers are not allowed.",
      });
      return;
    }

    // ✅ Password validation: min 6 chars, must contain upper, lower, number & special char
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(passwordValue)) {
      Swal.fire({
        icon: "error",
        title: "❌ Weak Password",
        html: `
          Password must be at least <b>6 characters</b> and include:<br>
          ✅ Uppercase Letter (A-Z)<br>
          ✅ Lowercase Letter (a-z)<br>
          ✅ Number (0-9)<br>
          ✅ Special Character (@$!%*?&)
        `,
      });
      return;
    }

    if (password.value !== confirmPassword.value) {
      Swal.fire({
        icon: "error",
        title: "❌ Passwords do not match!",
      });
      return;
    }

    if (users.some((u) => u.username === usernameValue)) {
      Swal.fire({
        icon: "warning",
        title: "⚠️ Username already exists!",
      });
      return;
    }

    users.push({
      username: usernameValue,
      email: email.value.trim(),
      password: passwordValue,
    });
    localStorage.setItem("users", JSON.stringify(users));

    Swal.fire({
      icon: "success",
      title: "✅ Registration successful!",
      text: "Please login now.",
    });
    setActiveTab("login");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsAuthenticated(false);
    setCurrentUser({ username: "" });

    Swal.fire({
      icon: "info",
      title: "👋 Logged out successfully!",
      timer: 2000,
      showConfirmButton: false,
    });
    navigate("/cart");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-left">
          {!isAuthenticated ? (
            <>
              <div className="tabs">
                {["login", "signup"].map((tab) => (
                  <button
                    key={tab}
                    className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === "login" ? "Login" : "Sign Up"}
                  </button>
                ))}
              </div>

              <div className="form-slider">
                {activeTab === "login" && (
                  <form className="form" onSubmit={handleLogin}>
                    <h3 className="form-title">Login</h3>
                    <div className="input-group">
                      <FaUser className="icon" />
                      <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                      />
                    </div>
                    <div className="input-group">
                      <FaLock className="icon" />
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <button className="btn login-btn" type="submit">
                      Login
                    </button>
                  </form>
                )}

                {activeTab === "signup" && (
                  <form className="form" onSubmit={handleSignup}>
                    <h3 className="form-title">Sign Up</h3>
                    <div className="input-group">
                      <FaUser className="icon" />
                      <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                      />
                    </div>
                    <div className="input-group">
                      <FaEnvelope className="icon" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="input-group">
                      <FaLock className="icon" />
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="input-group">
                      <FaLock className="icon" />
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                      />
                    </div>
                    <button className="btn signup-btn" type="submit">
                      Sign Up
                    </button>
                  </form>
                )}
              </div>
            </>
          ) : (
            <div className="welcome-box">
              <h3>👋 Welcome, {currentUser.username}!</h3>
              <button className="btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="auth-right">
          <h2>Welcome to Ratan-Store</h2>
          <img
            src="/image/LOCK-D.jpg"
            alt="Shopping Illustration"
            className="auth-image"
          />
          <p>Fast, Secure & Easy Shopping Experience</p>
        </div>
      </div>
    </div>
  );
}
