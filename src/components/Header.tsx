import React from 'react';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="logo">MYTHICAL</h1>
      <nav className="nav">
        <a href="#home" className="nav-link">Home</a>
        <a href="#features" className="nav-link">Features</a>
        <a href="#about" className="nav-link">About</a>
      </nav>
    </header>
  );
};

export default Header;