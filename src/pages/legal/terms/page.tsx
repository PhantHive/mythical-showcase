'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowLeft, FaFileContract } from 'react-icons/fa';
import Image from 'next/image';

const termsContent = `
  <h2>1. Introduction</h2>
  <p>Welcome to Mythical, a Discord bot operated by Phearion Games Inc, hereinafter referred to as "Phearion," "we," "us," or "our." By accessing or using Mythical (hereinafter referred to as "the Service"), you agree to comply with these Terms of Service (hereinafter referred to as "ToS"). If you do not agree with these terms, you must cease using the Service immediately.</p>

  <h2>2. Legal Agreement</h2>
  <p>By using the Service, you enter into a legally binding agreement with Phearion. These ToS constitute the entirety of that agreement. Any supplementary terms provided in relation to specific features of the Service are incorporated herein by reference.</p>

  <h2>3. Age Requirements</h2>
  <p>You must be at least 13 years old to use Mythical, as per Discord's ToS. If you are below this age, you are prohibited from accessing or using the Service. Users are responsible for ensuring they meet local age requirements where applicable.</p>

  <h2>4. Service Accessibility</h2>
  <p>Phearion reserves the right to restrict or limit access to the Service for any user at any time. Service availability is not guaranteed, and temporary outages may occur. Phearion assumes no responsibility for downtime or disruptions to the Service.</p>

  <h2>6. Prohibited Conduct</h2>
  <p>The following actions are strictly prohibited while using Mythical and will result in immediate and severe consequences, including but not limited to permanent account termination, reporting to Discord, and legal action where applicable:</p>
  <ul>
    <li>Engaging in any form of cheating, hacking, or manipulation: Any attempts to exploit the system, use unauthorized third-party software, or manipulate gameplay will be met with zero tolerance. Offenders will face a permanent ban without warning.</li>
    <li>Distributing offensive, NSFW, or harmful content: Sharing or distributing content that is violent, sexually explicit, discriminatory, or harmful will result in immediate removal from the Service and reporting to relevant authorities.</li>
    <li>Harassing, bullying, or discriminating against other users: Any form of harassment, hate speech, or discriminatory behavior based on race, gender, nationality, sexual orientation, religion, or any other protected category will lead to permanent bans and possible reporting to Discord or legal authorities.</li>
    <li>Violating Discord's Terms of Service or Community Guidelines: Any breach of Discord's own ToS will be treated as a violation of our ToS. This includes but is not limited to impersonation, malicious behavior, or any actions Discord deems inappropriate.</li>
  </ul>
  <p>There will be no warnings or second chances. All violations are logged, and any user found in breach of these policies will be subject to immediate and irreversible action.</p>

  <h2>7. Virtual Goods</h2>
  <p>The Service includes virtual in-game content (e.g., items, creatures, currency) that is for entertainment purposes only. All in-game content is the property of Phearion, and users are granted a license to interact with this content solely within the Service. Virtual content holds no real-world monetary value and cannot be exchanged outside of Mythical.</p>

  <h2>8. Microtransactions</h2>
  <p>Users may purchase virtual in-game currency through authorized platforms. All purchases are final and non-refundable, except as required by Discord's ToS. No refunds, credits, or returns are offered for any virtual purchases, regardless of usage.</p>

  <h2>9. License to Use Virtual Content</h2>
  <p>Users are granted a limited, non-exclusive, non-transferable license to access and interact with virtual content within the Service. This license is revocable, and it terminates if your account is banned or otherwise terminated.</p>

  <h2>10. Intellectual Property Rights</h2>
  <p>All intellectual property rights, including but not limited to copyrights, trademarks, and game mechanics, remain the exclusive property of Phearion. You agree not to reproduce, modify, distribute, or exploit any part of the Service without prior written permission from Phearion.</p>

  <h2>11. User-Generated Content</h2>
  <p>By contributing any content (text, images, suggestions) within Mythical, you grant Phearion a perpetual, royalty-free, worldwide license to use, distribute, and display said content. Phearion may remove any user-generated content that violates these ToS or is otherwise deemed inappropriate.</p>

  <h2>12. Gacha Mechanism</h2>
  <p>Mythical uses a gacha system that allows users to acquire random virtual items. Phearion is committed to providing transparency in item odds, and users are encouraged to engage responsibly. Random outcomes are subject to algorithmic probability and cannot be influenced by user actions.</p>

  <h2>13. Responsible Gaming</h2>
  <p>Phearion encourages responsible gaming practices and may impose limits on in-game spending or playing time for users who show signs of excessive or problematic behavior.</p>

  <h2>14. Data Security</h2>
  <p>We take appropriate measures to secure user data, including encryption and regular security audits. However, Phearion does not guarantee the security of data transmitted over the internet and disclaims liability for any breaches that are outside its control.</p>

  <h2>15. Data Collection</h2>
  <p>Phearion collects minimal user data, primarily linked to your Discord ID, to enhance gameplay experience and maintain service integrity. For more details, please review our Privacy Policy, which outlines how your data is collected, stored, and used.</p>

  <h2>16. Privacy Compliance</h2>
  <p>By using Mythical, you agree to the collection and processing of your personal data in accordance with our Privacy Policy. You warrant that the data you provide is accurate and up to date. We do not sell or share user data with third parties for commercial purposes.</p>

  <h2>17. Refund Policy</h2>
  <p>All purchases within the Service are non-refundable, except as required by applicable laws or Discord's own refund policy. Any unauthorized chargebacks will result in the immediate suspension or termination of your account.</p>

  <h2>18. Account Termination</h2>
  <p>Phearion reserves the right to suspend or terminate any account that violates these ToS or Discord's ToS. Upon termination, all user data and virtual content associated with the account will be permanently deleted.</p>

  <h2>19. Amendments to Terms</h2>
  <p>Phearion reserves the right to modify these ToS at any time. Significant changes will be announced via our Discord Support Server. Continued use of the Service constitutes acceptance of any modified terms.</p>

  <h2>20. Service Availability</h2>
  <p>While Phearion strives to maintain an uninterrupted Service, we do not guarantee that Mythical will always be available. Service outages or maintenance may occur without prior notice, and Phearion is not responsible for any resulting loss of data or progression.</p>

  <h2>21. Third-Party Services</h2>
  <p>Mythical integrates with Discord and may interact with other third-party platforms. Phearion is not responsible for the terms, policies, or security measures of third-party services. Users should familiarize themselves with the terms and conditions of any third-party platform they use in connection with Mythical.</p>

  <h2>22. Dispute Resolution</h2>
  <p>By using Mythical, you agree that any disputes will be handled at Phearion's discretion. You waive your right to initiate legal proceedings against Phearion unless required by applicable law. Any disputes not resolved internally will be subject to the exclusive jurisdiction of the courts of [jurisdiction state/country].</p>

  <h2>23. Limitation of Liability</h2>
  <p>Phearion shall not be held liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use the Service, including but not limited to loss of data, virtual content, or account access.</p>

  <h2>24. Disclaimer of Warranties</h2>
  <p>The Service is provided "as is," without warranties of any kind, whether express or implied. Phearion disclaims any warranties regarding the availability, accuracy, or reliability of the Service.</p>

  <h2>25. Contact Information</h2>
  <p>For any inquiries or concerns regarding these ToS, users may contact us through our official Discord Support Server. Phearion is under no obligation to respond to every inquiry but will make reasonable efforts to address concerns.</p>
`;

const cardinalSkins = [
    { src: '/assets/Cardinals/Chibi/chibi-attack.png', alt: 'Chibi Attack Cardinal' },
    { src: '/assets/Cardinals/Chibi/chibi-defense.png', alt: 'Chibi Defense Cardinal' },
    { src: '/assets/Cardinals/Chibi/chibi-heal.png', alt: 'Chibi Heal Cardinal' },
    { src: '/assets/Cardinals/Chibi/Skins/Chibi_Dea_X_Ena.png', alt: 'Chibi Dea X Ena' },
    { src: '/assets/Cardinals/Chibi/Skins/Chibi_Elsena_W.png', alt: 'Chibi Elsena W' },
    { src: '/assets/Cardinals/Skins/Ena_X/Dea_X_Ena.png', alt: 'Dea X Ena Cardinal' },
    { src: '/assets/Cardinals/Skins/Erza_Z/Summer_Party_Erza.png', alt: 'Summer Party Erza' },
    { src: '/assets/Cardinals/Skins/Esen_W/Elsena_W.png', alt: 'Elsena W Cardinal' },
];

export default function TermsOfService() {
    const [stars, setStars] = useState<React.ReactNode[]>([]);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        // Create twinkling stars
        const numberOfStars = 50;
        const newStars = Array.from({ length: numberOfStars }, (_, i) => {
            const style: React.CSSProperties = {
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '2px',
                height: '2px',
                backgroundColor: 'white',
                borderRadius: '50%',
                animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
                opacity: Math.random() * 0.7 + 0.3,
            };

            return <span key={i} style={style}></span>;
        });

        setStars(newStars);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />

            {/* Stars */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {stars}
            </div>

            {/* MASSIVE Cardinal Skins positioned right at container borders */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
                {cardinalSkins.map((cardinal, index) => {
                    const yTransform = useTransform(
                        scrollYProgress,
                        [index * 0.08, (index + 1) * 0.08],
                        [150, -150]
                    );
                    const opacity = useTransform(
                        scrollYProgress,
                        [index * 0.06, index * 0.08 + 0.06, (index + 1) * 0.08],
                        [0, 0.9, 0]
                    );
                    const scale = useTransform(
                        scrollYProgress,
                        [index * 0.06, index * 0.08 + 0.03, (index + 1) * 0.08],
                        [0.8, 1.4, 0.8]
                    );

                    return (
                        <motion.div
                            key={index}
                            className={`fixed ${index % 2 === 0
                                ? 'right-2 lg:right-12 xl:right-16'
                                : 'left-2 lg:left-12 xl:left-16'
                            }`}
                            style={{
                                y: yTransform,
                                opacity,
                                scale,
                                top: `${5 + (index * 10)}%`,
                                zIndex: 5,
                            }}
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, 6, -6, 0],
                                    y: [0, -20, 0]
                                }}
                                transition={{
                                    duration: 9,
                                    repeat: Infinity,
                                    delay: index * 2
                                }}
                                className="relative"
                            >
                                <Image
                                    src={cardinal.src}
                                    alt={cardinal.alt}
                                    width={400}
                                    height={400}
                                    className="object-contain filter drop-shadow-2xl"
                                />
                                {/* Enhanced magical glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/50 to-pink-400/50 rounded-full blur-3xl -z-10" />
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-purple-400/30 rounded-full blur-2xl -z-10 animate-pulse" />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <motion.a
                        href="#/"
                        className="group mb-8 inline-flex items-center gap-2 text-purple-400 transition-colors hover:text-purple-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
                        Return to Home
                    </motion.a>

                    {/* Header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="inline-flex items-center gap-4 mb-6">
                            <FaFileContract className="text-5xl text-purple-400" />
                            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-horizon">
                                Terms of Service
                            </h1>
                        </div>
                        <p className="text-2xl text-white font-medium">
                            Please read and understand our terms
                        </p>
                    </motion.div>

                    {/* Content Container - Extra wide to accommodate huge Cardinals */}
                    <motion.div
                        className="bg-black/70 backdrop-blur-xl border border-white/30 rounded-3xl p-16 shadow-2xl mx-16 lg:mx-32"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div
                            className="prose prose-invert prose-purple max-w-none legal-content"
                            dangerouslySetInnerHTML={{ __html: termsContent }}
                        />

                        {/* Discord Links */}
                        <div className="mt-20 pt-12 border-t border-white/40">
                            <h3 className="text-2xl font-semibold text-purple-400 mb-6">Additional Resources</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <a
                                    href="https://discord.com/terms"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-6 bg-purple-600/20 border border-purple-400/30 rounded-xl text-purple-300 hover:text-purple-200 hover:bg-purple-600/30 transition-all text-lg"
                                >
                                    Discord Terms of Service ↗
                                </a>
                                <a
                                    href="https://discord.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-6 bg-purple-600/20 border border-purple-400/30 rounded-xl text-purple-300 hover:text-purple-200 hover:bg-purple-600/30 transition-all text-lg"
                                >
                                    Discord Privacy Policy ↗
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
