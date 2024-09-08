import React from 'react';
import '../../styles/LegalComponents/LegalPage.css';

interface LegalPageProps {
  title: string;
  content: string;
}

const LegalPage: React.FC<LegalPageProps> = ({ title, content }) => {
  return (
    <div className="legal-page">
      <div className="scroll-container">
        <div className="scroll-content">
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <div className="discord-links">
            <p>Please also review:</p>
            <a href="https://discord.com/terms" target="_blank" rel="noopener noreferrer">Discord Terms of Service</a>
            <a href="https://discord.com/privacy" target="_blank" rel="noopener noreferrer">Discord Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;