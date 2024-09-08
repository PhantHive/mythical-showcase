import React, { useState, useEffect } from 'react';
import '../styles/MagicalScroll.css';

const MagicalScroll: React.FC = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      const atBottom = scrollPosition > fullHeight - windowHeight - 100;
      setIsAtBottom(atBottom);

      // Log scroll position and atBottom status
      console.log('Scroll Position:', scrollPosition);
      console.log('Is at Bottom:', atBottom);

      // Change the "d" attribute of the path element
      const portalArrow = document.querySelector('.portal-arrow');
      if (portalArrow) {
        portalArrow.setAttribute('d', atBottom ? 'M50 40 L60 60 L40 60 Z' : 'M50 60 L60 40 L40 40 Z');
      }

      // Calculate opacity based on proximity to bottom
      if (scrollPosition > fullHeight - windowHeight - 300) {
        const newOpacity = 1 - (scrollPosition - (fullHeight - windowHeight - 300)) / 300;
        setOpacity(Math.max(0.3, newOpacity)); // Minimum opacity of 0.3
      } else {
        setOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTopOrBottom = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`magical-scroll ${isAtBottom ? 'at-bottom' : ''}`}
      onClick={scrollToTopOrBottom}
      style={{ opacity }}
    >
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="portalGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#8a2be2" />
            <stop offset="100%" stopColor="#4a0e78" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g className="portal">
          <circle cx="50" cy="50" r="45" fill="url(#portalGradient)" filter="url(#glow)" />
          <path className="portal-swirl" d="M50 5 C 55 25, 75 25, 95 50 S 75 75, 50 95 S 25 75, 5 50 S 25 25, 50 5" fill="none" stroke="#bf55ec" strokeWidth="2" />
          <path className="portal-swirl" d="M50 15 C 60 30, 70 30, 85 50 S 70 70, 50 85 S 30 70, 15 50 S 30 30, 50 15" fill="none" stroke="#a349a4" strokeWidth="2" />
          <path className="portal-swirl" d="M50 25 C 65 35, 65 35, 75 50 S 65 65, 50 75 S 35 65, 25 50 S 35 35, 50 25" fill="none" stroke="#7b1fa2" strokeWidth="2" />
        </g>
        <path className="portal-arrow" d="M50 60 L60 40 L40 40 Z" fill="#ffffff" opacity="0.7" />
      </svg>
    </div>
  );
};

export default MagicalScroll;