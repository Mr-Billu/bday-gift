// src/components/RocketCelebration.jsx
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function RocketCelebration({ trigger = false }) {
  const controls = useAnimation();

  useEffect(() => {
    if (!trigger) return;
    // start rocket animation
    controls.start({
      x: [ -200, 0, 200, 800 ],
      y: [ 400, 200, 100, -200 ],
      rotate: [ -10, 0, 10, 20 ],
      scale: [0.6, 1, 0.9, 1.2],
      transition: { duration: 2.2, ease: "easeInOut" },
    });

    // Multiple dense confetti bursts when rocket reaches top-ish
    setTimeout(async () => {
      try {
        const confetti = (await import("canvas-confetti")).default;
        
        // First burst - center
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { x: 0.5, y: 0.3 },
          colors: ['#ff7ab6', '#7c5cff', '#ffcf69', '#ff8ab6', '#ff6b9d', '#a259c9']
        });
        
        // Second burst - left side
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 50,
            origin: { x: 0.3, y: 0.4 },
            colors: ['#ff7ab6', '#7c5cff', '#ffcf69', '#ff8ab6', '#ff6b9d', '#a259c9']
          });
        }, 200);
        
        // Third burst - right side
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 50,
            origin: { x: 0.7, y: 0.4 },
            colors: ['#ff7ab6', '#7c5cff', '#ffcf69', '#ff8ab6', '#ff6b9d', '#a259c9']
          });
        }, 400);
        
        // Fourth burst - top center
        setTimeout(() => {
          confetti({
            particleCount: 120,
            spread: 60,
            origin: { x: 0.5, y: 0.2 },
            colors: ['#ff7ab6', '#7c5cff', '#ffcf69', '#ff8ab6', '#ff6b9d', '#a259c9']
          });
        }, 600);
        
        // Final burst - wide spread
        setTimeout(() => {
          confetti({
            particleCount: 200,
            spread: 100,
            origin: { x: 0.5, y: 0.3 },
            colors: ['#ff7ab6', '#7c5cff', '#ffcf69', '#ff8ab6', '#ff6b9d', '#a259c9']
          });
        }, 800);
        
      } catch (error) {
        console.log("Confetti not available:", error);
      }
    }, 1400);
  }, [trigger, controls]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-visible">
      <motion.div
        animate={controls}
        initial={{ x: -200, y: 400, opacity: 0 }}
        style={{ originX: 0.5, originY: 0.5 }}
        className="absolute"
      >
        {/* Decorative SVG rocket (simple, stylized) */}
        <svg width="90" height="120" viewBox="0 0 90 120" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0" x2="1"><stop offset="0" stopColor="#ff7ab6"/><stop offset="1" stopColor="#7c5cff"/></linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* rocket body */}
          <g filter="url(#glow)">
            <ellipse cx="45" cy="70" rx="22" ry="45" fill="url(#g1)"/>
            <rect x="32" y="20" width="26" height="50" rx="12" fill="#fff" opacity="0.12"/>
            {/* window */}
            <circle cx="45" cy="62" r="8" fill="#fff" opacity="0.9"/>
            {/* fins */}
            <path d="M25 90 L8 110 L30 98 Z" fill="#ff8ab6"/>
            <path d="M65 90 L82 110 L60 98 Z" fill="#ff8ab6"/>
            {/* flame (decorative) */}
            <g transform="translate(45,110)">
              <ellipse cx="0" cy="0" rx="12" ry="20" fill="#ffcf69" opacity="0.9" />
            </g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
