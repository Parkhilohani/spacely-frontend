import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css/LoginSingup.css";

export default function Signup() {
  const navigate = useNavigate();

  // States to store user input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      // .post("http://localhost:5001/api/auth/signup", { name, email, password })
      .post(`${import.meta.env.REACT_APP_BACKEND_BASEURL}/api/auth/signup` , {email,password})
      .then((result) => {
        const student = result.data.student;
        if(student && student._id){
          localStorage.setItem('userId', student._id);
          navigate("/dashboard");
        }else{
          alert("Signup Failed.");
        }
      })
      .catch((err) => {
        console.log(err);
         console.log(err.response?.data || err.message);
        alert("Signup failed! Please try again.");
      });
  };

  return (
    <div className="container">
      <h2>Signup to Smart Study Planner</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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

        <button type="submit">Sign up</button>
      </form>

      <p>
        Don't have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
