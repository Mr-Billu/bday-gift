import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import LoadingScreen from './components/LoadingScreen';
import CakeScene from './components/CakeScene';
import Moonsection from './components/Moonsection';
import LetterCarousal from './components/Carousal'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentScene, setCurrentScene] = useState('cake');
  const [showModal, setShowModal] = useState(false);

  const handleStartLoading = () => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  const handleOpenCards = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGoToMoon = () => {
    setCurrentScene('moon');
  };

  const handleBackToCake = () => {
    setCurrentScene('cake');
  };

  return (
    <div className="relative min-h-screen w-full">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0
            }}
            transition={{ 
              duration: 0.8, 
              ease: "easeInOut" 
            }}
          >
            <LoadingScreen onStartLoading={handleStartLoading} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {currentScene === 'cake' && !isLoading && (
          <motion.div
            key="cake"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <CakeScene onOpenCards={handleOpenCards} onGoToMoon={handleGoToMoon} />
            
          </motion.div>
        )}
        
        {currentScene === 'moon' && !isLoading && (
          <motion.div
            key="moon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Moonsection onBackToCake={handleBackToCake} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <div onClick={e => e.stopPropagation()} className="relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-8 text-rose-500 cursor-pointer hover:text-rose-800 transition z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg"
                style={{ fontWeight: 'bold', fontSize: '2rem' }}
              >
                ×
              </button>
              <LetterCarousal />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;