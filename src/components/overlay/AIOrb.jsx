import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

const SAMPLE_RESPONSES = [
  "You're doing great. Deep breath.",
  "Focus is a muscle. You're building it right now.",
  "Just 5 more minutes. You got this.",
  "Drink some water and reset your posture.",
];

export default function AIOrb() {
  const { currentMood } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hi! Need a nudge?", sender: 'ai' }]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const handleAsk = (text) => {
    // 1. User Message
    setMessages(prev => [...prev, { text, sender: 'user' }]);
    
    // 2. Simulate AI thinking
    setIsTyping(true);
    setTimeout(() => {
        setIsTyping(false);
        const randomResponse = SAMPLE_RESPONSES[Math.floor(Math.random() * SAMPLE_RESPONSES.length)];
        setMessages(prev => [...prev, { text: randomResponse, sender: 'ai' }]);
    }, 1500);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      
      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-72 h-80 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                <span className="text-xs font-bold tracking-widest uppercase text-theme-secondary">Companion</span>
                <button onClick={() => setIsOpen(false)}><X size={14} /></button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3" ref={scrollRef}>
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-2 rounded-lg text-sm max-w-[80%] ${m.sender === 'user' ? 'bg-white/10 text-white' : 'bg-theme-primary text-black'}`}>
                            {m.text}
                        </div>
                    </div>
                ))}
                {isTyping && <div className="text-xs text-white/50 animate-pulse">Thinking...</div>}
            </div>

            {/* Quick Prompts */}
            <div className="p-3 border-t border-white/10 grid grid-cols-2 gap-2">
                <button onClick={() => handleAsk("Motivate me")} className="text-xs p-2 bg-white/5 hover:bg-white/10 rounded text-left">Motivate me</button>
                <button onClick={() => handleAsk("Quick Tip")} className="text-xs p-2 bg-white/5 hover:bg-white/10 rounded text-left">Quick Tip</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE ORB BUTTON */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] relative group"
        style={{ background: currentMood.colors.bg }} // Dark center
      >
        {/* Glowing Border/Ring */}
        <div 
            className="absolute inset-0 rounded-full border-2 opacity-50 group-hover:opacity-100 transition-opacity animate-pulse"
            style={{ borderColor: currentMood.colors.primary }}
        />
        
        <Sparkles size={24} style={{ color: currentMood.colors.primary }} />
      </motion.button>
    </div>
  );
}