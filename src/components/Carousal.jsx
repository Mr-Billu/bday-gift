import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LetterCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const romanticCards = [
    {
      id: 1,
      emoji: "🎂💝",
      message:
        "Happy Birthday! 💖 Another year, another reason to celebrate how wonderful you are. May your days be filled with peace, love, and endless happiness. I hope every dream you carry finds its way to reality, and that your smile always shines brighter than any candle."
    },
    {
      id: 2,
      emoji: "🦋💓",
      message:
        "Your heart is pure, your kindness endless 🤲💓. The way you care shows how rare and beautiful your soul is. I pray Allah protects you from every evil eye, surrounds you with good people, and blesses you with a life full of ease and light."
    },
    {
      id: 3,
      emoji: "✨🌹",
      message:
        "Your beauty is something words can barely hold ✨. It’s in your eyes that sparkle like stars, in your smile that makes everything lighter, and in the way you just exist with so much grace. You’re proof that perfection doesn’t need to be loud it’s simply you🤭."
    },
    {
      id: 4,
      emoji: "🎀💗",
      message:
        "You’re the definition of adorable 💗🦋. Every little expression, every laugh, every gesture — it’s impossible not to notice. You have this natural cuteness that makes the world softer, and I can’t imagine anyone not smiling when they think of you."
    },
    {
      id: 5,
      emoji: "💞🌸",
      message:
        "There’s something flawless about the way you are 🌸💞. Strong but gentle, beautiful inside and out, confident yet humble. You’re not just amazing — you’re unforgettable. The kind of perfection people spend their lives searching for."
    },
    {
      id: 6,
      emoji: "🤭💕",
      message:
        "Your presence feels like sunshine 🤎. Just the thought of you makes everything brighter, and the memory of your smile is enough to turn any moment into joy. You’re special in a way that no one else could ever be."
    },
    {
      id: 7,
      emoji: "🤍🥰",
      message:
        "Every time I think of you, I feel proud 💗🌙. Proud of your strength, your grace, and the way you shine without even realizing it. May you always find success in everything you do, and may Allah keep your heart at peace, your smile protected, and your journey blessed."
    }
  ];
  
  
  const nextCard = () => {
    setCurrentIndex((prev) =>
      prev === romanticCards.length - 1 ? 0 : prev + 1
    );
  };

  const prevCard = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? romanticCards.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center p-8 bg-gradient-to-br from-pink-100/80 via-rose-200/80 to-pink-300/80">
      <div className="relative w-full flex flex-col items-center">
        {/* Navigation Buttons */}
        <motion.button
          onClick={prevCard}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border border-rose-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ left: 400, marginLeft: 0 , cursor:'pointer' }}
        >
          <span className="text-2xl text-rose-500">←</span>
        </motion.button>

        <motion.button
          onClick={nextCard}
          className="absolute right-200 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border border-rose-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ right: 400, marginRight: 0,cursor:'pointer' }}
        >
          <span className="text-2xl text-rose-500">→</span>
        </motion.button>

        {/* Cards Container */}
        <div className="relative overflow-hidden flex justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={romanticCards[currentIndex].id}
              className="w-[500px] h-[500px] bg-gradient-to-br from-rose-100/80 via-rose-200/80 to-rose-300/80  backdrop-blur-xl rounded-3xl p-8 shadow-romantic flex flex-col justify-center items-center  relative mx-auto"
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ 
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1]
              }}
              style={{ backgroundColor: "rgba(244, 63, 94, 0.80)", gap: '40px'}} 
            >
              <div className="absolute top-6 left-6 text-4xl opacity-90">
                {romanticCards[currentIndex].emoji}
              </div>

              <div className="flex flex-col justify-center text-center max-w-[380px]" >
              <p className="text-lg font-body text-center leading-relaxed" style={{ color: '#be185d', opacity: 1 }}>
                {romanticCards[currentIndex].message}
              </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-1 mt-8  absolute bottom-0 left-1/2 transform -translate-x-1/2"
        style={{ bottom: '-30px' }}
        >
          {romanticCards.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full border-2  transition-all duration-500 ${
                currentIndex === index
                  ? "bg-rose-500 border-rose-600 shadow-lg"
                  : "bg-white/80 border-rose-300 hover:bg-rose-200 hover:border-rose-400"
              }`}
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ 
                scale: currentIndex === index ? 1.2 : 1,
                opacity: currentIndex === index ? 1 : 0.7,
                x: 0
              }}
              whileHover={{ 
                scale: currentIndex === index ? 1.3 : 1.1,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                duration: 0.5
              }}
              style={{ 
                boxShadow: currentIndex === index 
                  ? "0 4px 12px rgba(244, 63, 94, 0.4)" 
                  : "0 2px 6px rgba(244, 63, 94, 0.2)"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LetterCarousel;