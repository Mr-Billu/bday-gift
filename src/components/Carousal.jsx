/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MESSAGES } from "../messages.js";
import { GIFS } from "../gifs.js";
import FloatingDecor from "./FloatingDecor.jsx";
import OnlineGif from "./OnlineGif.jsx";

const romanticCards = [
  { id: 2, emoji: "", message: "Your voice is my favorite sound. The way you talk, even about the smallest things, feels like music to me." },
  { id: 3, emoji: MESSAGES.carouselSparkle, message: "Your presence is peace. The moment you are near, my heart slows down and everything feels okay." },
  { id: 4, emoji: "", message: "You are beautiful in a way no camera can catch. It lives in your eyes, your grace and the way you carry yourself." },
  { id: 5, emoji: "", message: "Your laugh is contagious. One smile from you can fix my worst day in seconds." },
  { id: 6, emoji: "", message: "You care so deeply, even when nobody notices. That gentle heart of yours is the rarest thing I have ever seen." },
  { id: 7, emoji: "", message: "You are soft but so strong. I admire you more than you know, and I am proud of you every single day." },
  { id: 8, emoji: "", message: "The way you look at me makes me forget every worry. In your eyes, I found a home." },
  { id: 9, emoji: "", message: "Even your little quirks, the pouts and the silly moments, are my favorite parts of you." },
  { id: 10, emoji: "", message: "Out of everyone in the world, it was always you. It is you, and it will always be you for me. You are the girl I dreamed of and think of. I hope you know I care about you and want to give you all my love, and you deserve it." },
  { id: 11, emoji: "", message: "May Allah bless you with every happiness and protect you from every evil eye. You deserve the whole world, and I will spend my life trying to give you a piece of it." },
];

const ArrowIcon = ({ direction }) => <svg viewBox="0 0 24 24" className="arrow-icon" aria-hidden="true"><path d={direction === "left" ? "m14 5-7 7 7 7" : "m10 5 7 7-7 7"} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;

export default function LetterCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextCard = () => setCurrentIndex((prev) => (prev + 1) % romanticCards.length);
  const prevCard = () => setCurrentIndex((prev) => (prev - 1 + romanticCards.length) % romanticCards.length);
  useEffect(() => {
    const onKey = (event) => { if (event.key === "ArrowRight") nextCard(); if (event.key === "ArrowLeft") prevCard(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  const card = romanticCards[currentIndex];
  return <div className="carousel-screen"><FloatingDecor preset="aboutYou" /><div className="carousel-inner"><OnlineGif src={GIFS.aboutYou} alt="A romantic about you animation" eager className="carousel-gif" /><h2 className="carousel-heading">{MESSAGES.aboutHeading}</h2><div className="carousel-stage"><motion.button type="button" aria-label="Previous card" onClick={prevCard} className="carousel-arrow carousel-arrow-left"><ArrowIcon direction="left" /></motion.button><AnimatePresence mode="wait"><motion.div key={card.id} className={`carousel-card carousel-tint-${currentIndex % 4}`} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={.18} onDragEnd={(_, info) => { if (info.offset.x < -50) nextCard(); if (info.offset.x > 50) prevCard(); }} initial={{ opacity: 0, x: 40, scale: .96 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -40, scale: .96 }} transition={{ type: "spring", stiffness: 220, damping: 24 }}><div className="carousel-emoji">{card.emoji}</div><p>{card.message}</p></motion.div></AnimatePresence><motion.button type="button" aria-label="Next card" onClick={nextCard} className="carousel-arrow carousel-arrow-right"><ArrowIcon direction="right" /></motion.button></div><div className="carousel-controls"><span className="carousel-counter">{currentIndex + 1} / {romanticCards.length}</span><div className="carousel-dots">{romanticCards.map((item, index) => <button type="button" aria-label={`Go to card ${index + 1}`} key={item.id} onClick={() => setCurrentIndex(index)} className={index === currentIndex ? "active" : ""}><span /></button>)}</div></div></div></div>;
}
