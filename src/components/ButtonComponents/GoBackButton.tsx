import React from 'react';
import '../../styles/ButtonStyles/GoBackButton.css';

const GoBackButton: React.FC = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <button className="go-back-button" onClick={handleGoBack}>
      Go Back to Mythical website
    </button>
  );
};

export default GoBackButton;