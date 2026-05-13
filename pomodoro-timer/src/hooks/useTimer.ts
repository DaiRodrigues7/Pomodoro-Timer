import { useState, useEffect, useCallback } from 'react';

interface TimerState {
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  sessionCount: number;
  currentPhase: 'focus' | 'break';
  breakTimeLeft: number;
}

interface TimerSettings {
  studyTime: number; // in minutes
  soundEnabled: boolean;
}

interface DailyStats {
  date: string; // YYYY-MM-DD format
  completedSessions: number;
  totalFocusTime: number; // in seconds
}

// No interval table needed for single mode timer

const DEFAULT_SETTINGS: TimerSettings = {
  studyTime: 30, // 30 minutes
  soundEnabled: true,
};

// Magical Audio Notification System - Pre-loaded sounds
const magicalSounds = {
  timerStart: new Audio('https://cdn.freesound.org/previews/316/316920_5264474-lq.mp3'), // Magical activation sparkle
  cycleComplete: new Audio('https://cdn.freesound.org/previews/561/561965_11231843-lq.mp3'), // Celebratory magical flourish
};

// Set default volume to 50% for all sounds
Object.values(magicalSounds).forEach(audio => {
  audio.volume = 0.5;
  audio.preload = 'auto';
});

// Magical sound functions with error handling
const playMagicalSound = (soundType: keyof typeof magicalSounds, enabled: boolean) => {
  if (!enabled) return;
  
  try {
    const sound = magicalSounds[soundType];
    // Reset audio to start if it was played before
    sound.currentTime = 0;
    sound.play().catch(error => {
      console.log(`Failed to play ${soundType} sound:`, error);
      // Fallback: create a simple magical sound
      createFallbackMagicalSound(soundType);
    });
  } catch (error) {
    console.log(`Error playing ${soundType} sound:`, error);
    createFallbackMagicalSound(soundType);
  }
};

// Fallback magical sound generator
const createFallbackMagicalSound = (soundType: string) => {
  try {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    // Different frequencies for different magical effects
    switch (soundType) {
      case 'timerStart':
        oscillator.frequency.setValueAtTime(800, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, context.currentTime + 0.1);
        break;
      case 'cycleComplete':
        oscillator.frequency.setValueAtTime(600, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1000, context.currentTime + 0.3);
        break;
      default:
        oscillator.frequency.value = 800;
    }
    
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5);
    
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.5);
  } catch (error) {
    console.log('Fallback magical sound failed:', error);
  }
};

export const useTimer = () => {
  const [settings, setSettings] = useState<TimerSettings>(() => {
    const savedSettings = localStorage.getItem('pomodoro-settings');
    if (savedSettings) {
      try {
        return JSON.parse(savedSettings);
      } catch {
        // Fallback to default
      }
    }
    return DEFAULT_SETTINGS;
  });

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Load or initialize daily stats
  const [dailyStats, setDailyStats] = useState<DailyStats>(() => {
    const savedStats = localStorage.getItem('pomodoro-daily-stats');
    const today = getTodayDate();
    
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        // Reset if it's a new day
        if (parsed.date !== today) {
          return {
            date: today,
            completedSessions: 0,
            totalFocusTime: 0,
          };
        }
        return parsed;
      } catch {
        // Fallback to default
      }
    }
    
    return {
      date: today,
      completedSessions: 0,
      totalFocusTime: 0,
    };
  });

  const [timerState, setTimerState] = useState<TimerState>(() => {
    // Always start with fresh study time, not from saved state
    return {
      timeLeft: settings.studyTime * 60,
      totalTime: settings.studyTime * 60,
      isRunning: false,
      sessionCount: 0,
      currentPhase: 'focus',
      breakTimeLeft: 0,
    };
  });

  const updateSettings = useCallback((newSettings: Partial<TimerSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('pomodoro-settings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateStudyTime = useCallback((minutes: number) => {
    updateSettings({ studyTime: minutes });
    // Reset timer with new time if not running
    setTimerState(prev => ({
      ...prev,
      timeLeft: minutes * 60,
      isRunning: false,
    }));
  }, [updateSettings]);

  const toggleTimer = useCallback(() => {
    setTimerState(prev => {
      if (prev.isRunning) {
        // Pausing timer
        return {
          ...prev,
          isRunning: false,
        };
      } else {
        // Starting timer - only if not in finished state
        if (prev.timeLeft >= settings.studyTime * 60) {
          // Ready to start fresh session
          playMagicalSound('timerStart', settings.soundEnabled);
          return {
            ...prev,
            isRunning: true,
          };
        } else if (prev.timeLeft <= 0) {
          // Timer was finished, reset to full time
          return {
            ...prev,
            timeLeft: settings.studyTime * 60,
            totalTime: settings.studyTime * 60,
            isRunning: false, // Don't auto-start
            currentPhase: 'focus',
            breakTimeLeft: 0,
          };
        } else {
          // Resume from where we left off
          playMagicalSound('timerStart', settings.soundEnabled);
          return {
            ...prev,
            isRunning: true,
          };
        }
      }
    });
  }, [settings.studyTime]);

  const resetTimer = useCallback(() => {
    setTimerState({
      timeLeft: settings.studyTime * 60,
      totalTime: settings.studyTime * 60,
      isRunning: false,
      sessionCount: timerState.sessionCount,
      currentPhase: 'focus',
      breakTimeLeft: 0,
    });
  }, [settings.studyTime, timerState.sessionCount]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // No interval configuration needed for single mode timer

  // Timer countdown logic - NO BREAKS, SIMPLE COUNTDOWN ONLY
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerState.isRunning) {
      interval = setInterval(() => {
        setTimerState(prev => {
          // If timer is already finished and stopped, don't process
          if (prev.timeLeft <= 0 && !prev.isRunning) {
            return prev;
          }
          
          // ONLY FOCUS PHASE - NO BREAKS ALLOWED
          if (prev.currentPhase === 'focus') {
            // Check for cycle completion - when time reaches 00:00
            if (prev.timeLeft <= 1) {
              // Play completion sound
              playMagicalSound('cycleComplete', settings.soundEnabled);
              
              // Update stats
              const focusTimeCompleted = prev.totalTime;
              setDailyStats(current => {
                const updated = {
                  ...current,
                  completedSessions: current.completedSessions + 1,
                  totalFocusTime: current.totalFocusTime + focusTimeCompleted,
                };
                localStorage.setItem('pomodoro-daily-stats', JSON.stringify(updated));
                return updated;
              });
              
              // COMPLETE STOP - reset to default time and STOP
              return {
                timeLeft: settings.studyTime * 60,
                totalTime: settings.studyTime * 60,
                isRunning: false, // FORCE COMPLETE STOP
                sessionCount: prev.sessionCount + 1,
                currentPhase: 'focus',
                breakTimeLeft: 0,
              };
            }
            
            // Normal countdown - just decrease time
            return {
              ...prev,
              timeLeft: Math.max(0, prev.timeLeft - 1),
            };
          }
          
          // If somehow we get to break phase (shouldn't happen), force back to focus
          return {
            ...prev,
            currentPhase: 'focus',
            breakTimeLeft: 0,
            isRunning: false,
          };
        });
      }, 1000);
    }
    
    // Cleanup interval
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timerState.isRunning, settings.soundEnabled, settings.studyTime]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pomodoro-timer-state', JSON.stringify({
      timeLeft: timerState.timeLeft,
      totalTime: timerState.totalTime,
      sessionCount: timerState.sessionCount,
      currentPhase: timerState.currentPhase,
      breakTimeLeft: timerState.breakTimeLeft,
    }));
  }, [timerState.timeLeft, timerState.totalTime, timerState.sessionCount, timerState.currentPhase, timerState.breakTimeLeft]);

  // Update browser tab title
  useEffect(() => {
    const phaseText = timerState.currentPhase === 'focus' ? 'Foco' : 'Pausa';
    const timeText = timerState.currentPhase === 'focus' 
      ? formatTime(timerState.timeLeft)
      : formatTime(timerState.breakTimeLeft);
    document.title = `Solune | ${timeText} - ${phaseText}`;
  }, [timerState.timeLeft, timerState.breakTimeLeft, timerState.currentPhase, formatTime]);

  // Reset daily stats function
  const resetDailyStats = useCallback(() => {
    const today = getTodayDate();
    const newStats = {
      date: today,
      completedSessions: 0,
      totalFocusTime: 0,
    };
    setDailyStats(newStats);
    localStorage.setItem('pomodoro-daily-stats', JSON.stringify(newStats));
  }, []);

  return {
    timeLeft: timerState.timeLeft,
    totalTime: timerState.totalTime,
    isRunning: timerState.isRunning,
    sessionCount: timerState.sessionCount,
    currentPhase: timerState.currentPhase,
    breakTimeLeft: timerState.breakTimeLeft,
    dailyStats,
    settings,
    toggleTimer,
    resetTimer,
    formatTime,
    updateStudyTime,
    updateSettings,
    resetDailyStats,
  };
};
