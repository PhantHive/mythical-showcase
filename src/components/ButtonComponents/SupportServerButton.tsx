import React from 'react';
import '../../styles/ButtonStyles/Buttons.css';
import { FaDiscord } from 'react-icons/fa';

const SupportServerButton: React.FC = () => {
  return (
    <a href="https://discord.gg/JJw53tsMcq" target="_blank" rel="noopener noreferrer" className="magic-button support-server-button">
        <FaDiscord className="button-icon" />
        Support Server
    </a>
  );
};

export default SupportServerButton;