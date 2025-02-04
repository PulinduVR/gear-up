import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogin } from "../../context/LoginContext"; // Import LoginContext hook
import "./login.css";
import loginImage from "../../assets/login.png"; // Replace with your actual image path

const Login = () => {
  const navigate = useNavigate();
  const { login } = useLogin();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        login(data.user);
        alert("Login Successfull");
        navigate("/");
      } else {
        alert(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={loginImage} alt="Login" />
      </div>

      <div className="login-form">
        <h1>Welcome back, Nirmitha</h1>

        <button className="google-btn">
          <span className="google-icon">G</span> Continue with Google
        </button>

        <button className="email-btn">
          <span className="email-icon">✉</span> Continue with Email
        </button>

        <div className="divider">
          <span>or</span>
        </div>

        <form onSubmit={handleLogin}>
          <label>Email *</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>
            Password *{" "}
            <a href="#" className="forget-password">
              Forgot password?
            </a>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <p className="signup-link">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
