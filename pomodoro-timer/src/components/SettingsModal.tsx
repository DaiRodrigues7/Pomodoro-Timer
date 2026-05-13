import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    studyTime: number;
    soundEnabled: boolean;
  };
  onDurationChange: (minutes: number) => void;
  onSoundToggle: (enabled: boolean) => void;
  onSave: () => void;
  onResetStats?: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onDurationChange,
  onSoundToggle,
  onSave,
  onResetStats,
}) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onSave();
      onClose();
      setIsSaving(false);
    }, 1000);
  };

  const handleDurationChange = (value: string) => {
    const minutes = parseInt(value) || 10;
    // Round to nearest 5
    const roundedMinutes = Math.round(minutes / 5) * 5;
    if (roundedMinutes >= 10 && roundedMinutes <= 60) {
      onDurationChange(roundedMinutes);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white bg-opacity-98 backdrop-blur-lg rounded-3xl p-10 max-w-md w-full shadow-2xl border border-white border-opacity-20"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 font-quicksand flex items-center gap-2">
                <Settings className="w-6 h-6 text-pastel-pink" />
                Configurações
              </h2>
              <motion.button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-pastel-pink/20 hover:bg-pastel-pink/30 flex items-center justify-center kawaii-transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-pastel-pink" />
              </motion.button>
            </div>

            {/* Focus Settings */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-700 font-quicksand mb-4">
                🎯 Foco
              </h3>
              
              <div className="flex items-center justify-between">
                <label className="text-slate-600 font-medium font-quicksand">
                  Minutos de Estudo (10-60min)
                </label>
                <input
                  type="number"
                  value={settings.studyTime}
                  onChange={(e) => handleDurationChange(e.target.value)}
                  step="5"
                  className={`w-24 px-3 py-2 rounded-lg bg-white bg-opacity-90 text-slate-800 font-quicksand focus:outline-none focus:ring-2 ${
                    settings.studyTime < 10 || settings.studyTime > 60 
                      ? 'ring-red-500 border-red-500' 
                      : 'ring-sol-orange border-sol-orange'
                  }`}
                  min="10"
                  max="60"
                />
              </div>
            </div>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between mb-6">
              <label className="text-slate-600 font-medium font-quicksand">
                🔔 Som de Notificação
              </label>
              <motion.button
                onClick={() => onSoundToggle(!settings.soundEnabled)}
                className={`w-16 h-8 rounded-full relative transition-colors duration-300 ${
                  settings.soundEnabled ? 'bg-sol-orange' : 'bg-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-6 h-6 bg-white rounded-full absolute top-1 shadow-md"
                  animate={{
                    x: settings.soundEnabled ? 8 : 0,
                  }}
                  transition={{ type: "spring", bounce: 0.3 }}
                />
              </motion.button>
            </div>

            {/* Reset Stats Button */}
            <div className="flex items-center justify-between mb-8">
              <label className="text-slate-600 font-medium font-quicksand">
                📊 Resetar Estatísticas
              </label>
              <motion.button
                onClick={() => {
                  if (onResetStats) {
                    onResetStats();
                  }
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-quicksand text-sm transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset
              </motion.button>
            </div>

          {/* Save Button */}
          <div className="flex justify-center mt-6">
            <motion.button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-10 py-4 rounded-2xl font-medium font-quicksand shadow-md transition-all ${
                isSaving 
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-sol-orange to-pastel-pink hover:from-sol-orange/90 hover:to-pastel-pink/90 text-white hover:shadow-lg transform hover:scale-105'
              }`}
              whileHover={{ scale: isSaving ? 1 : 1.05 }}
              whileTap={{ scale: isSaving ? 1 : 0.95 }}
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Salvando...
                </span>
              ) : (
                'Salvar'
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
    </AnimatePresence>
  );
};

export default SettingsModal;
