import React, {useEffect, useState} from 'react';
import '../styles/MagicalPortal.css';

type MagicalPortalProps = {
  onClick: () => void;
};

const MagicalPortal: React.FC<MagicalPortalProps> = ({ onClick }) => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      setIsAtBottom(isBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onClick();
    }
  };

  return (
    <div className="magical-portal" onClick={handleClick}>
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
        <g className="portal-stars" fill="#ffffff">
          <circle cx="30" cy="30" r="1">
            <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="70" cy="70" r="1">
            <animate attributeName="opacity" values="0;1;0" dur="3s" begin="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="20" r="1">
            <animate attributeName="opacity" values="0;1;0" dur="3s" begin="2s" repeatCount="indefinite" />
          </circle>
        </g>
        <path
          className="portal-arrow"
          d={isAtBottom ? "M50 40 L40 55 L60 55 Z" : "M50 60 L40 45 L60 45 Z"}
          fill="#ffffff"
          opacity="0.7"
        />
      </svg>
    </div>
  );
};

export default MagicalPortal;