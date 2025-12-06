import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { X } from 'lucide-react';

export default function FocusView() {
  const { setStatus, currentMood } = useStore();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // "Elite" ease curve
      className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl p-8"
    >
      {/* Glass Container */}
      <div className="w-full h-[60vh] rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Decorative Gradient Blob */}
        <div 
            className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 0%, ${currentMood.colors.primary}, transparent 70%)` }}
        />

        {/* Content */}
        <h1 className="text-6xl font-bold tracking-tighter mb-4">25:00</h1>
        <p className="text-theme-secondary text-lg uppercase tracking-widest opacity-80">Focus Mode Active</p>

        {/* Exit Button */}
        <button 
          onClick={() => setStatus('entry')}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors group"
        >
          <X className="w-6 h-6 text-white/50 group-hover:text-white" />
        </button>

      </div>
    </motion.div>
  );
}