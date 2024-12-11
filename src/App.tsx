import React, {useEffect, useState} from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { FaSnowman } from 'react-icons/fa'; // Import the gift icon
import ParallaxBackground from './components/ParallaxBackground';
import Hero from './components/Hero';
import FeatureSection from './components/FeatureSection';
import Footer from './components/Footer';
import AddBotButton from './components/ButtonComponents/AddBotButton.tsx';
import DonateButton from './components/ButtonComponents/DonateButton.tsx';
import SupportServerButton from './components/ButtonComponents/SupportServerButton.tsx';
import MagicalScroll from './components/MagicalScroll';
import CookieConsent from "./components/Cookies/CookieConsent.tsx";
import MusicControlButton from "./components/ButtonComponents/MusicControlButton.tsx";
import GoBackButton from "./components/ButtonComponents/GoBackButton.tsx";
import TermsOfService from './components/LegalComponents/TermsOfService.tsx';
import PrivacyPolicy from './components/LegalComponents/PrivacyPolicy.tsx';
import './styles/App.css';
import './styles/MobileStyles.css';
import Luminals from "./components/Luminals.tsx";
import WinterGuide from "./components/winter/WinterGuide.tsx";

const Snowfall: React.FC = () => (
  <svg className="snowfall" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle className="snowflake" cx="10" cy="10" r="1" />
    <circle className="snowflake" cx="20" cy="20" r="1.5" />
    <circle className="snowflake" cx="30" cy="30" r="1" />
    <circle className="snowflake" cx="40" cy="40" r="1.5" />
    <circle className="snowflake" cx="50" cy="50" r="1" />
    <circle className="snowflake" cx="60" cy="60" r="1.5" />
    <circle className="snowflake" cx="70" cy="70" r="1" />
    <circle className="snowflake" cx="80" cy="80" r="1.5" />
    <circle className="snowflake" cx="90" cy="90" r="1" />
  </svg>
);

const ChristmasNotification: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/winter-guide');
  };

  return (
    <div className="christmas-notification" onClick={handleClick}>
      <FaSnowman size={32} />
      <Snowfall />
      <span className="notification-text">Go to winter guide</span>
    </div>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const music = document.getElementById('background-music') as HTMLAudioElement;
    if (music) {
      music.src = '/Lumières de Phearion.mp3'; // Update the music file
      music.volume = 0.2; // Set initial volume to low
      music.loop = true; // Ensure the music loops
      music.play().catch(error => console.log("Audio play failed:", error));
    }
  }, []);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    const music = document.getElementById('background-music') as HTMLAudioElement;
    if (music) {
      music.muted = !isMuted;
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={
          <div className="app">
            <ParallaxBackground />
            <CookieConsent />
            <main>
              <Hero />
              <FeatureSection
                image="mythical-creature.png"
                title="Collect Cute Creatures"
                description="Hatch different types of eggs to find rare Luminals"
              />
              <FeatureSection
                image="mythical-reward.png"
                title="Cosmic Hunts"
                description="Send your Luminals on thrilling hunts for epic rewards"
              />
              <FeatureSection
                  image="mythical-profile.png"
                  title="Showcase Your Journey"
                  description="Display your achievements and favorite Luminal"
              />
              <FeatureSection
                  image="mythical-housing.png"
                  title="In game housing system!"
                  description="Decorate and manage your house with furnitures, put your favorite luminal to guard your house and more!"
              />
            </main>
            <Footer />
            <div className="floating-buttons">
              <AddBotButton />
              <DonateButton />
              <SupportServerButton />
              <MusicControlButton isMuted={isMuted} onMuteToggle={handleMuteToggle} />
            </div>
            <MagicalScroll />
            <ChristmasNotification /> {/* Add the Christmas notification */}
          </div>
        } />
        <Route path="/winter-guide" element={<WinterGuide />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/luminals" element={<Luminals />} />
      </Routes>
      {(location.pathname === '/terms' || location.pathname === '/privacy') && <GoBackButton />}
    </>
  );
};

const App: React.FC = () => (
  <Router basename="/">
    <AppContent />
  </Router>
);

export default App;