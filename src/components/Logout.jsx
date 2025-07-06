import React, { useState } from "react";
import axios from "axios";

export default function Logout() {
  const [error, setError] = useState(null);

  const handleConfirmLogout = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      await axios.delete(`http://localhost:5001/api/auth/delete/${userId}`);
      localStorage.clear();
      window.location.href = "/"; // full page redirect to login/home
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Logout failed. Please try again.");
    }
  };

  return (
    <div className="logout-container">
      <h2>Are you sure you want to logout and delete your account?</h2>
      <button 
       className="logout-button"
       onClick={() => {
        const confirmed = window.confirm("Do you really want to logout and delete your account?");
        if (confirmed) {
          handleConfirmLogout();
        }
      }}
      >Logout
      </button>
      {error && <p className="logout-error">{error}</p>}
    </div>
  );
}
