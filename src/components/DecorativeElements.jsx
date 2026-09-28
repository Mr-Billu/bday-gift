/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { LOADING_DECOR } from '../decor.js';

const DecorativeElements = ({ isWishingCardVisible = false }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {LOADING_DECOR.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-50"
          style={{ top: element.top, left: element.left, right: element.right, bottom: element.bottom }}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={isWishingCardVisible ? { opacity: 0.3, scale: 1, rotate: 0, y: 0 } : { opacity: 0.5, scale: [1, 1.2, 1], rotate: [0, 5, -5, 0], y: 0 }}
          transition={isWishingCardVisible ? {
            opacity: { duration: 0.3, ease: "easeOut" },
            scale: { duration: 0.3, ease: "easeOut" },
            rotate: { duration: 0.3, ease: "easeOut" },
            y: { duration: 0.3, ease: "easeOut" },
          } : {
            opacity: { duration: 1, delay: index * 0.3, ease: "easeOut" },
            scale: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 + 1 },
            rotate: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 + 1 },
            y: { duration: 0.8, delay: index * 0.3, ease: "easeOut" },
          }}
        >
          {element.glyph}
        </motion.div>
      ))}
    </div>
  );
};

export default DecorativeElements;
