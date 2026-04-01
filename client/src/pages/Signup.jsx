import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const [role, setRole] = useState("donor");

 return (
  <div className="auth-wrapper">

    {/* LEFT DESIGN PANEL */}
    <div className="auth-left">
      <div className="overlay">
        <h1>Welcome</h1>
        <p>Join us and make a difference 🌱</p>
      </div>
    </div>

    {/* RIGHT FORM PANEL */}
    <div className="auth-right">

      <div className="auth-card">
        <h2>Create Account</h2>

        {/* ROLE TOGGLE */}
        <div className="role-toggle">
          <button
            className={role === "donor" ? "active" : ""}
            onClick={() => setRole("donor")}
          >
            Donor
          </button>

          <button
            className={role === "acceptor" ? "active" : ""}
            onClick={() => setRole("acceptor")}
          >
            Acceptor
          </button>
        </div>

        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          {role === "donor" && (
            <>
              <input type="text" placeholder="Full Name" required />
              <input type="text" placeholder="Phone Number" required />
              <input type="text" placeholder="City" />
              <input type="text" placeholder="Address" />
            </>
          )}

          {role === "acceptor" && (
            <>
              <input type="text" placeholder="Organisation Name" required />
              <input type="text" placeholder="Type (NGO / Shelter)" />
              <input type="text" placeholder="Contact Person" required />
              <input type="text" placeholder="Phone Number" required />
              <input type="text" placeholder="Address" required />
              <input type="text" placeholder="City" required />
            </>
          )}

          <button className="submit-btn">Create Account</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

    </div>
  </div>
);
};

export default Signup;