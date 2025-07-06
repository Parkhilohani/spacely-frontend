import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Setting from './components/Setting';
import NewNote from './components/NewNote';
import NoteView from './components/NoteView';

export default function AppRoutes({ darkMode, setDarkMode }) {
  const location = useLocation();
  const hideNavbar = ['/signup', '/login'].includes(location.pathname);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);


  return (
    <>
      {!hideNavbar && <Navbar toggleSidebar={toggleSidebar} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/settings" element={<Setting darkMode={darkMode} setDarkMode={setDarkMode} />} />   
        <Route path="/new-note" element={<NewNote darkMode={darkMode} setDarkMode={setDarkMode} />} />   
        <Route path="/note/:id" element={<NoteView darkMode={darkMode} setDarkMode={setDarkMode} />} />   
        {/* <Route path="/logout" element={<Logout />} /> */}
      </Routes>
    </>
  );
}
