import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
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

          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />

            <button className="submit-btn">Login</button>
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