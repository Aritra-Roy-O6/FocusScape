import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useStore } from './store/useStore';
import { useAudio } from './hooks/useAudio'; // Import Audio Hook
import EntryView from './components/layout/EntryView';
import FocusView from './components/layout/FocusView';
import ParticleBackground from './components/ui/ParticleBackground'; // Import Particles

function App() {
  const { currentMood, status } = useStore();
  
  // 1. Initialize Audio Engine
  useAudio(); 

  // Inject colors into CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', currentMood.colors.primary);
    root.style.setProperty('--color-secondary', currentMood.colors.secondary);
    root.style.setProperty('--color-bg', currentMood.colors.bg);
    root.style.setProperty('--color-text', currentMood.colors.text);
  }, [currentMood]);

  return (
    <div className="relative min-h-screen w-full bg-theme-bg text-theme-text transition-colors duration-1000 ease-in-out flex flex-col items-center justify-center overflow-hidden">
      
      {/* 2. Add Particles Layer (Behind everything) */}
      <ParticleBackground />

      {/* Background Gradient */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none transition-all duration-1000"
        style={{ 
            background: `radial-gradient(circle at 50% 50%, ${currentMood.colors.primary}20, transparent 80%)` 
        }}
      />

      {/* Main Content */}
      <AnimatePresence mode='wait'>
        {status === 'entry' && <EntryView key="entry" />}
        {status === 'focus' && <FocusView key="focus" />}
      </AnimatePresence>

    </div>
  );
}

export default App;