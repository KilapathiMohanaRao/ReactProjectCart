import React, { useState } from "react";
import "./about.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaLeaf,
  FaHeart,
  FaShieldAlt,
  FaLightbulb,
  FaAward,
  FaUsers,
} from "react-icons/fa";

function About() {
  const [selected, setSelected] = useState(null);

  const achievements = [
    {
      icon: <FaUsers />,
      number: "10K+",
      label: "Happy Customers",
      color: "bg-gradient-success",
      details:
        "Over 10,000 families trust OurFoodStore for their daily fresh needs. We have built a strong community with excellent service and satisfaction.",
    },
    {
      icon: <FaAward />,
      number: "15+",
      label: "Quality Awards",
      color: "bg-gradient-warning",
      details:
        "Our brand has been recognized with 15+ awards for quality assurance and excellence in customer service.",
    },
    {
      icon: "🍽️",
      number: "50+",
      label: "Partner Restaurants",
      color: "bg-gradient-info",
      details:
        "We proudly partner with over 50 top restaurants to bring you a variety of fresh, delicious food at your doorstep.",
    },
    {
      icon: "🌱",
      number: "100%",
      label: "Freshness Guarantee",
      color: "bg-gradient-primary",
      details:
        "Our promise: 100% fresh ingredients and hygienic handling. If it’s not fresh, we make it right — no questions asked!",
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero text-center text-white d-flex flex-column justify-content-center">
        <h1 className="display-4 fw-bold">About OurFoodStore</h1>
        <p className="lead">Freshness, Trust & Taste for Every Home</p>
      </section>

      {/* Our Story */}
      <div className="container my-5">
        <div className="our-story-card">
          <h2 className="section-heading">Our Story</h2>
          <p>
            Founded in 2020, <strong>OurFoodStore</strong> started with a simple
            belief: everyone deserves access to fresh, authentic, and affordable
            food. From a small local outlet, we’ve grown into a trusted platform
            serving thousands of families across India.
          </p>
        </div>
      </div>

      {/* Mission & Values */}
      <div className="container my-5 mission-values-section">
        <h2 className="text-center section-heading">Our Mission & Values</h2>
        <div className="row g-4">
          {[
            {
              icon: <FaLeaf />,
              title: "Quality Ingredients",
              desc: "We source only farm-fresh, premium ingredients for every recipe.",
            },
            {
              icon: <FaHeart />,
              title: "Customer First",
              desc: "Your satisfaction is our priority — we listen and deliver with care.",
            },
            {
              icon: <FaShieldAlt />,
              title: "100% Hygiene",
              desc: "Our kitchens follow strict hygiene protocols for your safety.",
            },
            {
              icon: <FaLightbulb />,
              title: "Constant Innovation",
              desc: "We keep reinventing menus & experiences to keep you excited.",
            },
          ].map((item, i) => (
            <div className="col-6 col-md-3" key={i}>
              <div className="mission-card text-center p-4">
                <div className="icon-wrapper">{item.icon}</div>
                <h5 className="mission-title">{item.title}</h5>
                <p className="mission-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="container my-5 achievements-section">
        <h2 className="text-center section-title">Our Achievements</h2>
        <div className="row g-4 text-center">
          {achievements.map((stat, i) => (
            <div className="col-6 col-md-3" key={i}>
              <div
                className={`achievement-card p-4 shadow-sm ${stat.color}`}
                onClick={() => setSelected(stat)}
              >
                <div className="icon-wrapper">{stat.icon}</div>
                <h3 className="achievement-number">{stat.number}</h3>
                <p className="achievement-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Achievement Details */}
      {selected && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content achievement-modal">
              <div className="modal-header">
                <h5 className="modal-title">{selected.label}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelected(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="icon-large">{selected.icon}</div>
                <p>{selected.details}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-dark rounded-pill px-4"
                  onClick={() => setSelected(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            onClick={() => setSelected(null)}
          ></div>
        </div>
      )}

      {/* Team Carousel */}
      <div className="container my-5">
        <h2 className="text-center mb-4 fw-bold section-heading">
          Meet Our Team
        </h2>

        <div
          id="teamCarousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="3000"
          data-bs-pause="false"
          data-bs-touch="true"
          data-bs-wrap="true"
        >
          <div className="carousel-inner">
            {[
              {
                name: "Chef Anita",
                role: "Head of Recipes",
                img: "public/image/chef.jpg",
                bg: "bg-gradient-primary",
              },
              {
                name: "Rajini",
                role: "Operations Manager",
                img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80",
                bg: "bg-gradient-success",
              },
              {
                name: "Priya",
                role: "Supply Chain",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80",
                bg: "bg-gradient-warning",
              },
              {
                name: "Hashina",
                role: "Marketing",
                img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80",
                bg: "bg-gradient-info",
              },
              {
                name: "Arjun",
                role: "Quality & Testing",
                img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=500&q=80",
                bg: "bg-gradient-danger",
              },
            ].map((member, i) => (
              <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={i}>
                <div className={`team-card text-center mx-auto p-4 ${member.bg}`}>
                  <img
                    src={member.img}
                    alt={member.name}
                    className="team-img rounded-circle mb-3 shadow"
                  />
                  <h4 className="fw-bold text-white">{member.name}</h4>
                  <p className="text-light">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#teamCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#teamCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>

      {/* Contact Section */}
      <section className="about-contact text-center text-white py-5">
        <h2 className="fw-bold">Let’s Connect</h2>
        <p className="mb-3">
          Want to collaborate or have questions? Reach out anytime.
        </p>
        <p className="fw-semibold">
          📧 RatanSir90@ourfoodstore.com | 📱 +91 98765 43210
        </p>
      </section>
    </div>
  );
}

export default About;
