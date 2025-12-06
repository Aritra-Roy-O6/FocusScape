import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { useStore } from '../store/useStore';

export function useAudio() {
  const { currentMood } = useStore();
  const soundRef = useRef(null);
  const currentTrackId = useRef(null);

  useEffect(() => {
    // 1. If there's music playing, fade it out
    if (soundRef.current) {
      soundRef.current.fade(0.5, 0, 1000); // Fade out over 1s
    }

    // 2. If the new mood has no track, stop here
    if (!currentMood.audio.track) return;

    // 3. Initialize the new sound
    const newSound = new Howl({
      src: [currentMood.audio.track],
      loop: true,
      volume: 0, // Start at 0 for fade-in
      html5: true,
      onloaderror: () => console.log('Audio file missing - skipping'),
    });

    // 4. Play and Fade In
    newSound.play();
    newSound.fade(0, 0.5, 2000); // Fade in to 50% volume over 2s

    // 5. Save reference
    soundRef.current = newSound;

    // Cleanup on unmount
    return () => {
      if (soundRef.current) soundRef.current.unload();
    };
  }, [currentMood.id]); // Re-run only when mood ID changes

  return null; // This hook doesn't render anything
}