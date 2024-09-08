import React from 'react';
import '../../styles/ButtonStyles/Buttons.css';
import { FaDonate } from 'react-icons/fa';

const DonateButton: React.FC = () => {
  return (
    <a href="https://paypal.me/phearion?country.x=FR&locale.x=fr_FR" target= "_blank" rel="noopener noreferrer" className="magic-button donate-button">
        <FaDonate className="button-icon" />
        Donate
    </a>
  );
};

export default DonateButton;