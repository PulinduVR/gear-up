import React, { useState } from "react";
import "./signup.css";
import signupImage from "../../assets/signup.png";
import { useLogin } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useLogin();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      login({ username: formData.username, email: formData.email });
      localStorage.setItem("token", data.token);

      alert("Signup successful! You are now logged in.");
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Create your Account</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Name *</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your name"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Email *</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password *</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="terms">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              Agree to all the terms, Privacy Policy. <a href="#">Learn more</a>
            </label>
          </div>

          <button className="signup-btn" type="submit">
            Sign up
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>

      <div className="signup-image">
        <img src={signupImage} alt="GearUp Poster" />
      </div>
    </div>
  );
};

export default Signup;
