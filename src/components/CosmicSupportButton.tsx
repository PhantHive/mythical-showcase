import React from 'react';
import '../styles/CosmicSupportButton.css';

const CosmicSupportButton = () => (
  <a
    href="https://paypal.me/phearion?country.x=FR&locale.x=fr_FR"
    target="_blank"
    rel="noopener noreferrer"
    className="cosmic-support-button"
  >
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cosmic-icon">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <div className="button-text">
      <span className="main-text">Fuel the Magic</span>
      <span className="sub-text">Donate via PayPal</span>
    </div>
  </a>
);

export default CosmicSupportButton;