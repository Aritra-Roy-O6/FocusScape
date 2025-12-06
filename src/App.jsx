import React, { useEffect } from 'react';
import { useStore } from './store/useStore';
import { MOODS } from './config/moods';

function App() {
  const { currentMood, setMood } = useStore();

  // THE MAGIC: Inject colors into CSS variables whenever mood changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', currentMood.colors.primary);
    root.style.setProperty('--color-secondary', currentMood.colors.secondary);
    root.style.setProperty('--color-bg', currentMood.colors.bg);
    root.style.setProperty('--color-text', currentMood.colors.text);
  }, [currentMood]);

  return (
    <div className="min-h-screen w-full bg-theme-bg text-theme-text transition-colors duration-1000 ease-in-out flex flex-col items-center justify-center">
      
      {/* Temporary Debug UI */}
      <h1 className="text-4xl font-bold mb-8 tracking-tighter">FOCUSSCAPE</h1>
      
      <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl text-center">
        <p className="mb-4 text-theme-secondary uppercase tracking-widest text-xs font-bold">Current Mood</p>
        <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-primary)' }}>{currentMood.label}</h2>
        
        <div className="flex gap-2 flex-wrap justify-center max-w-md">
          {Object.values(MOODS).map((mood) => (
            <button
              key={mood.id}
              onClick={() => setMood(mood.id)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
              style={{ 
                backgroundColor: currentMood.id === mood.id ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                color: currentMood.id === mood.id ? '#000' : 'inherit'
              }}
            >
              {mood.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;