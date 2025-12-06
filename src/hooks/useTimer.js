import { useState, useEffect, useRef } from 'react';

export function useTimer(initialMinutes = 25) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      countRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(countRef.current);
      // Play a bell sound here later
    }

    return () => clearInterval(countRef.current);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(initialMinutes * 60);
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progress = timeLeft / (initialMinutes * 60); // 1.0 to 0.0

  return { timeLeft, isActive, toggleTimer, resetTimer, formatTime, progress };
}