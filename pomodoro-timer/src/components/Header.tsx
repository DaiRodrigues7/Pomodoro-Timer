import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import SoluneLogo from './SoluneLogo';

const Header: React.FC<{
  onSettingsClick: () => void;
}> = ({ onSettingsClick }) => {
  // Always use Sol theme since we have single mode timer
  const isSolMode = true;

  return (
    <motion.div
      className="flex items-center justify-between w-full px-4 lg:px-8 pt-4 lg:pt-1"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <SoluneLogo size={50} />

        <motion.h1
          className="text-3xl lg:text-4xl font-bold text-white drop-shadow-lg tracking-wide"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <span style={{ color: '#FFB366', letterSpacing: '0.02em' }}>S</span>
          <span style={{ color: '#9333EA', letterSpacing: '0.02em' }}>olune</span>
        </motion.h1>
      </div>

      {/* Settings Button */}
      <motion.button
        onClick={onSettingsClick}
        className={`w-12 h-12 rounded-full flex items-center justify-center kawaii-transition ${isSolMode
          ? 'bg-sol-orange/20 hover:bg-sol-orange/30'
          : 'bg-lune-violet/20 hover:bg-lune-violet/30'
          }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Configurações"
      >
        <Settings className="w-6 h-6 text-white" />
      </motion.button>
    </motion.div>
  );
};

export default Header;
