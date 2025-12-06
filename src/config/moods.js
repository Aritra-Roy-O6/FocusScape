// src/config/moods.js

export const MOODS = {
  chill: {
    id: 'chill',
    label: 'Chill',
    colors: {
      primary: '#60A5FA', // Blue-400
      secondary: '#93C5FD',
      bg: '#0F172A',      // Slate-900
      text: '#F8FAFC'
    },
    audio: { track: '/sounds/lofi-chill.mp3', nature: '/sounds/wind.mp3' }
  },
  rain: {
    id: 'rain',
    label: 'Rain',
    colors: {
      primary: '#818CF8', // Indigo
      secondary: '#A5B4FC',
      bg: '#1e1b4b',      // Indigo-950
      text: '#E0E7FF'
    },
    audio: { track: '/sounds/soft-piano.mp3', nature: '/sounds/rain.mp3' }
  },
  warm: { 
    id: 'warm', 
    label: 'Warm', 
    colors: { primary: '#F59E0B', secondary: '#FCD34D', bg: '#451a03', text: '#FFFBEB' }, 
    audio: { track: '', nature: '' }
  },
  fluff: { 
    id: 'fluff', 
    label: 'Fluff', 
    colors: { primary: '#F472B6', secondary: '#FBCFE8', bg: '#831843', text: '#FDF2F8' }, 
    audio: { track: '', nature: '' }
  },
  grind: { 
    id: 'grind', 
    label: 'Grind', 
    colors: { primary: '#10B981', secondary: '#6EE7B7', bg: '#022c22', text: '#ECFDF5' }, 
    audio: { track: '', nature: '' }
  },
  thunder: { 
    id: 'thunder', 
    label: 'Thunder', 
    colors: { primary: '#94A3B8', secondary: '#CBD5E1', bg: '#020617', text: '#F1F5F9' }, 
    audio: { track: '', nature: '' }
  },
  christmas: { 
    id: 'christmas', 
    label: 'Xmas', 
    colors: { primary: '#EF4444', secondary: '#FCA5A5', bg: '#450a0a', text: '#FEF2F2' }, 
    audio: { track: '', nature: '' }
  },
};