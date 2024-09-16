import { useEffect, useState } from 'react';
import '../../styles/Cookies/CookieConsent.css';

const CookieConsent = () => {
  const [showBanner] = useState(false);

  useEffect(() => {
    const music = document.getElementById('background-music') as HTMLAudioElement;
    if (music) {
      const playMusic = () => {
        music.volume = 0.2; // Set initial volume to low
        music.play().catch(error => console.log("Audio play failed:", error));
      };

      if (music.readyState >= 2) { // HAVE_CURRENT_DATA
        playMusic();
      } else {
        music.addEventListener('canplaythrough', playMusic, { once: true });
      }
    }
  }, []);

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