import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css/LoginSingup.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      // .post("http://localhost:5001/api/auth/login", { email, password })
      .post(`${import.meta.env.REACT_APP_BACKEND_BASEURL}/api/auth/login` , {email,password})
      .then((result) => {
        const user = result.data.user;
        console.log(result.data);
        if (user && user._id) {
          localStorage.setItem("userId", user._id);
          navigate("/dashboard");
        } else {
          alert("Login failed.");
        }
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
        alert("Login failed! Please try again.");
      });
  };

  return (
    <div className="container">
      <h2>Login to Smart Study Planner</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
