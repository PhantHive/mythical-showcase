import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ButtonStyles/GoBackButton.css';

const GoBackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button className="go-back-button" onClick={() => navigate(-1)}>
      Go Back to Mythical website
    </button>
  );
};

export default GoBackButton;