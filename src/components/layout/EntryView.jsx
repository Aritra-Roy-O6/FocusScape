import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { MOODS } from '../../config/moods';

export default function EntryView() {
  const { setMood, setStatus, currentMood } = useStore();

  const handleMoodSelect = (moodId) => {
    setMood(moodId);   // 1. Change the color theme
    setStatus('focus'); // 2. Transition the view
  };

  // Stagger animation for bubbles
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const bubbleVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
      className="relative z-10 flex flex-col items-center justify-center max-w-5xl mx-auto px-6"
    >
      <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-center">
        How do you want to <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary">
          feel right now?
        </span>
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        {Object.values(MOODS).map((mood) => (
          <motion.button
            key={mood.id}
            variants={bubbleVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMoodSelect(mood.id)}
            className="group relative flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-500 hover:border-theme-primary/50 hover:bg-white/10"
          >
            {/* Glowing ring on hover */}
            <div 
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, ${mood.colors.primary}, transparent)` }}
            />
            
            <span className="text-lg font-medium relative z-10" style={{ color: currentMood.id === mood.id ? 'white' : '#cbd5e1' }}>
                {mood.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}