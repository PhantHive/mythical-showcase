import React from 'react';
import '../styles/Features.css';

const Features: React.FC = () => {
  return (
    <section className="features">
      <h2 className="features-title">Prepare for Your Mythical Journey</h2>
      <div className="feature-list">
        <div className="feature-item">
          <h3>Magical Hatchery</h3>
          <p>Incubate and hatch rare mythical creatures.</p>
        </div>
        <div className="feature-item">
          <h3>Creature Collection</h3>
          <p>Build your own menagerie of fantastic beasts.</p>
        </div>
        <div className="feature-item">
          <h3>Epic Adventures</h3>
          <p>Embark on quests in a magical realm.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;