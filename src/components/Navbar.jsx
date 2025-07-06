import React from 'react';
import { useLocation } from 'react-router-dom';
import './styles.css/Navbar.css';
import logo from "../assets/logo.png";

export default function Navbar({ toggleSidebar }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="navbar">
      {!isHome && (
        <div className="nav-left">
          <div className="nav-mob-menu" onClick={toggleSidebar}>☰</div>
        </div>
      )}

      <div className="logo">
        <img src={logo} alt="Smart Study Logo" className="logo-img" />
      </div>
    </div>
  );
}
