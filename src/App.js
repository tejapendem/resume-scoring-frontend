import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider>
      <div className="app">
        {isAuthenticated ? (
          <Dashboard onLogout={handleLogout} />
        ) : (
          <Login onLogin={() => setIsAuthenticated(true)} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;