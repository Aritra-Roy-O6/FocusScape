import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { X } from 'lucide-react';
import FocusTimer from '../ui/FocusTimer';
import MusicPill from '../overlay/MusicPill';
import AIOrb from '../overlay/AIOrb'; // Import AI
import ExitOverlay from '../overlay/ExitOverlay'; // Import Exit

export default function FocusView() {
  const { setStatus, currentMood } = useStore();
  const [showExit, setShowExit] = useState(false); // Local state for exit modal

  const handleExitConfirm = () => {
    setShowExit(false);
    setStatus('entry'); // Actually leave now
  };

  return (
    <>
      <AnimatePresence>
        {showExit && <ExitOverlay onConfirm={handleExitConfirm} />}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl p-8"
      >
        <div className="w-full md:w-[600px] min-h-[500px] rounded-3xl bg-black/20 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
          
          <div 
              className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 0%, ${currentMood.colors.primary}, transparent 70%)` }}
          />

          <FocusTimer />

          {/* Trigger Exit Overlay instead of direct leave */}
          <button 
            onClick={() => setShowExit(true)}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors group"
          >
            <X className="w-6 h-6 text-white/50 group-hover:text-white" />
          </button>

        </div>
      </motion.div>

      {/* Floating Elements */}
      <MusicPill />
      <AIOrb />
    </>
  );
}