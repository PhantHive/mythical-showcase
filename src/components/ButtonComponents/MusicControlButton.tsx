import React from 'react';
import '../../styles/ButtonStyles/MusicControlButton.css';

interface MusicControlButtonProps {
  isMuted: boolean;
  onMuteToggle: () => void;
}

const MusicControlButton: React.FC<MusicControlButtonProps> = ({ isMuted, onMuteToggle }) => {
  return (
    <button className="music-control-button" onClick={onMuteToggle}>
      {isMuted ? '🔇' : '🔊'} {isMuted ? 'Unmute' : 'Mute'} Lumières de Phearion
    </button>
  );
};

export default MusicControlButton;