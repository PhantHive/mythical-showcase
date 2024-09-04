import Hero from './components/Hero';
import Features from './components/Features';
import './styles/Global.css';
import './styles/App.css';
import CosmicSupportButton from "./components/CosmicSupportButton.tsx";
import MagicalPortal from "./components/MagicalPortal.tsx";

function App() {

    const scrollToFeatures = () => {
    const featuresSection = document.querySelector('.features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      <Hero />
      <Features />
      <a
        href="https://discord.com/oauth2/authorize?client_id=1250496056521654393&permissions=8&integration_type=0&scope=bot+applications.commands"
        target="_blank"
        rel="noopener noreferrer"
        className="invite-button"
      >
        <div className="button-content">
          <img src="/mystic-egg.png" alt="Mythical Bot" className="invite-icon" />
          <span className="invite-text">Add to Discord</span>
        </div>
      </a>
        <MagicalPortal onClick={scrollToFeatures} />
        <CosmicSupportButton />
    </div>
  );
}

export default App;