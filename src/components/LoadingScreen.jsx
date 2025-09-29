import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import DecorativeElements from './DecorativeElements.jsx';

const LoadingScreen = ({ onStartLoading }) => {
  const [showQuestion, setShowQuestion] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showNoPopup, setShowNoPopup] = useState(false);

  const handleYes = () => {
    setShowQuestion(false);
    setShowLoading(true);
    // Start the actual loading after a short delay
    setTimeout(() => {
      onStartLoading();
    }, 2000);
  };

  const handleNo = () => {
    setShowNoPopup(true);
  };

  const handleNoPopupClose = () => {
    setShowNoPopup(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/80 via-rose-50/90 to-purple-100/80 backdrop-blur-md"></div>
      
      {/* Decorative Elements */}
      <DecorativeElements />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <AnimatePresence mode="wait">
          {/* Question Screen */}
          {showQuestion && (
            <motion.div
              key="question"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center gap-8"
            >
              <h2 className="text-4xl md:text-6xl font-heading text-pink-600 font-bold drop-shadow-lg">
                Wanna see something special? 👀 
              </h2>
              
              <div className="flex gap-6">
                <motion.button
                  onClick={handleYes}
                  className="px-8 py-4 w-[150px] h-[50px] bg-gradient-to-r from-pink-400 to-rose-400 text-white font-body font-semibold text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Yes! 💖
                </motion.button>
                
                <motion.button
                  onClick={handleNo}
                  className="px-8 py-4 w-[150px] h-[50px] bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 font-body font-semibold text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  No 😔
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Loading Screen */}
          {showLoading && (
            <motion.div
              key="loading"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center gap-8"
            >
              <div className="mb-12">
                <h2 className="text-responsive-xl font-heading text-pink-600 font-bold drop-shadow-lg">
                  Please Wait
                </h2>
                <p className="text-responsive-lg font-body text-pink-500 font-medium mt-2 flex items-center justify-center gap-2">
                  Something special is loading...
                  <span className="heart-beat text-pink-400">🤭</span>
                </p>
              </div>

              <div className="heart-loader"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Popup */}
        <AnimatePresence>
          {showNoPopup && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
              <motion.div
                className="relative bg-white/40 rounded-3xl flex flex-col items-center justify-center gap-2 max-w-2xl w-full mx-4 text-center shadow-2xl backdrop-blur-xl backdrop-saturate-150"
                style={{
                  padding: "2.5rem 1.5rem",
                  minWidth: "300px",
                  minHeight: "220px",
                  border: "none",
                  boxShadow: "0 8px 40px 0 rgba(232, 121, 193, 0.18), 0 1.5px 8px 0 rgba(232, 121, 193, 0.10)",
                  background: "rgba(255,255,255,0.35)",
                  
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <h3 className="text-3xl font-heading text-pink-800 font-bold mb-6">
                  No, you have to see this! 😊
                </h3>
                <p className="text-xl font-body text-rose-600 mb-10">
                  This is something really special made just for you! 🤭💕
                </p>
                <motion.button
                  onClick={handleNoPopupClose}
                  className="px-12 py-4 w-[250px] h-[52px] bg-gradient-to-r from-pink-400 to-rose-400 text-white font-body font-semibold text-2xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Okay, let's see it! ✨
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoadingScreen;