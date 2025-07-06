import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes'; 
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  return (
    <div className='App'>
      <Router>
        <AppRoutes darkMode={darkMode} setDarkMode={setDarkMode} />
      </Router>
    </div>
  );
}

export default App;
