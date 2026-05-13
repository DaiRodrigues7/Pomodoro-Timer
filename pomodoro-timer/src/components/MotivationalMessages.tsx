import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MOTIVATIONAL_MESSAGES = [
  'Você consegue! 💪',
  'Hora de brilhar! ✨',
  'Quase lá! 🎯',
  'Respire fundo 🌸',
  'Foco total! 🎯',
  'Você é incrível! 🌟',
  'Continue assim! 🚀',
  'Força guerreiro(a)! 💫',
  'Concentre-se agora! 🧘',
  'Você está no caminho! 🌈',
  'Acredite em você! 💖',
  'Mandou bem! 👏',
  'Super poder! ⚡',
  'Foco zen! 🧘‍♂️',
  'Você arrasa! 🔥',
  'Paciência é virtude! ⏳',
  'Um passo de cada vez! 👣',
  'Sua melhor versão! 🌟',
  'Respire e siga! 🌬️',
  'Você é capaz! 🌺',
];

interface MotivationalMessagesProps {
  isRunning: boolean;
}

const MotivationalMessages: React.FC<MotivationalMessagesProps> = ({ 
  isRunning
}) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isRunning) {
      // Show a random message every 30 seconds during focus time
      const interval = setInterval(() => {
        const randomMessage = MOTIVATIONAL_MESSAGES[
          Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)
        ];
        setCurrentMessage(randomMessage);
        setIsVisible(true);
        
        // Hide message after 5 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 5000);
      }, 30000);

      // Show first message immediately
      const firstMessage = MOTIVATIONAL_MESSAGES[
        Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)
      ];
      setCurrentMessage(firstMessage);
      setIsVisible(true);

      return () => clearInterval(interval);
    } else {
      setIsVisible(false);
    }
  }, [isRunning]);

  if (!isRunning || !isVisible) {
    return null;
  }

  return (
    <motion.div
      className="text-center mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <motion.div
        className="inline-block bg-white bg-opacity-90 px-6 py-3 rounded-3xl shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", bounce: 0.3 }}
      >
        <p className="text-gray-700 font-medium font-quicksand text-sm">
          {currentMessage}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MotivationalMessages;
