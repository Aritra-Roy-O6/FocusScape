import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { CheckCircle } from 'lucide-react';

export default function ExitOverlay({ onConfirm }) {
  const { currentMood } = useStore();

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
    >
        <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-[#0f172a] border border-white/10 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
        >
            {/* Glow effect */}
            <div className="absolute top-0 left-0 w-full h-2" style={{ background: currentMood.colors.primary }} />

            <div className="mx-auto w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <CheckCircle size={32} style={{ color: currentMood.colors.primary }} />
            </div>

            <h2 className="text-2xl font-bold mb-2">Session Complete</h2>
            <p className="text-gray-400 mb-8">
                "Productivity is never an accident. It is always the result of a commitment to excellence."
            </p>

            <button 
                onClick={onConfirm}
                className="w-full py-3 rounded-lg font-medium transition-transform active:scale-95"
                style={{ background: currentMood.colors.primary, color: '#000' }}
            >
                Return to Home
            </button>

        </motion.div>
    </motion.div>
  );
}