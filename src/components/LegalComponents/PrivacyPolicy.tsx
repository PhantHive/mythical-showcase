import React from 'react';
import LegalPage from './LegalPage.tsx';

const privacyContent = `
  <h2>1. Data Collection</h2>
  <p>At Phearion Games, we only store your Discord User ID in our database. This is used solely to link your in-game profile and track your progress within Mythical. No other personal information, such as email addresses, phone numbers, or real names, is collected or stored.</p>

  <p>All other IDs and data stored are purely related to in-game virtual content, such as creatures, inventory, and achievements. These do not directly link to your personal identity outside of the game.</p>

  <h2>2. Bot Permissions and Access</h2>
  <p>The bot has permissions to view channels, send messages, embed links, and manage interactions like reactions and stickers. However, it does not access private messages, read full message history (only per server/channel), or gather personal data beyond the Discord User ID required for gameplay.</p>

  <h2>3. Data Protection and Compliance</h2>
  <p>We comply with the General Data Protection Regulation (GDPR) for users in the European Economic Area (EEA) and other relevant jurisdictions. This means that you have the right to access, modify, or request the deletion of your User ID data at any time.</p>

  <p>For users within the United States, we adhere to relevant U.S. privacy laws. The User ID collected is used solely to enhance your gaming experience, and we do not share or sell your data to third parties for commercial purposes.</p>

  <h2>4. Data Retention</h2>
  <p>Your Discord User ID is stored as long as your account remains active. If you delete your account or request data deletion, all stored data will be permanently removed from our servers, including in-game progress and virtual assets.</p>

  <h2>5. Contact and Data Requests</h2>
  <p>If you have any concerns or requests regarding your data, you can contact us through our Discord Support Server. We aim to respond to inquiries or data deletion requests within 30 days, in accordance with GDPR and U.S. privacy law requirements.</p>
`;

const PrivacyPolicy: React.FC = () => {
  return <LegalPage title="Privacy Policy" content={privacyContent} />;
};

export default PrivacyPolicy;
