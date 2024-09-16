import React, { useState, useEffect } from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight - 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <footer className={`footer ${isVisible ? 'visible' : ''}`}>
      <div className="footer-content">
        <div className="footer-links">
          <a href="/#privacy">Privacy Policy</a>
          <a href="/#terms">Terms of Service</a>
        </div>
        <p className="footer-credit">© 2024 Phearion Games • Mythical Bot</p>
        <a href="https://www.youtube.com/@PhearionMusic" target="_blank" rel="noopener noreferrer" className="footer-social">
          Phearion Music
        </a>
        <a href="https://faultbox.itch.io" target="_blank" rel="noopener noreferrer" className="footer-social">
          Housing by Faultbox
        </a>
        <p className="footer-credit">Our graphist: <a href="https://maya-design.cloud" target="_blank" rel="noopener noreferrer">maya-design.eu</a></p>
      </div>
    </footer>
  );
};

export default Footer;