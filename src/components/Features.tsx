// src/components/Features.tsx
import { Users, Trophy } from 'lucide-react';
import '../styles/Features.css';
import React from "react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode; // Allow icon to be a React element and make it optional
  image: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, image }) => (
  <div className="feature-card">
    <div className="feature-content">
      {icon && <div className="feature-icon">{icon}</div>}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
    {image && (
      <div className="feature-image-container">
        <img src={image} alt={title} className="feature-image" />
      </div>
    )}
  </div>
);

const Features = () => {
  return (
    <section className="features">
      <h2 className="features-title">Embark on Your Mythical Journey</h2>
      <div className="feature-grid">
        <FeatureCard
          title="Mythical Lobby"
          description="Join a vibrant community of fellow adventurers in our immersive mythical lobby."
          icon={<Users />}
          image="/mythical-lobby.png"
        />
        <FeatureCard
          title="Creature Collection"
          description="Collect and nurture a diverse array of mythical creatures in your own magical menagerie."
          image="/mythical-collection.png"
        />
        <FeatureCard
          title="Character Progression"
          description="Level up your hero, unlock powerful abilities, and customize your mythical avatar."
          icon={<Trophy />}
          image="/mythical-profile.png"
        />
      </div>
    </section>
  );
};

export default Features;