import { useState, useEffect } from 'react';
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CakeScene from './components/CakeScene';
import LetterCarousal from './components/Carousal';
import LoveScene from './components/LoveScene.jsx';
import { GIFS } from './gifs.js';
import { notify, openedMessage } from './notify.js';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentScene, setCurrentScene] = useState('cake');
  const [showModal, setShowModal] = useState(false);
  const [showCandle, setShowCandle] = useState(true);
  const handleStartLoading = () => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  };
  const handleCloseModal = () => {
    if (window.getSelection?.().toString()) return;
    setShowModal(false);
  };
  useEffect(() => { if (!isLoading) notify(openedMessage, "opened"); }, [isLoading]);
  useEffect(() => {
    if (isLoading) return;
    Object.values(GIFS).forEach((src) => { if (src) { const image = new Image(); image.src = src; } });
  }, [isLoading]);
  return <div className="relative min-h-screen w-full">
    <AnimatePresence>{isLoading && <motion.div key="loading" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .8, ease: "easeInOut" }}><LoadingScreen onStartLoading={handleStartLoading} /></motion.div>}</AnimatePresence>
    <AnimatePresence mode="wait">
      {currentScene === 'cake' && !isLoading && <motion.div key="cake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .8, ease: "easeOut" }}><CakeScene showCandle={showCandle} onOpenCards={() => setShowModal(true)} onForgiven={() => setCurrentScene('love')} /></motion.div>}
      {currentScene === 'love' && !isLoading && <motion.div key="love" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .8, ease: "easeOut" }}><LoveScene onBackToCake={() => { setShowCandle(false); setCurrentScene('cake'); }} /></motion.div>}
    </AnimatePresence>
    <AnimatePresence>{showModal && <motion.div className="about-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseModal}><div onClick={(event) => event.stopPropagation()} className="about-modal-shell"><button onClick={handleCloseModal} aria-label="Close" className="about-close"><svg viewBox="0 0 24 24" aria-hidden="true" className="close-icon"><path d="M6 6 18 18M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></button><LetterCarousal /></div></motion.div>}</AnimatePresence>
  </div>;
}

export default App;
