import React, { useEffect, useRef, useState } from 'react';
import '../styles/ParallaxBackground.css';

interface HalloweenItem {
  id: number;
  symbol: string;
  style: React.CSSProperties;
}

interface SpiderPosition {
  x: number;
  y: number;
  angle: number;
}

const ParallaxBackground: React.FC = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const darkSideRef = useRef<HTMLDivElement>(null);
  const spiderRef = useRef<SVGSVGElement>(null);
  const [darkSideOpacity, setDarkSideOpacity] = useState(0);
  const [spiderPosition, setSpiderPosition] = useState<SpiderPosition>({ x: 50, y: 50, angle: 0 });
  const [spiderSize, setSpiderSize] = useState(0.5);

  // Define web paths
  const webPaths = [
    { start: { x: 0, y: 50 }, end: { x: 100, y: 50 } },
    { start: { x: 50, y: 0 }, end: { x: 50, y: 100 } },
    { start: { x: 0, y: 0 }, end: { x: 100, y: 100 } },
    { start: { x: 100, y: 0 }, end: { x: 0, y: 100 } },
    { start: { x: 25, y: 50 }, end: { x: 75, y: 50 } },
    { start: { x: 50, y: 25 }, end: { x: 50, y: 75 } },
    { start: { x: 25, y: 25 }, end: { x: 75, y: 75 } },
    { start: { x: 75, y: 25 }, end: { x: 25, y: 75 } },
  ];

  useEffect(() => {
    let currentPathIndex = 0;
    let progress = 0;
    let direction = 1;

    const moveSpider = () => {
      const currentPath = webPaths[currentPathIndex];
      const { start, end } = currentPath;

      // Calculate new position
      const x = start.x + (end.x - start.x) * progress;
      const y = start.y + (end.y - start.y) * progress;

      // Calculate angle for rotation
      const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);

      setSpiderPosition({ x, y, angle });

      // Update progress
      progress += 0.005 * direction;

      // Change direction or path when reaching end
      if (progress > 1 || progress < 0) {
        direction *= -1;
        if (direction === 1) {
          currentPathIndex = (currentPathIndex + 1) % webPaths.length;
        }
      }

      // Update spider size based on scroll position
      const scrollPosition = window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / maxScroll;
      const newSize = 0.5 + Math.min(scrollPercentage, 0.5); // Max size is 1.0
      setSpiderSize(newSize);
    };

    const animationFrame = requestAnimationFrame(function animate() {
      moveSpider();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const parallax = parallaxRef.current;
      const darkSide = darkSideRef.current;
      if (parallax && darkSide) {
        const scrollPosition = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = scrollPosition / maxScroll;

        const scale = 1 + scrollPercentage * 0.2;
        const yPos = -(scrollPosition * 0.3);
        parallax.style.transform = `translate3d(0, ${yPos}px, 0) scale(${scale})`;

        setDarkSideOpacity(scrollPercentage);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const halloweenItems: HalloweenItem[] = [
    { id: 1, symbol: 'pumpkin', style: { top: '10%', left: '5%', width: '60px' } },
    { id: 2, symbol: 'ghost', style: { top: '30%', right: '10%', width: '50px' } },
    { id: 3, symbol: 'bat', style: { bottom: '20%', left: '15%', width: '40px' } },
    { id: 4, symbol: 'witch-hat', style: { top: '5%', right: '15%', width: '80px' } },
  ];

  return (
    <div className="parallax-container">
      <div ref={parallaxRef} className="parallax-background">
        {halloweenItems.map((item) => (
          <svg key={item.id} className="halloween-item" style={item.style}>
            <use href={`#${item.symbol}`} />
          </svg>
        ))}
      </div>
      <div
        ref={darkSideRef}
        className="dark-side"
        style={{ opacity: darkSideOpacity }}
      >
        <svg className="spider-web" viewBox="0 0 100 100">
          <use href="#spider-web" />
        </svg>
        <svg
          ref={spiderRef}
          className="spider"
          viewBox="0 0 100 100"
          style={{
            left: `${spiderPosition.x}%`,
            top: `${spiderPosition.y}%`,
            transform: `translate(-50%, -50%) scale(${spiderSize}) rotate(${spiderPosition.angle}deg)`
          }}
        >
          <use href="#spider" />
        </svg>
      </div>
      <div className="glow-border"></div>

      {/* Include the SVG definitions */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
        <symbol id="pumpkin" viewBox="0 0 100 100">
          <path d="M50 20 C30 20 10 40 10 60 C10 80 30 90 50 90 C70 90 90 80 90 60 C90 40 70 20 50 20" fill="#ff7518"/>
          <path d="M50 20 C45 20 45 10 50 10 C55 10 55 20 50 20" fill="#4caf50"/>
          <path d="M30 50 Q40 60 30 70" stroke="black" fill="none" stroke-width="3"/>
          <path d="M70 50 Q60 60 70 70" stroke="black" fill="none" stroke-width="3"/>
          <path d="M40 75 Q50 85 60 75" stroke="black" fill="none" stroke-width="3"/>
        </symbol>

        <symbol id="ghost" viewBox="0 0 100 100">
          <path
              d="M50 10 C25 10 20 40 20 70 C20 80 30 80 35 75 C40 80 45 85 50 80 C55 85 60 80 65 75 C70 80 80 80 80 70 C80 40 75 10 50 10"
              fill="white" stroke="black" stroke-width="2"/>
          <circle cx="35" cy="40" r="5" fill="black"/>
          <circle cx="65" cy="40" r="5" fill="black"/>
          <path d="M40 60 Q50 70 60 60" fill="none" stroke="black" stroke-width="2"/>
        </symbol>

        <symbol id="bat" viewBox="0 0 100 100">
          <path d="M50 30 L30 10 L10 30 L30 50 L10 70 L30 90 L50 70 L70 90 L90 70 L70 50 L90 30 L70 10 Z" fill="#333"/>
          <circle cx="40" cy="40" r="5" fill="white"/>
          <circle cx="60" cy="40" r="5" fill="white"/>
        </symbol>

        <symbol id="witch-hat" viewBox="0 0 100 100">
          <path d="M10 90 Q50 80 90 90 L50 10 Z" fill="#440066"/>
          <path d="M20 80 Q50 72 80 80 L50 20 Z" fill="#7700b3"/>
          <path d="M40 50 Q50 48 60 50 L50 30 Z" fill="#aa00ff"/>
          <circle cx="50" cy="60" r="5" fill="#ff9900"/>
          <path d="M30 85 Q50 82 70 85" fill="none" stroke="#ff9900" stroke-width="2"/>
          <path d="M40 75 Q50 73 60 75" fill="none" stroke="#ff9900" stroke-width="2"/>
        </symbol>

        <symbol id="spider-web" viewBox="0 0 100 100">
          <path d="M0,50 H100 M50,0 V100 M0,0 L100,100 M100,0 L0,100" stroke="rgba(255,255,255,0.3)" fill="none"/>
          <path d="M25,50 H75 M50,25 V75 M25,25 L75,75 M75,25 L25,75" stroke="rgba(255,255,255,0.2)" fill="none"/>
          <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.1)" fill="none"/>
          <circle cx="50" cy="50" r="30" stroke="rgba(255,255,255,0.1)" fill="none"/>
          <circle cx="50" cy="50" r="15" stroke="rgba(255,255,255,0.1)" fill="none"/>
        </symbol>

        <symbol id="spider" viewBox="0 0 100 100">
          <ellipse cx="50" cy="60" rx="20" ry="25" fill="black"/>
          <circle cx="50" cy="40" r="15" fill="black"/>
          <circle cx="44" cy="36" r="3" fill="white"/>
          <circle cx="56" cy="36" r="3" fill="white"/>
          <path d="M30,50 Q20,60 10,50 M70,50 Q80,60 90,50" stroke="black" fill="none" stroke-width="2"/>
          <path d="M35,70 Q25,80 15,70 M65,70 Q75,80 85,70" stroke="black" fill="none" stroke-width="2"/>
        </symbol>
      </svg>
    </div>
  );
};

export default ParallaxBackground;