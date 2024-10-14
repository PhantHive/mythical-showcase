import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Luminals.css';

const creatureTypes = ['Fairy', 'Enchanted', 'Mystic'] as const;
type CreatureType = typeof creatureTypes[number];

const creatures: Record<CreatureType, string[]> = {
  Fairy: ['Brushy.png', 'Labali.png', 'Lumi.png', 'Pawnee.png', 'Pioupy.png', 'Syrex.png', 'Yumiko.png', 'Umella.png', 'Mentari.png'],
  Enchanted: ['Blutari.png', 'Faber.png', 'Pandora.png', 'Prismetia.png', 'Redari.png', 'Vegat.png', 'Cloufy.png'],
  Mystic: ['Nufair.png', 'Solarian.png', 'Yume.png']
};

const Luminals: React.FC = () => {
  const fairyRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const enchantedRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const [isPaused, ] = useState(false);

  useEffect(() => {
    const fairyElement = fairyRef.current;
    const enchantedElement = enchantedRef.current;

    if (fairyElement && enchantedElement) {
      let fairyScroll = 0;
      let enchantedScroll = enchantedElement.scrollHeight - enchantedElement.clientHeight;

      const animate = () => {
        if (!isPaused) {
          fairyScroll += 0.5;
          enchantedScroll -= 0.5;

          if (fairyScroll >= fairyElement.scrollHeight) {
            fairyScroll = 0;
          }

          if (enchantedScroll <= 0) {
            enchantedScroll = enchantedElement.scrollHeight - enchantedElement.clientHeight;
          }

          fairyElement.scrollTop = fairyScroll;
          enchantedElement.scrollTop = enchantedScroll;
        }
        requestAnimationFrame(animate);
      };

      animate();
    }
  }, [isPaused]);

  return (
    <div className="luminals-container">
      <h1 className="luminals-title">Luminals Collection</h1>
      <div className="luminals-columns">
        {creatureTypes.map((type, index) => (
          <div key={type} className={`luminal-column ${type.toLowerCase()}`}>
            <h2 className="luminal-type-title">{type}</h2>
            <div
              className="luminal-scroll"
              ref={index === 0 ? fairyRef : index === 1 ? enchantedRef : undefined}
            >
              {creatures[type].map((creature) => (
                <div key={creature} className="luminal-card">
                  <img
                    src={`/creatures/${type}/${creature}`}
                    alt={creature.replace('.png', '')}
                    className="luminal-image"
                  />
                  <p className="luminal-name">{creature.replace('.png', '')}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="buttons-row">
        <Link to="/" className="back-button">Back to Home</Link>
      </div>
    </div>
  );
};

export default Luminals;