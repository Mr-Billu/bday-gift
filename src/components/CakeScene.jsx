/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import AnimatedCake from './Cake.jsx';
import WishingCard from './WishingCard.jsx';
import DecorativeElements from './DecorativeElements.jsx';
import ConfettiCeleb from './ConfettiCeleb.jsx';
import ApologyCard from './ApologyCard.jsx';
import { notify } from '../notify.js';
import { HER_NAME, MESSAGES, CAKE_HEARTS } from '../messages.js';

const TypingText = ({ text, duration, delay = 0, className = "" }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setIsStarted(true), delay * 1000);
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

  return <span className={className}>{displayedText}{currentIndex < text.length && <motion.span className="inline-block w-0.5 h-8 md:h-12 bg-rose-400 ml-1 rounded-full" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />}</span>;
};

const CakeScene = ({ onOpenCards, onForgiven, showCandle = true }) => {
  const [hearts, setHearts] = useState([]);
  const [candleBlown, setCandleBlown] = useState(false);
  const [showWishingCard, setShowWishingCard] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showApologyCard, setShowApologyCard] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);

  useEffect(() => {
    if (!candleBlown || showWishingCard) return;
    let heartId = 0;
    const interval = setInterval(() => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const newHeart = { id: heartId++, startX: centerX, startY: centerY, endX: Math.random() * window.innerWidth, endY: Math.random() * window.innerHeight, duration: 2 + Math.random() * 2, emoji: CAKE_HEARTS[Math.floor(Math.random() * CAKE_HEARTS.length)] };
      setHearts(prev => (prev.length > 60 ? [...prev.slice(30), newHeart] : [...prev, newHeart]));
    }, 150);
    return () => clearInterval(interval);
  }, [candleBlown, showWishingCard]);

  useEffect(() => {
    if (!candleBlown) return;
    setShowConfetti(true);
    const confettiTimer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(confettiTimer);
  }, [candleBlown]);

  useEffect(() => {
    if (!candleBlown) return;
    const timer = setTimeout(() => setShowWishingCard(true), 5000);
    return () => clearTimeout(timer);
  }, [candleBlown]);

  return (
    <div className="cake-screen h-[100dvh] w-full flex flex-col relative overflow-hidden px-4">
      <DecorativeElements isWishingCardVisible={showWishingCard} />
      <div className="flex flex-row flex-wrap gap-3 p-2 sm:gap-4 sm:p-5">
        <button onClick={onOpenCards} className="relative flex min-h-14 min-w-[120px] shrink items-center justify-center whitespace-nowrap rounded-2xl bg-pink-200 px-[22px] py-3 shadow-md transition-all duration-300 cursor-pointer overflow-hidden group border-none focus:outline-none">
          <span className="absolute transition-all duration-300 text-pink-700 font-body text-lg z-10 group-hover:opacity-0 group-hover:translate-y-2" style={{ pointerEvents: "none", color: "#a259c9" }}>About You</span>
          <span className="absolute opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-6 transition-all duration-300 z-10" style={{ pointerEvents: "none" }}><svg viewBox="0 0 48 48" width="36" height="36" fill="none"><rect x="6" y="14" width="36" height="20" rx="5" fill="#fff" stroke="#e0a8c7" strokeWidth="2"/><polygon points="6,14 24,28 42,14" fill="#f8e1e7" stroke="#e0a8c7" strokeWidth="2"/><rect x="10" y="18" width="28" height="12" rx="2" fill="#fdf6f0" stroke="#e0a8c7" strokeWidth="1"/><path d="M24 22 Q22 20 20 22 Q20 24 24 26 Q28 24 28 22 Q26 20 24 22 Z" fill="#ffb6d5" /></svg></span>
          <span className="absolute inset-0 rounded-2xl transition-all duration-300 group-hover:bg-pink-300 group-hover:shadow-lg" aria-hidden="true" />
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center h-full">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {hearts.map((heart) => <motion.div key={heart.id} className="absolute text-3xl" style={{ left: heart.startX, top: heart.startY }} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.9], x: heart.endX - heart.startX, y: heart.endY - heart.startY, rotate: [0, 10, -10, 0] }} transition={{ duration: heart.duration || 3, ease: "easeInOut", times: [0, 0.3, 0.7, 1] }}>{heart.emoji}</motion.div>)}
        </div>
        <div className="flex flex-col items-center justify-center text-center gap-8 sm:gap-14 z-10 px-4 w-full max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center px-4 w-full mx-auto mb-4 sm:mb-8">
            <TypingText text={MESSAGES.cakeHeading} duration={1.2} delay={3} className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-pink-500 leading-tight tracking-tight" />
            <TypingText text={MESSAGES.cakeWish} duration={2} delay={5} className="font-body text-lg sm:text-xl md:text-2xl leading-tight text-rose-500 mx-auto max-w-2xl mb-6 sm:mb-12" />
          </div>
          <div className={`cake-wrapper flex flex-col items-center justify-center ${showCandle ? "" : "cake-without-candle"}`} style={{ transform: "translateY(clamp(-64px, -6dvh, -24px))" }}><AnimatedCake onCandleBlownOut={() => { setCandleBlown(true); notify(`${HER_NAME} blew out the candles`, "candle-blown"); }} /></div>
        </div>
        <motion.p className="font-body text-base sm:text-lg text-center text-purple-500 mt-6 sm:mt-8 italic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>{MESSAGES.cakeDream}<br />{MESSAGES.cakeHappiness}</motion.p>
      </div>
      <ConfettiCeleb trigger={showConfetti} />
      <WishingCard isVisible={showWishingCard} onClose={() => { setShowWishingCard(false); setTimeout(() => setShowApologyCard(true), 700); }} />
      <ApologyCard isVisible={showApologyCard} onForgiven={onForgiven} dodgeCount={dodgeCount} onDodged={setDodgeCount} />
    </div>
  );
};

export default CakeScene;
