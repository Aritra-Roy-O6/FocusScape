import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useTimer } from '../../hooks/useTimer';
import { useStore } from '../../store/useStore';

export default function FocusTimer() {
  const { currentMood } = useStore();
  const { timeLeft, isActive, toggleTimer, resetTimer, formatTime, progress } = useTimer(25);

  // SVG Config
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center relative z-20">
      
      {/* TIMER RING CONTAINER */}
      <div className="relative w-80 h-80 flex items-center justify-center mb-8">
        
        {/* SVG Circle */}
        <svg className="absolute w-full h-full transform -rotate-90">
          {/* Background Track */}
          <circle
            cx="50%" cy="50%" r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Animated Progress Ring */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "linear" }}
            cx="50%" cy="50%" r={radius}
            stroke={currentMood.colors.primary}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeLinecap="round"
          />
        </svg>

        {/* Digital Time Display */}
        <div className="text-center">
          <motion.h1 
            key={timeLeft}
            initial={{ y: 5, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-7xl font-bold tracking-tighter tabular-nums"
          >
            {formatTime()}
          </motion.h1>
          <p className="text-theme-secondary text-sm uppercase tracking-widest mt-2 font-semibold opacity-80">
            {isActive ? 'Focusing...' : 'Ready'}
          </p>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTimer}
          className="group relative px-8 py-3 rounded-full font-medium transition-all hover:scale-105 active:scale-95 overflow-hidden"
          style={{ background: currentMood.colors.primary, color: '#000' }}
        >
          <div className="flex items-center gap-2 relative z-10">
            {isActive ? <Pause size={20} /> : <Play size={20} fill="black" />}
            <span>{isActive ? 'Pause' : 'Start Focus'}</span>
          </div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>

        <button 
          onClick={resetTimer}
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/70 hover:text-white"
        >
          <RotateCcw size={20} />
        </button>
      </div>

    </div>
  );
}