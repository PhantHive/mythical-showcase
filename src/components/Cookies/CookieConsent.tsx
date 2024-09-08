import { useEffect, useState } from 'react';
import '../../styles/Cookies/CookieConsent.css';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookiesAccepted = document.cookie.split(';').some((item) => item.trim().startsWith('cookies_accepted='));
    setShowBanner(!cookiesAccepted);
  }, []);

  const handleAcceptCookies = () => {
    document.cookie = "cookies_accepted=true; path=/; max-age=" + 60 * 60 * 24 * 365;
    setShowBanner(false);

    const music = document.getElementById('background-music') as HTMLAudioElement;
    if (music) {
      music.volume = 0.2; // Set initial volume to low
      music.play().catch(error => {
        console.error("Music playback failed:", error);
      });
    }
  };

  return (
    <>
      {showBanner && (
        <div id="cookie-consent-banner" className="cookie-consent-banner">
          <img src="/mystic-egg.png" alt="Egg Icon" className="cookie-icon" />
          <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
          <button id="accept-cookies" className="accept-cookies-button" onClick={handleAcceptCookies}>
            Accept
          </button>
        </div>
      )}
      <audio id="background-music" src="/Phearion's warriors.mp3" loop></audio>
    </>
  );
};

export default CookieConsent;