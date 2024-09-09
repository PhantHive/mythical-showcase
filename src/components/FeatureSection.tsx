import React, { useState } from 'react';
import '../styles/FeatureSection.css';
import { useNavigate } from "react-router-dom";

interface FeatureSectionProps {
  image: string;
  title: string;
  description: string;
}

const creatureTypes = ['Fairy', 'Enchanted', 'Mystic'];
const typeColors = {
  Fairy: '#4a90e2',
  Enchanted: '#9b59b6',
  Mystic: '#f1c40f'
};

const creatures = {
  Fairy: ['Brushy.png', 'Labali.png', 'Lumi.png', 'Pawnee.png', 'Pioupy.png', 'Syrex.png', 'Yumiko.png'],
  Enchanted: ['Blutari.png', 'Faber.png', 'Pandora.png', 'Prismetia.png', 'Redari.png', 'Vegat.png'],
  Mystic: ['Nufair.png']
};

const FeatureSection: React.FC<FeatureSectionProps> = ({ image, title, description }) => {
  const [currentType, setCurrentType] = useState(0);
  const [currentCreature, setCurrentCreature] = useState(0);
  const navigate = useNavigate();

  const handleCreatureClick = () => {
    navigate('/luminals');
  };

  const nextCreature = () => {
    setCurrentCreature((prev) => {
      const nextIndex = (prev + 1) % creatures[creatureTypes[currentType]].length;
      if (nextIndex === 0) {
        setCurrentType((prevType) => (prevType + 1) % creatureTypes.length);
      }
      return nextIndex;
    });
  };

  const prevCreature = () => {
    setCurrentCreature((prev) => {
      if (prev === 0) return prev; // Do not update if already at the first creature
      const currentCreatures = creatures[creatureTypes[currentType]];
      return (prev - 1 + currentCreatures.length) % currentCreatures.length;
    });
  };

  if (title === "Collect Cute Creatures") {
    const currentCreatureType = creatureTypes[currentType];
    const currentCreatureName = creatures[currentCreatureType][currentCreature];

    return (
      <section className="feature-section">
        <div className="feature-content">
          <h2 className="feature-title">{title}</h2>
          <p className="feature-description">{description}</p>
          <button className="prismatic-button" onClick={handleCreatureClick}>See Collection</button>
        </div>
        <div className="creature-showcase">
          <div
            className="creature-display"
            style={{ backgroundColor: typeColors[currentCreatureType] }}
            onClick={handleCreatureClick}
          >
            <img
              src={`/creatures/${currentCreatureType}/${currentCreatureName}`}
              alt={`${currentCreatureType} Creature`}
              className="creature-image"
            />
            <div className="creature-info">
              <p className="creature-name">{currentCreatureName.replace('.png', '')}</p>
              <p className="creature-type">Type: {currentCreatureType}</p>
            </div>
          </div>
          <div className="creature-nav">
            <button onClick={prevCreature} className="nav-button">&#8592;</button>
            <button onClick={nextCreature} className="nav-button">&#8594;</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="feature-section">
      <div className="feature-content">
        <h2 className="feature-title">{title}</h2>
        <p className="feature-description">{description}</p>
      </div>
      <div className="feature-image-container">
        <img src={`/${image}`} alt={title} className="feature-image" />
      </div>
    </section>
  );
};

export default FeatureSection;