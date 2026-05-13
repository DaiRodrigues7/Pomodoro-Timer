import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-10 backdrop-blur-sm py-4 text-center z-50"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <p className="text-white text-sm font-medium font-quicksand drop-shadow-lg">
        Feito <span className="text-pastel-pink"></span> por{' '}
        <span className="font-bold">Dadai</span> ✨
      </p>
    </motion.footer>
  );
};

export default Footer;
