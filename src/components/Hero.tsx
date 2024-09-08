import React from 'react';
import DynamicText from './DynamicText';
import '../styles/Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">MYTHICAL</h1>
        <DynamicText />
        <p className="hero-subtitle">A Legendary Discord Adventure Bot</p>
        <div className="hero-feature">
          <img src="/public/mythical-lobby.png" alt="Mythical Lobby" className="hero-image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;