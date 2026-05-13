import React from 'react';
import { motion } from 'framer-motion';
import ProgressRing from './ProgressRing';

interface TimerDisplayProps {
  timeLeft: number;
  totalTime: number;
  breakTimeLeft: number;
  formatTime: (seconds: number) => string;
  isRunning: boolean;
  currentPhase: 'focus' | 'break';
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ 
  timeLeft, 
  totalTime,
  breakTimeLeft,
  formatTime, 
  isRunning,
  currentPhase 
}) => {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Progress Ring */}
      <div className="absolute inset-0 w-80 h-80">
        <ProgressRing
          currentPhase={currentPhase}
          timeLeft={timeLeft}
          totalTime={totalTime}
          breakTimeLeft={breakTimeLeft}
          isRunning={isRunning}
        />
      </div>

      {/* Timer container with soft shadow */}
      <motion.div
        className="bg-white bg-opacity-90 rounded-5xl p-12 bubble-shadow kawaii-transition relative z-10"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={isRunning ? {
          scale: [1, 1.02, 1],
          boxShadow: [
            "0 8px 32px rgba(0, 0, 0, 0.08)",
            "0 12px 40px rgba(255, 179, 209, 0.15)",
            "0 8px 32px rgba(0, 0, 0, 0.08)"
          ],
        } : {}}
        transition={{
          duration: 2,
          repeat: isRunning ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        {/* Timer display */}
        <div className="text-center">
          <motion.div
            className={`text-8xl font-bold font-quicksand tracking-wider drop-shadow-lg ${
              currentPhase === 'focus' ? 'text-gray-800' : 'text-purple-800'
            }`}
            key={currentPhase === 'focus' ? timeLeft : breakTimeLeft}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {currentPhase === 'focus' 
              ? `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`
              : `${Math.floor(breakTimeLeft / 60)}:${String(breakTimeLeft % 60).padStart(2, '0')}`
            }
          </motion.div>
          
          {/* Running indicator */}
          {isRunning && (
            <motion.div
              className="mt-4 inline-flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className={`w-3 h-3 rounded-full ${
                  currentPhase === 'focus' ? 'bg-pastel-orange' : 'bg-purple-600'
                }`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className={`font-medium text-sm uppercase tracking-wider drop-shadow ${
                currentPhase === 'focus' ? 'text-gray-600' : 'text-purple-600'
              }`}>
                {currentPhase === 'focus' ? 'Foco' : 'Pausa'}
              </span>
            </motion.div>
          )}
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-8 h-8 bg-pastel-yellow rounded-full opacity-60"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-2 -left-2 w-6 h-6 bg-pastel-purple rounded-full opacity-50"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default TimerDisplay;
