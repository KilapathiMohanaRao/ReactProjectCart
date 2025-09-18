import React, { useState } from "react";
import "./home.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Home() {
  // ======================== Special Offers ========================
  const [offers] = useState([
    {
      id: 1,
      name: "Fresh Mango Combo",
      img: "/image/mango-combo.jpg",
      discount: "25% OFF",
      endTime: new Date(Date.now() + 3600 * 1000),
    },
    {
      id: 2,
      name: "Juicy Fruit Basket",
      img: "/image/fruit-basket.jpg",
      discount: "30% OFF",
      endTime: new Date(Date.now() + 7200 * 1000),
    },
    {
      id: 3,
      name: "Healthy Juice Pack",
      img: "/image/juice-pack.jpg",
      discount: "20% OFF",
      endTime: new Date(Date.now() + 10800 * 1000),
    },
  ]);

  // ======================== Categories ========================
  const categories = [
    {
      title: "Vegetables",
      img: "/image/VEG.jpg",
      text: "Fresh organic vegetables from farms.",
      link: "/veg",
      btnClass: "btn btn-success",
    },
    {
      title: "Fruits",
      img: "/image/FRU.jpg",
      text: "Juicy and sweet fruits handpicked.",
      link: "/fruits",
      btnClass: "btn btn-warning",
    },
    {
      title: "Juices",
      img: "/image/JUICES.jpg",
      text: "Healthy fresh juices for refreshing mornings.",
      link: "/juices",
      btnClass: "btn btn-primary",
    },
    {
      title: "Non-Veg",
      img: "/image/chikenbiriyani.jpeg",
      text: "Fresh non-veg products delivered fast.",
      link: "/nonveg",
      btnClass: "btn btn-info text-white",
    },
  ];

  // ======================== Reviews ========================
  const reviews = [
    { name: "Alice Johnson", text: "Amazing fresh vegetables! Fast delivery.", rating: 5 },
    { name: "Rohit Sharma", text: "Juicy fruits, I order weekly.", rating: 4 },
    { name: "Neha Verma", text: "Healthy juices, perfect for mornings.", rating: 5 },
    { name: "Arjun Patel", text: "Non-veg products are fresh.", rating: 4 },
    { name: "Priya Singh", text: "Excellent service and top-quality produce.", rating: 5 },
  ];

  const heroSlides = [
    {
      img: "/image/VVBB.png",
      title: "Fresh Vegetables",
      text: "Organic & healthy veggies delivered daily",
      btnClass: "btn btn-success btn-lg mt-3",
      btnText: "Explore Vegetables",
    },
    {
      img: "/image/FRU-BACK.png",
      title: "Sweet & Juicy Fruits",
      text: "From farm to your basket, always fresh",
      btnClass: "btn btn-warning btn-lg mt-3",
      btnText: "Explore Fruits",
    },
    {
      img: "/image/JUIES-BB.png",
      title: "Refreshing Juices",
      text: "Healthy drinks for your family",
      btnClass: "btn btn-primary btn-lg mt-3",
      btnText: "Order Juices",
    },
  ];

  return (
    <div className="home-wrapper">
      {/* ======================== Hero Carousel ======================== */}
      <section className="hero-carousel">
        <div
          id="heroCarousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="2500"
        >
          <div className="carousel-indicators">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
              ></button>
            ))}
          </div>

          <div className="carousel-inner">
            {heroSlides.map((slide, i) => (
              <div
                key={i}
                className={`carousel-item ${i === 0 ? "active" : ""}`}
              >
                <img src={slide.img} className="d-block w-100" alt={slide.title} />
                <div className="overlay"></div>
                <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
                  <h1 className="fw-bold display-3 text-white">{slide.title}</h1>
                  <p className="lead text-white">{slide.text}</p>
                  <a href="#categories" className={slide.btnClass}>
                    {slide.btnText}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>

      {/* ======================== Categories ======================== */}
      <section id="categories" className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="fw-bold mb-4">Shop by Category</h2>
          <div className="row g-4 justify-content-center">
            {categories.map((category, i) => (
              <div className="col-md-3" key={i}>
                <div className="card h-100 shadow-sm border-0 rounded-3">
                  <img
                    src={category.img}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                    alt={category.title}
                  />
                  <div className="card-body d-flex flex-column text-center">
                    <h5 className="card-title">{category.title}</h5>
                    <p className="card-text flex-grow-1">{category.text}</p>
                    <a href={category.link} className={`${category.btnClass} mt-auto`}>
                      Shop {category.title}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== Reviews ======================== */}
      <section className="reviews-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">What Our Customers Say</h2>
          <div
            id="reviewsCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="3000"
          >
            <div className="carousel-inner">
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className={`carousel-item ${i === 0 ? "active" : ""}`}
                >
                  <div className="d-flex justify-content-center">
                    <div className="review-card p-4 shadow-sm rounded-4 text-center">
                      <p className="review-text mb-3">"{review.text}"</p>
                      <h5 className="reviewer-name mb-2">{review.name}</h5>
                      <div className="review-rating">
                        {"⭐".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reusable controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#reviewsCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#reviewsCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>
      </section>

      {/* ======================== Footer ======================== */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h2>FoodieApp</h2>
            <p>
              Explore fresh fruits, juices, and healthy recipes. Join our
              community!
            </p>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            {["Home", "Veg", "Non-Veg", "Fruits", "Juices"].map((link) => (
              <a key={link} href="#">
                {link}
              </a>
            ))}
          </div>
          <div className="footer-column">
            <h3>Contact Us</h3>
            <p>Email: info@foodieapp.com</p>
            <p>Phone: +91 12345 67890</p>
            <div className="footer-social">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} FoodieApp. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
