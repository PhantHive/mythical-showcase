// WinterGuide.tsx
import { motion } from 'framer-motion';
import { FaSnowflake, FaMugHot } from 'react-icons/fa'; // Import the hot chocolate icon
import '../../styles/winter/winter.css';

interface WinterRewardCardProps {
    title: string;
    reward: string;
    description: string;
}

const WinterGuide = () => {
    const createWinterSnowflakes = () => {
        return Array(50).fill(null).map((_, i) => (
            <motion.div
                key={i}
                className="winter-snowflake"
                initial={{
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                    y: -20,
                    rotate: 0,
                    opacity: 0.5
                }}
                animate={{
                    y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 20,
                    rotate: 360,
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <FaSnowflake size={Math.random() * 20 + 10} />
            </motion.div>
        ));
    };

    return (
        <div className="winter-page">
            {/* Snowflakes Layer */}
            <div className="winter-snowflakes-layer">
                {createWinterSnowflakes()}
            </div>

            <div className="winter-container">
                <header className="winter-header">
                    <img
                        src="/winter/mythical-tree.png"
                        alt="Mythical Winter"
                        className="winter-header-image"
                    />
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="winter-title"
                    >
                        Mythical Winter
                    </motion.h1>
                    <p className="winter-subtitle">A Magical Season of Rewards</p>
                </header>

                  {/* Credit Section */}
                <section className="winter-section winter-credit">
                    <h2 className="winter-section-title">Credits</h2>
                    <div className="winter-credit-content">
                        <FaMugHot size={25} className="winter-credit-icon" />
                        <p>For the Luminals: <a href="https://maya-design.cloud" target="_blank" rel="noopener noreferrer">Maya Graphist</a></p>
                        <p>For the decorations: <a href="https://wenrexa.itch.io" target="_blank" rel="noopener noreferrer">Wenrexa</a></p>
                        <p>For the winter tiles: <a href="https://cuddlyclover.itch.io" target="_blank" rel="noopener noreferrer">CuddlyClover</a></p>
                    </div>
                </section>

                <div className="winter-content">

                    <section className="winter-section">
                        <h2 className="winter-section-title">Tree Decoration Rewards</h2>
                        <div className="winter-rewards">
                            <RewardCard
                                title="Default Ball"
                                reward="1 🍫"
                                description="Place every 5 hours"
                            />
                            <RewardCard
                                title="Special Ball"
                                reward="5 🍫"
                                description="Unlock via voting on top.gg"
                            />
                            <RewardCard
                                title="Golden Ball"
                                reward="10 🍫"
                                description="Place in #mythical-tree channel"
                            />
                        </div>
                    </section>

                    <section className="winter-section">
                        <h2 className="winter-section-title">Available Decorations</h2>
                        <div className="winter-decorations">
                            <div className="winter-ball-category">
                                <h3>Default Balls</h3>
                                <div className="winter-ball-grid">
                                    {['blue', 'gray', 'pink', 'red', 'violet'].map(color => (
                                        <motion.img
                                            key={color}
                                            src={`/winter/balls/${color}-ball.png`}
                                            alt={`${color} ball`}
                                            whileHover={{scale: 1.1}}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="winter-ball-category">
                                <h3>✨ Special Balls</h3>
                                <div className="winter-ball-grid">
                                    {['blue', 'gray', 'pink', 'red', 'violet'].map(color => (
                                        <motion.img
                                            key={color}
                                            src={`/winter/balls/special/special-${color}-ball.png`}
                                            alt={`special ${color} ball`}
                                            whileHover={{scale: 1.1}}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="winter-ball-category">
                                <h3>🌟 Golden Ball</h3>
                                <div className="winter-ball-grid">
                                    <motion.img
                                        src="/winter/balls/golden/golden-ball.png"
                                        alt="golden ball"
                                        whileHover={{scale: 1.1}}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="winter-section">
                        <div className="winter-special">
                            <img
                                src="/winter/vintage-winter-mythical.png"
                                alt="Winter Event"
                                className="winter-event-image"
                            />
                            <img
                                src="/winter/vintage-winter-phearion-choco.png"
                                alt="Winter Event"
                                className="winter-event-image"
                            />
                        </div>
                    </section>

                    <section className="winter-section">
                        <h2 className="winter-section-title">Coming December 20th (Skin preview the 15th of
                            December)</h2>
                        <motion.div
                            className="winter-cardinal"
                            whileHover={{scale: 1.02}}
                        >
                            <img src="/cardinal/heal-cardinal.png" alt="Esen W"/>
                            <div className="winter-cardinal-info">
                                <h3>Winter Esen W</h3>
                                <p>Exclusive Seasonal Skin</p>
                            </div>
                        </motion.div>
                    </section>

                    <section className="winter-section winter-creatures">
                        <h2 className="winter-section-title">Winter Collection</h2>
                        <div className="winter-creatures-grid">
                            <motion.div
                                className="winter-creature-card"
                                whileHover={{scale: 1.02}}
                            >
                                <img src="/creatures/Fairy/Merrycal.png" alt="Merrycal"/>
                                <div className="winter-creature-info">
                                    <h3>Merrycal</h3>
                                    <p className="winter-creature-type">Winter Fairy</p>
                                    <p className="winter-creature-rarity">★★</p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="winter-creature-card"
                                whileHover={{scale: 1.02}}
                            >
                                <img src="/creatures/Enchanted/Blizou.png" alt="Enchanted Blizou"/>
                                <div className="winter-creature-info">
                                    <h3>Enchanted Blizou</h3>
                                    <p className="winter-creature-type">Winter Enchanted</p>
                                    <p className="winter-creature-rarity">★★★★</p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="winter-creature-card"
                                whileHover={{scale: 1.02}}
                            >
                                <img src="/creatures/Mystic/Woka.png" alt="Mystic Woka"/>
                                <div className="winter-creature-info">
                                    <h3>Mystic Woka</h3>
                                    <p className="winter-creature-type">Winter Mystic</p>
                                    <p className="winter-creature-rarity">★★★★★</p>
                                    <span className="winter-creature-special">1% chance</span>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

const RewardCard: React.FC<WinterRewardCardProps> = ({title, reward, description}) => (
    <motion.div
        className="winter-reward-card"
        whileHover={{scale: 1.02}}
    >
        <h3>{title}</h3>
        <div className="winter-reward-amount">{reward}</div>
        <p>{description}</p>
    </motion.div>
);

export default WinterGuide;