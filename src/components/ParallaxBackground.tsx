import React, { useEffect, useRef, useState } from 'react';
import '../styles/ParallaxBackground.css';
import { enchantedCreatures, fairyCreatures, mysticCreatures } from '../utils/importImages';

const creatures = [...enchantedCreatures, ...fairyCreatures, ...mysticCreatures];

const ParallaxBackground: React.FC = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [visibleCreatures, setVisibleCreatures] = useState<string[]>([]);
  const [finishedCreatures, setFinishedCreatures] = useState<number[]>([]);

  useEffect(() => {
    const timeouts: number[] = [];

    const startAnimation = () => {
      setFinishedCreatures([]);
      setVisibleCreatures([]);
      creatures.forEach((src, index) => {
        const timeout = setTimeout(() => {
          setVisibleCreatures(prev => [...prev, src]);
        }, index * 3000); // Adjust the delay as needed
        timeouts.push(timeout);
      });
    };

    startAnimation();

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  useEffect(() => {
  if (finishedCreatures.includes(0) && finishedCreatures.length === creatures.length) {
    setFinishedCreatures([]);
    setVisibleCreatures([]);
  } else if (finishedCreatures.length === creatures.length) {
    setFinishedCreatures([0]);
    setVisibleCreatures([creatures[0]]);
  }
}, [finishedCreatures]);

  const handleAnimationEnd = (index: number) => {
    setFinishedCreatures(prev => [...prev, index]);
  };

  return (
    <div className="parallax-container" ref={parallaxRef}>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      {visibleCreatures.map((src, index) => (
          <img
              key={index}
              src={src}
              className="creature"
              style={{
                animation: `move 15s linear`,
                animationDelay: `${index * 5}s`,
                left: index === 0 ? '-50%' : `-${index * 50}%`
              }}
              alt="creature"
              onAnimationEnd={() => handleAnimationEnd(index)}
          />
      ))}
    </div>
  );
};

export default ParallaxBackground;