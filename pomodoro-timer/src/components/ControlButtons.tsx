import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlButtonsProps {
  isRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  isRunning,
  onToggleTimer,
  onResetTimer,
}) => {
  return (
    <motion.div
      className="flex gap-4 mt-8"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Play/Pause Button */}
      <motion.button
        onClick={onToggleTimer}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg kawaii-transition relative group ${
          isRunning
            ? 'bg-pastel-pink hover:bg-pastel-pink/90 hover:brightness-110'
            : 'bg-pastel-green hover:bg-pastel-green/90 hover:brightness-110'
        }`}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)"
        }}
        whileTap={{ 
          scale: 0.9,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ type: "spring", bounce: 0.3 }}
        title={isRunning ? 'Pausar' : 'Iniciar'}
      >
        {isRunning ? (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Pause className="w-8 h-8 text-white" />
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ x: 2 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <Play className="w-8 h-8 text-white ml-1" />
          </motion.div>
        )}
        <motion.span 
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xs font-medium bg-gray-800 px-2 py-1 rounded-lg whitespace-nowrap"
          initial={{ opacity: 0, y: 5 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isRunning ? 'Pausar' : 'Iniciar'}
        </motion.span>
      </motion.button>

      {/* Reset Button */}
      <motion.button
        onClick={onResetTimer}
        className="w-14 h-14 rounded-full bg-pastel-yellow hover:bg-pastel-yellow/90 hover:brightness-110 flex items-center justify-center shadow-lg kawaii-transition relative group"
        whileHover={{ 
          scale: 1.1,
          rotate: [-5, 5, -5],
          transition: { duration: 0.3, repeat: 2 }
        }}
        whileTap={{ 
          scale: 0.9,
          rotate: 0
        }}
        title="Reiniciar"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <RotateCcw className="w-6 h-6 text-white" />
        </motion.div>
        <motion.span 
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xs font-medium bg-gray-800 px-2 py-1 rounded-lg whitespace-nowrap"
          initial={{ opacity: 0, y: 5 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          Reiniciar
        </motion.span>
      </motion.button>

          </motion.div>
  );
};

export default ControlButtons;
