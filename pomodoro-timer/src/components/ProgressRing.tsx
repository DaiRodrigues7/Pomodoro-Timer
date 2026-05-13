import React from 'react';
import { motion } from 'framer-motion';

interface ProgressRingProps {
  currentPhase: 'focus' | 'break';
  timeLeft: number;
  totalTime: number;
  breakTimeLeft: number;
  isRunning: boolean;
}

const ProgressRing: React.FC<ProgressRingProps> = ({ 
  currentPhase, 
  timeLeft, 
  totalTime, 
  breakTimeLeft,
  isRunning 
}) => {
  // Calculate progress based on current phase
  const progress = currentPhase === 'focus' 
    ? ((totalTime - timeLeft) / totalTime) * 100
    : ((breakTimeLeft) / 60) * 100; // Break progress (reversed)
  
  const circumference = 2 * Math.PI * 120; // radius = 120
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  const getProgressColor = (phase: 'focus' | 'break') => {
    switch (phase) {
      case 'focus':
        return '#FFB366'; // Solune pastel orange (Sol)
      case 'break':
        return '#9333EA'; // Solune violet (Lune)
      default:
        return '#FFB366';
    }
  };

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ rotate: 0 }}
      animate={isRunning ? { rotate: 360 } : {}}
      transition={{ duration: 60, repeat: isRunning ? Infinity : 0, ease: "linear" }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 280 280"
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Background circle */}
        <circle
          cx="140"
          cy="140"
          r="120"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx="140"
          cy="140"
          r="120"
          stroke={getProgressColor(currentPhase)}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
          }}
        />
      </svg>
      
      {/* Decorative dots */}
      {[0, 90, 180, 270].map((angle, index) => (
        <div
          key={angle}
          className="absolute w-3 h-3 bg-white rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-130px)`,
          }}
        />
      ))}
    </motion.div>
  );
};

export default ProgressRing;
