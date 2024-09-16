import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const music = document.getElementById('background-music') as HTMLAudioElement;
    if (music) {
      music.volume = 0.2; // Set initial volume to low
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
                  description="Decorate your house with furniture, put your favorite luminal to guard your house and more!"
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
          </div>
        } />
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