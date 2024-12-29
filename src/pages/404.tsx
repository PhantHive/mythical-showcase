import Link from 'next/link';
import Head from 'next/head';
import { CSSProperties, useEffect, useState } from 'react';

export default function Custom404() {
    const [stars, setStars] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        // Create twinkling stars
        const numberOfStars = 100;
        const newStars = Array.from({ length: numberOfStars }, (_, i) => {
            const style: CSSProperties = {
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '2px',
                height: '2px',
                backgroundColor: 'white',
                borderRadius: '50%',
                animationName: 'twinkle',
                animationDuration: '3s',
                animationIterationCount: 'infinite',
                opacity: 0,
            };

            return <span key={i} style={style}></span>;
        });

        setStars(newStars);
    }, []);

    return (
        <>
            <Head>
                <title>404 - Lost in the Magical Realm | Mythical Bot</title>
                <style>{`
                    body {
                        margin: 0;
                        padding: 0;
                        min-height: 100vh;
                        background: linear-gradient(135deg, #0b1729 0%, #1a1b4b 100%);
                        font-family: 'MedievalSharp', cursive;
                        color: #fff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        overflow: hidden;
                    }

                    @keyframes twinkle {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.2; }
                    }

                    @keyframes float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-20px); }
                    }
                `}</style>
            </Head>
            <div
                className="stars"
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                }}
            >
                {stars}
            </div>
            <div
                className="container"
                style={{
                    position: 'relative',
                    padding: '2rem',
                    zIndex: 1,
                    textAlign: 'center',
                }}
            >
                <h1
                    style={{
                        fontSize: '8rem',
                        margin: 0,
                        background: 'linear-gradient(to right, #ffd700, #ffa500)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
                    }}
                >
                    404
                </h1>
                <img
                    src="/Eggs/mystic-egg.png"
                    alt="Lost Mythical Egg"
                    style={{
                        width: '150px',
                        height: '150px',
                        margin: '2rem 0',
                        animation: 'float 3s ease-in-out infinite',
                    }}
                />
                <p
                    style={{
                        fontSize: '1.5rem',
                        color: '#8b9fde',
                        margin: '1rem 0 2rem',
                    }}
                >
                    Oh no! It seems you've wandered into an unexplored realm...
                </p>
                <Link
                    href="/"
                    className="back-button"
                    style={{
                        display: 'inline-block',
                        padding: '1rem 2rem',
                        background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                        border: 'none',
                        borderRadius: '0.5rem',
                        color: 'white',
                        textDecoration: 'none',
                        fontFamily: "'MedievalSharp', cursive",
                        fontSize: '1.2rem',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
                    }}
                >
                    Return to Safety
                </Link>
            </div>
        </>
    );
}
