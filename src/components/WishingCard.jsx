import { motion, AnimatePresence } from "framer-motion";

const WishingCard = ({ isVisible, onClose }) => {
  const handleClose = () => {
    onClose();
  };
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-pink-100/40 via-rose-200/30 to-pink-300/40 backdrop-blur-[2px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.6, ease: "easeInOut" }
            }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundBlendMode: "lighten",
              pointerEvents: "auto",
            }}
          />

          {/* Close button */}
          <motion.button
            onClick={handleClose}
            className="absolute top-6 right-6 text-rose-600 hover:text-rose-800 transition z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg"
            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ 
              opacity: 0, 
              scale: 0.5, 
              rotate: 90,
              transition: { duration: 0.4, ease: "easeInOut" }
            }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-2xl font-bold">×</span>
          </motion.button>

          {/* Card */}
          <motion.div
            className="relative bg-rose-200 backdrop-blur-xl text-center w-[500px] h-[500px] flex flex-col justify-center item-center gap-6 shadow-xl rounded-3xl p-6"
            initial={{ opacity: 0, y: 50, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
            exit={{ 
              opacity: 0, 
              y: -100, 
              scale: 0.8, 
              rotateY: 15,
              rotateX: 10,
              transition: { 
                duration: 0.8, 
                ease: "easeInOut",
                times: [0, 0.3, 1]
              }
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Heading */}
            <h1 className="text-4xl font-bold text-rose-600 mb-10">
              Happyyyy Birthdayyy to youuu! 🎂✨🎉 
            </h1>
            <div className="flex flex-col items-center justify-center gap-6  mx-auto" >
            {/* First paragraph */}
            <p className="text-gray-600 leading-relaxed max-w-[380px] w-[350px] mx-auto mb-10 text-left ">
              Wishing you a day full of laughter, love, and endless surprises.
              May this new year of your life bring you joy, health, and success.
              Enjoy your special day to the fullest — you deserve it! 💖
            </p>

            {/* Second paragraph */}
            <p className="text-rose-500 leading-relaxed max-w-[380px] w-[350px] mx-auto text-left ml-10">
              I pray this year brings you endless joy, success in every dream
              you chase, and countless beautiful memories 🌸✨. You’re truly the
              most special person I’ve ever known, and I’ll always wish the
              absolute best for you 💕. Happiest Birthday once again,
              gorgeous! 🎂💖🎉
            </p></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WishingCard;
