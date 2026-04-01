import React from "react";
import "./LandingPage.css";
import foodImg from "./food-delivery.avif"; // make sure path is correct
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
      const navigate = useNavigate();
  return (
    <div className="landing">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">FoodBridge</h2>

        <div className="nav-buttons">
            <button onClick={() => navigate("/login")}>Login</button>
            <button className="signup" onClick={() => navigate("/signup")}>
                Sign Up
            </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="hero">

        {/* LEFT SIDE */}
        <div className="hero-text">
          <h1>
            Rescue Food <br />
            <span>Feed Lives</span>
          </h1>

          <p>
            Share excess food and help those in need. Reduce waste and build a
            better community.
          </p>

          <div className="hero-buttons">
            <button className="primary" onClick={() => navigate("/donate")}>Donate</button>
            <button 
              className="secondary"
              onClick={() => navigate("/find-food")}
            >
              Find Food
            </button>          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hero-image">
          <img src={foodImg} alt="food delivery" />
        </div>

      </div>

      

      {/* FEATURE CARDS */}
      <div className="cards">

        <div className="card">
          <h3>Quick Donation</h3>
          <p>Upload food in seconds</p>
        </div>

        <div className="card">
          <h3>Nearby Access</h3>
          <p>Find food near you</p>
        </div>

        <div className="card">
          <h3>Real-Time</h3>
          <p>Live availability updates</p>
        </div>

      </div>

    </div>
  );
};

export default LandingPage;