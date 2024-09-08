import React from 'react';
import '../styles/FeatureSection.css';

interface FeatureSectionProps {
  image: string;
  title: string;
  description: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ image, title, description }) => {
  return (
    <section className="feature-section">
      <div className="feature-content">
        <h2 className="feature-title">{title}</h2>
        <p className="feature-description">{description}</p>
      </div>
      <div className="feature-image-container">
        <img src={`/public/${image}`} alt={title} className="feature-image" />
      </div>
    </section>
  );
};

export default FeatureSection;