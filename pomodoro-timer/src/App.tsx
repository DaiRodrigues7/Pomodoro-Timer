import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from './components/Layout';
import Header from './components/Header';
import TimerDisplay from './components/TimerDisplay';
import ControlButtons from './components/ControlButtons';
import TaskList from './components/TaskList';
import SettingsModal from './components/SettingsModal';
import SessionCounter from './components/SessionCounter';
import MotivationalMessages from './components/MotivationalMessages';
import Footer from './components/Footer';
import { useTimer } from './hooks/useTimer';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const {
    timeLeft,
    totalTime,
    isRunning,
    sessionCount,
    currentPhase,
    breakTimeLeft,
    dailyStats,
    settings,
    toggleTimer,
    resetTimer,
    formatTime,
    updateStudyTime,
    updateSettings,
    resetDailyStats,
  } = useTimer();

  const handleSoundToggle = (enabled: boolean) => {
    updateSettings({ soundEnabled: enabled });
  };

  // Update study time when settings are saved
  const handleSettingsSave = () => {
    // Timer will reset automatically with new duration
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
        {/* Header with Solune Branding */}
        <Header 
          onSettingsClick={() => setIsSettingsOpen(true)}
        />

        {/* Dashboard Grid Layout */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 mt-8">
          {/* Left Column - Timer Section */}
          <div className="flex flex-col items-center gap-4">
            {/* Session Counter */}
            <SessionCounter sessionCount={sessionCount} />

            {/* Timer Display */}
            <TimerDisplay
              timeLeft={timeLeft}
              totalTime={totalTime}
              breakTimeLeft={breakTimeLeft}
              formatTime={formatTime}
              isRunning={isRunning}
              currentPhase={currentPhase}
            />

            {/* Control Buttons */}
            <ControlButtons
              isRunning={isRunning}
              onToggleTimer={toggleTimer}
              onResetTimer={resetTimer}
            />

            {/* Motivational Messages */}
            <MotivationalMessages
              isRunning={isRunning}
            />
          </div>

          {/* Middle Column - Session Stats */}
          <div className="flex flex-col gap-4">
            <motion.div
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-slate-700 text-lg font-semibold font-quicksand mb-4 flex items-center gap-2">
                📊 Estatísticas da Sessão
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 text-sm font-quicksand font-semibold">Sessões Hoje</span>
                  <span className="text-slate-900 font-bold text-lg font-quicksand">{dailyStats.completedSessions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 text-sm font-quicksand font-semibold">Tempo Total</span>
                  <span className="text-slate-900 font-bold text-lg font-quicksand">
                    {formatTime(dailyStats.totalFocusTime)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 text-sm font-quicksand font-semibold">Produtividade</span>
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: i < Math.min(dailyStats.completedSessions, 4) ? 1 : 0.3,
                          backgroundColor: i < Math.min(dailyStats.completedSessions, 4) ? '#FFB366' : 'rgba(255,255,255,0.3)'
                        }}
                        transition={{ delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 text-sm font-quicksand font-semibold">Meta Diária</span>
                  <span className="text-slate-900 font-bold text-sm font-quicksand">
                    {dailyStats.completedSessions}/4 sessões
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Task List */}
          <div className="h-full overflow-hidden">
            <TaskList />
          </div>
        </div>
      </div>
      
      {/* Footer - Fixed Position */}
      <Footer />
      
      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={{
          studyTime: settings.studyTime,
          soundEnabled: settings.soundEnabled
        }}
        onDurationChange={updateStudyTime}
        onSoundToggle={handleSoundToggle}
        onSave={handleSettingsSave}
        onResetStats={resetDailyStats}
      />
    </Layout>
  );
}

export default App;
