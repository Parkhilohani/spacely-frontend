import React,{useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaTasks, FaCalendarAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './styles.css/Sidebar.css';

const Sidebar = ({ onSelect, isOpen}) => {
  const menuRef = useRef();
  const navigate = useNavigate();

  const openMenu = () => {
    menuRef.current.style.right = '0';
  };

  const closeMenu = () => {
    menuRef.current.style.right = '-350px';
  };

  const handleLogout = () => {
    navigate("/logout"); 
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <h2 className="sidebar-title"></h2>
      <ul className="sidebar-list">
        <li onClick={() => onSelect("Dashboard")}><FaHome className="sidebar-icon" />Dashboard</li>
        <li onClick={() => onSelect("Add Task")}><FaPlus className="sidebar-icon" /> Add Task</li>
        <li onClick={() => onSelect("All Tasks")}><FaTasks className="sidebar-icon" />All Tasks</li>
        <li onClick={() => onSelect("Calendar")}><FaCalendarAlt className="sidebar-icon" />Calendar</li>
        <li onClick={() => onSelect("Settings")}><FaCog className="sidebar-icon" />Settings</li>
        <div className="sidebar-logout">
          <li onClick={() => onSelect("Logout")}><FaSignOutAlt className="sidebar-icon" />Logout</li>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
