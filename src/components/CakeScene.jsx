import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { fadeIn, scaleIn, float, glowPulse, heartFloat } from '../motion/motion.service.js';
import AnimatedCake from './Cake.jsx';
import WishingCard from './WishingCard.jsx';
import DecorativeElements from './DecorativeElements.jsx';
import ConfettiCeleb from './ConfettiCeleb.jsx';


// TypingText component
const TypingText = ({ text, duration, delay = 0, className = "" }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, delay * 1000);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, (duration * 1000) / text.length);

    return () => clearTimeout(timer);
  }, [currentIndex, text, duration, isStarted]);

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          className="inline-block w-0.5 h-8 md:h-12 bg-gradient-to-b from-rose-400 to-pink-400 ml-1 rounded-full"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </span>
  );
};


const CakeScene = ({ onOpenCards, onGoToMoon }) => {
  const [hearts, setHearts] = useState([]);
  const [candleBlown, setCandleBlown] = useState(false);
  const [showWishingCard, setShowWishingCard] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Infinite hearts from center to random positions AFTER candle is blown (stop when wishing card shows)
  useEffect(() => {
    if (!candleBlown || showWishingCard) return;
    let heartId = 0;
    const interval = setInterval(() => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const newHeart = {
        id: heartId++,
        startX: centerX,
        startY: centerY,
        endX: Math.random() * window.innerWidth,
        endY: Math.random() * window.innerHeight,
        duration: 2 + Math.random() * 2,
        emoji: ['💕','🎉','🎀','💝' ,'💓','💖','💗'][Math.floor(Math.random() * 7)]
      };
      setHearts(prev => (prev.length > 60 ? [...prev.slice(30), newHeart] : [...prev, newHeart])); // Allow more hearts
    }, 150); // Faster interval for more hearts per second
    return () => clearInterval(interval);
  }, [candleBlown, showWishingCard]);

  // Show confetti when candle is blown
  useEffect(() => {
    if (!candleBlown) return;
    setShowConfetti(true);
    // Hide confetti after animation completes
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    return () => clearTimeout(confettiTimer);
  }, [candleBlown]);

  // Show wishing card 5 seconds after candle is blown
  useEffect(() => {
    if (!candleBlown) return;
    const timer = setTimeout(() => {
      setShowWishingCard(true);
    }, 5000); // Show card 5 seconds after candle is blown
    return () => clearTimeout(timer);
  }, [candleBlown]);
  
  return (
    <div className="min-h-screen w-full  bg-gradient-to-br from-pink-200 via-purple-100 to-rose-200 flex flex-col relative overflow-hidden px-4">
      {/* Decorative Elements */}
      <DecorativeElements isWishingCardVisible={showWishingCard} />
     <div
       className="flex flex-row gap-4"
       style={{
         marginTop: "20px",
         justifyContent: "start",
         alignItems: "start",
         marginLeft: "20px",
       }}
     >
      

       <button
         onClick={onOpenCards}
         
         className="relative flex items-center justify-center px-7 py-3 rounded-2xl bg-pink-200 shadow-md transition-all duration-300 cursor-pointer overflow-hidden group border-none focus:outline-none"
         style={{ minWidth: 140, minHeight: 56 }}
       >
         {/* Text */}
         <span
           className="absolute transition-all duration-300 text-pink-700 font-body text-lg z-10 group-hover:opacity-0 group-hover:translate-y-2"
           style={{ pointerEvents: "none", color: "#a259c9" }}
         >
           About You
         </span>
         {/* Letter Icon */}
         <span
           className="absolute opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-6 transition-all duration-300 z-10"
           style={{ pointerEvents: "none" }}
         >
           <svg viewBox="0 0 48 48" width="36" height="36" fill="none">
             <rect x="6" y="14" width="36" height="20" rx="5" fill="#fff" stroke="#e0a8c7" strokeWidth="2"/>
             <polygon points="6,14 24,28 42,14" fill="#f8e1e7" stroke="#e0a8c7" strokeWidth="2"/>
             <rect x="10" y="18" width="28" height="12" rx="2" fill="#fdf6f0" stroke="#e0a8c7" strokeWidth="1"/>
             <path d="M24 22 Q22 20 20 22 Q20 24 24 26 Q28 24 28 22 Q26 20 24 22 Z" fill="#ffb6d5" />
           </svg>
         </span>
         {/* Button background overlay for hover */}
         <span className="absolute inset-0 rounded-2xl transition-all duration-300 group-hover:bg-pink-300 group-hover:shadow-lg" aria-hidden="true"></span>
       </button>

       {/* See Your Moon Button */}
       <button
         onClick={onGoToMoon}
         className="relative flex items-center justify-center px-7 py-3 rounded-2xl bg-purple-100 shadow-md transition-all duration-300 cursor-pointer overflow-hidden group border-none focus:outline-none"
         style={{ minWidth: 160, minHeight: 56 }}
       >
         {/* Text */}
         <span
            className="absolute transition-all duration-300 text-purple-700 font-body text-lg z-10 group-hover:opacity-0 group-hover:translate-y-2"
           style={{ pointerEvents: "none", color: "#a259c9" }}
         >
           See Your Moon
         </span>
         {/* Moon Icon */}
         <span
           className="absolute opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-6 transition-all duration-300 z-10"
           style={{ pointerEvents: "none" }}
         >
           <text x="18" y="38" fontSize="28" textAnchor="middle" alignmentBaseline="middle">🌙</text>
         </span>
         {/* Button background overlay for hover */}
         <span className="absolute inset-0 rounded-2xl transition-all duration-300 group-hover:bg-purple-200 group-hover:shadow-lg" aria-hidden="true"></span>
       </button>
     </div>
      {/* Main content container */}
      <div className="flex-1 flex flex-col items-center justify-center h-full">
      {/* Hearts AFTER candle blow: spawn from center to random positions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-3xl"
            style={{
              left: heart.startX,
              top: heart.startY,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0.6, 1, 1, 0.9],
              x: heart.endX - heart.startX,
              y: heart.endY - heart.startY,
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: heart.duration || 3,
              delay: 0,
              ease: "easeInOut",
              times: [0, 0.3, 0.7, 1]
            }}
          >
            {heart.emoji}
          </motion.div>
        ))}
      </div>


     

      {/* Main content */}
      <div className=" flex flex-col items-center justify-center text-center gap-14 z-10 px-4 w-full max-w-6xl mx-auto">
        {/* Heading with typing animation */}
        <div className="flex flex-col items-center justify-center text-center px-4 w-full mx-auto mb-8">
          <TypingText 
            text="HAPPYY BIRTHDAYY! 🎂🎉" 
            duration={1.2}
            delay={3}
            className="text-5xl md:text-6xl font-heading font-extrabold text-pink-500  leading-tight tracking-tight"
          />

          <TypingText 
            text="
              Make a wish and blow out the candles! 🕯️💖" 
            duration={2}
            delay={5}
            className="font-body text-xl md:text-2xl leading-tight text-rose-500 mx-auto max-w-2xl mb-12"  
          />
       </div>

        <div className='flex flex-col items-center justify-center'>
          <AnimatedCake onCandleBlownOut={() => setCandleBlown(true)} />
        </div>

      </div>
      <motion.p
        className="font-body text-lg text-center text-purple-500 mt-8 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        May your every wish and dream come true! 💫
        <br />
        May you find happiness in everything 💕
      </motion.p>
      </div>

      {/* Confetti Celebration */}
      <ConfettiCeleb trigger={showConfetti} />

      {/* Wishing Card */}
      <WishingCard 
        isVisible={showWishingCard} 
        onClose={() => setShowWishingCard(false)} 
      />
    </div>
  );
};

export default CakeScene;
