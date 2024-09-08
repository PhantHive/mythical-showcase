import React, { useState, useEffect } from 'react';
import '../styles/DynamicText.css';

const phrases = [
  "Your adventure begins here.",
  "Collect mythical luminals.",
  "Embark on epic quests.",
];

const DynamicText: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting && displayText === phrases[index]) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      } else {
        setDisplayText(phrases[index].substring(0, isDeleting ? displayText.length - 1 : displayText.length + 1));
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [displayText, index, isDeleting]);

  return <h2 className="dynamic-text">{displayText}</h2>;
};

export default DynamicText;