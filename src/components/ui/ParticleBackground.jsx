import React, { useRef, useEffect } from 'react';
import { useStore } from '../../store/useStore';

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const { currentMood } = useStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // --- CONFIGURATION BASED ON MOOD ---
    const getMoodConfig = () => {
      switch(currentMood.id) {
        case 'rain':
        case 'thunder':
          return { count: 100, speedY: 15, speedX: 0, color: '160, 174, 192', type: 'rain' };
        case 'christmas':
          return { count: 50, speedY: 2, speedX: 1, color: '255, 255, 255', type: 'snow' };
        case 'grind':
           return { count: 30, speedY: -1, speedX: 0, color: '16, 185, 129', type: 'embers' }; // Rising green code
        default: 
          // Chill/Warm/Fluff = Floating dust
          return { count: 40, speedY: 0.5, speedX: 0.5, color: '255, 255, 255', type: 'float' };
      }
    };

    const config = getMoodConfig();

    // --- RESIZE HANDLER ---
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial call

    // --- PARTICLE CLASS ---
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * config.speedX;
        this.speedY = (Math.random() + 0.5) * config.speedY;
        this.opacity = Math.random() * 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
      }

      draw() {
        ctx.fillStyle = `rgba(${config.color}, ${this.opacity})`;
        ctx.beginPath();
        
        if (config.type === 'rain') {
          ctx.rect(this.x, this.y, 1, 15); // Rain drop shape
        } else {
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Circle
        }
        
        ctx.fill();
      }
    }

    // --- INIT PARTICLES ---
    for (let i = 0; i < config.count; i++) {
      particles.push(new Particle());
    }

    // --- ANIMATION LOOP ---
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentMood.id]); // Re-run when mood changes

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-60"
    />
  );
}