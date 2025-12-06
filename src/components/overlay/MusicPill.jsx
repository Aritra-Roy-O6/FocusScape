import React, { useState } from 'react';
import { Music, Volume2 } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function MusicPill() {
  const { currentMood } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`fixed bottom-8 left-8 z-50 flex items-center transition-all duration-500 ${isOpen ? 'w-80' : 'w-14'}`}>
      
      {/* The Container */}
      <div className="relative w-full h-14 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center shadow-2xl overflow-hidden">
        
        {/* Icon / Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute left-0 w-14 h-14 flex items-center justify-center text-white/80 hover:text-white z-20"
        >
          <Music size={20} />
        </button>

        {/* Expanded Content */}
        <div className={`flex-1 pl-14 pr-4 flex items-center gap-3 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <input 
              type="text" 
              placeholder="Paste YouTube Link..." 
              className="bg-transparent text-sm border-none outline-none text-white w-full placeholder-white/30"
            />
            <Volume2 size={16} className="text-white/50" />
        </div>

        {/* Glow behind the icon */}
        <div 
          className="absolute left-0 w-14 h-14 rounded-full opacity-20 pointer-events-none"
          style={{ background: currentMood.colors.primary, filter: 'blur(10px)' }}
        />
      </div>
    </div>
  );
}