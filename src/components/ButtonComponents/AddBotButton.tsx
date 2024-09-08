import React from 'react';
import '../../styles/ButtonStyles/Buttons.css';

const AddBotButton: React.FC = () => {
  return (
    <a href="https://discord.com/oauth2/authorize?client_id=1250496056521654393&permissions=517611048032&integration_type=0&scope=bot+applications.commands" target="_blank" rel="noopener noreferrer" className="magic-button add-bot-button">
      <img src="/public/mystic-egg.png" alt="Mystic Egg" className="button-icon" />
      Add to Discord
    </a>
  );
};

export default AddBotButton;