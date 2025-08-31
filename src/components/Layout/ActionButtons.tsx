'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDiscord, FaVoteYea, FaExternalLinkAlt } from 'react-icons/fa';

interface ActionButtonsProps {
    variant?: 'hero' | 'section' | 'compact';
    showTopGG?: boolean;
    className?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
    variant = 'section',
    showTopGG = true,
    className = ''
}) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const buttonSize = variant === 'hero'
        ? isMobile ? 'px-6 py-3 text-base' : 'px-8 py-4 text-lg'
        : variant === 'compact'
        ? isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-2 text-sm'
        : isMobile ? 'px-4 py-3 text-base' : 'px-6 py-3 text-base';

    const buttons = [
        {
            label: 'Add to Server',
            icon: <FaDiscord className={variant === 'hero' ? (isMobile ? 'text-xl' : 'text-2xl') : 'text-xl'} />,
            href: 'https://discord.com/oauth2/authorize?client_id=1250496056521654393&permissions=517611048032&integration_type=0&scope=bot+applications.commands',
            className: 'bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold',
            external: true
        },
        {
            label: 'Support Server',
            icon: <FaDiscord className={variant === 'hero' ? (isMobile ? 'text-xl' : 'text-2xl') : 'text-xl'} />,
            href: 'https://discord.gg/9bfmjajSEt',
            className: 'bg-gray-700 hover:bg-gray-600 text-white font-bold',
            external: true
        }
    ];

    if (showTopGG) {
        buttons.push({
            label: 'Vote on Top.gg',
            icon: <FaVoteYea className={variant === 'hero' ? (isMobile ? 'text-xl' : 'text-2xl') : 'text-xl'} />,
            href: 'https://top.gg/bot/1250496056521654393',
            className: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold',
            external: true
        });
    }

    return (
        <div className={`flex ${isMobile ? 'flex-col gap-3' : 'flex-col sm:flex-row gap-4'} justify-center lg:justify-start ${className}`}>
            {buttons.map((button, index) => (
                <motion.a
                    key={button.label}
                    href={button.href}
                    target={button.external ? '_blank' : undefined}
                    rel={button.external ? 'noopener noreferrer' : undefined}
                    className={`
                        ${buttonSize} ${button.className}
                        rounded-xl transition-all duration-300 group
                        flex items-center justify-center gap-3
                        shadow-lg hover:shadow-xl
                        font-horizon relative overflow-hidden
                        ${isMobile ? 'mobile-touch-target' : 'hover:scale-105 transform'}
                    `}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={isMobile ? {} : { y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Hover Effect - Disabled on mobile */}
                    {!isMobile && (
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}

                    <span className="relative z-10">{button.icon}</span>
                    <span className="relative z-10 font-medium">{button.label}</span>

                    {button.external && (
                        <FaExternalLinkAlt className={`relative z-10 ${isMobile ? 'text-sm' : 'text-xs'} opacity-70`} />
                    )}
                </motion.a>
            ))}
        </div>
    );
};

export default ActionButtons;
