import React from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Always use Sol theme (focus mode) since we have single mode timer
  const getBackgroundClass = () => {
    return 'bg-gradient-to-br from-sol-cream via-sol-yellow to-sol-orange';
  };

  const getBubbleColors = () => {
    // Always use Sol theme colors
    return ['bg-sol-yellow/30', 'bg-sol-orange/20', 'bg-sol-yellow/25'];
  };

  return (
    <motion.div
      className={`min-h-screen theme-transition overflow-y-auto ${getBackgroundClass()}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Decorative bubbles with theme-aware colors */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => {
          const colors = getBubbleColors();
          return (
            <motion.div
              key={i}
              className={`absolute rounded-full ${colors[i % colors.length]}`}
              style={{
                width: Math.random() * 150 + 50,
                height: Math.random() * 150 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default Layout;
