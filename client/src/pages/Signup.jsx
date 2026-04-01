import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("donor");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Signup successful!");
    navigate("/login");   // 🔥 THIS LINE

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="auth-wrapper">

      {/* LEFT PANEL */}
      <div className="auth-left">
        <div className="overlay">
          <h1>Welcome</h1>
          <p>Join us and make a difference 🌱</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        <div className="auth-card">
          <h2>Create Account</h2>

          {/* ROLE TOGGLE */}
          <div className="role-toggle">
            <button
              type="button"
              className={role === "donor" ? "active" : ""}
              onClick={() => setRole("donor")}
            >
              Donor
            </button>

            <button
              type="button"
              className={role === "acceptor" ? "active" : ""}
              onClick={() => setRole("acceptor")}
            >
              Acceptor
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />

            <button type="submit" className="submit-btn">
              Create Account
            </button>
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