import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    // ✅ store token + user
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // ✅ redirect based on role
    if (data.user.role === "donor") {
      navigate("/donor-dashboard");
    } else {
      navigate("/find-food");
    }

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="auth-wrapper">

      {/* LEFT PANEL */}
      <div className="auth-left login-left">
        <div className="overlay">
          <h1>Welcome Back 👋</h1>
          <p>Login to continue helping others</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        <div className="auth-card">
          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>

          <p>
            New user? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;