import React, { useEffect } from 'react';
import '../styles/ParallaxBackground.css';

const ParallaxBackground: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const parallax = document.querySelector('.parallax-background') as HTMLElement | null;
      if (parallax) {
        const scrollPosition = window.pageYOffset;
        const scale = 1 + scrollPosition * 0.001; // Adjust the scaling factor as needed
        parallax.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="parallax-container">
      <div className="parallax-background"></div>
      <div className="glow-border"></div>
    </div>
  );
};

export default ParallaxBackground;