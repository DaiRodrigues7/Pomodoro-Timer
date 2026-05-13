import React from 'react';
import { motion } from 'framer-motion';

const SoluneLogo: React.FC<{ size?: number }> = ({ size = 60 }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      className="drop-shadow-lg"
    >
      {/* Background circle */}
      <circle cx="60" cy="60" r="58" fill="#FFF8F0" stroke="#FFE4CC" strokeWidth="2" />
      
      {/* Left side - Sol (Sun) */}
      <defs>
        <clipPath id="solClip">
          <rect x="2" y="2" width="56" height="116" rx="28" />
        </clipPath>
      </defs>
      
      <g clipPath="url(#solClip)">
        {/* Sun background */}
        <circle cx="30" cy="60" r="26" fill="#FFD4A3" />
        
        {/* Sun rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1={30 + Math.cos((angle * Math.PI) / 180) * 22}
            y1={60 + Math.sin((angle * Math.PI) / 180) * 22}
            x2={30 + Math.cos((angle * Math.PI) / 180) * 32}
            y2={60 + Math.sin((angle * Math.PI) / 180) * 32}
            stroke="#FFB366"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
        
        {/* Sun face */}
        <circle cx="22" cy="55" r="2" fill="#FF8C42" />
        <circle cx="38" cy="55" r="2" fill="#FF8C42" />
        
        {/* Sun smile */}
        <path
          d="M 20 65 Q 30 72 40 65"
          stroke="#FF8C42"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      
      {/* Right side - Lune (Moon) */}
      <defs>
        <clipPath id="luneClip">
          <rect x="62" y="2" width="56" height="116" rx="28" />
        </clipPath>
      </defs>
      
      <g clipPath="url(#luneClip)">
        {/* Moon background */}
        <circle cx="90" cy="60" r="26" fill="#E6D3FF" />
        
        {/* Moon stars */}
        <circle cx="82" cy="48" r="1.5" fill="#FFE4B5" />
        <circle cx="95" cy="52" r="1" fill="#FFE4B5" />
        <circle cx="88" cy="68" r="1.2" fill="#FFE4B5" />
        <circle cx="92" cy="72" r="0.8" fill="#FFE4B5" />
        
        {/* Moon face */}
        <circle cx="82" cy="55" r="2" fill="#9333EA" />
        <circle cx="98" cy="55" r="2" fill="#9333EA" />
        
        {/* Moon sleeping smile */}
        <path
          d="M 78 62 Q 90 68 102 62"
          stroke="#9333EA"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Moon sleeping stars */}
        <circle cx="75" cy="45" r="0.8" fill="#FFE4B5" opacity="0.8" />
        <circle cx="105" cy="50" r="0.6" fill="#FFE4B5" opacity="0.6" />
      </g>
      
      {/* Clock hands */}
      <line x1="60" y1="60" x2="60" y2="25" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="60" x2="85" y2="50" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" />
      
      {/* Small star decoration */}
      <g transform="translate(95, 25)">
        <path
          d="M 0 -4 L 1 0 L 0 4 L -1 0 Z"
          fill="#FFD700"
          transform="rotate(0)"
        />
        <path
          d="M 0 -4 L 1 0 L 0 4 L -1 0 Z"
          fill="#FFD700"
          transform="rotate(72)"
        />
        <path
          d="M 0 -4 L 1 0 L 0 4 L -1 0 Z"
          fill="#FFD700"
          transform="rotate(144)"
        />
        <path
          d="M 0 -4 L 1 0 L 0 4 L -1 0 Z"
          fill="#FFD700"
          transform="rotate(216)"
        />
        <path
          d="M 0 -4 L 1 0 L 0 4 L -1 0 Z"
          fill="#FFD700"
          transform="rotate(288)"
        />
      </g>
    </motion.svg>
  );
};

export default SoluneLogo;
