// src/store/useStore.js
import { create } from 'zustand';
import { MOODS } from '../config/moods';

export const useStore = create((set) => ({
  currentMood: MOODS.chill,
  status: 'entry', // 'entry' | 'focus'
  
  setMood: (id) => set({ currentMood: MOODS[id] }),
  setStatus: (status) => set({ status }),
}));