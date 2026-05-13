import React from 'react';
import { motion } from 'framer-motion';

interface SessionCounterProps {
  sessionCount: number;
  maxSessions?: number;
}

const SessionCounter: React.FC<SessionCounterProps> = ({ sessionCount, maxSessions = 8 }) => {
  const displaySessions = Math.min(sessionCount, maxSessions);
  
  return (
    <motion.div
      className="flex items-center justify-center gap-2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {[...Array(maxSessions)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-10 h-10 rounded-full flex items-center justify-center kawaii-transition ${
            i < displaySessions
              ? 'bg-sol-orange shadow-lg'
              : 'bg-gray-200 opacity-50'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-2xl">
            {i < displaySessions ? '☀️' : '🌙'}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SessionCounter;
