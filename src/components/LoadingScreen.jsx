/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import DecorativeElements from './DecorativeElements.jsx';
import OnlineGif from './OnlineGif.jsx';
import { GIFS } from '../gifs.js';
import { MESSAGES } from '../messages.js';

const LoadingScreen = ({ onStartLoading }) => {
  const [showQuestion, setShowQuestion] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showNoPopup, setShowNoPopup] = useState(false);
  const handleYes = () => { setShowQuestion(false); setShowLoading(true); setTimeout(() => onStartLoading(), 2000); };
  const handleNo = () => setShowNoPopup(true);
  return <div className="loading-screen fixed inset-0 z-50 flex items-center justify-center">
    <DecorativeElements />
    <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
      <AnimatePresence mode="wait">
        {showQuestion && <motion.div key="question" initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: .8, opacity: 0 }} transition={{ duration: .6, ease: "easeOut" }} className="flex flex-col items-center gap-8">
          <h2 className="loading-question">{MESSAGES.loadingQuestion}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button onClick={handleYes} className="solid-pink-button loading-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}>{MESSAGES.loadingYes}</motion.button>
            <motion.button onClick={handleNo} className="solid-gray-button loading-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}>{MESSAGES.loadingNo}</motion.button>
          </div>
        </motion.div>}
        {showLoading && <motion.div key="loading" initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: .8, opacity: 0 }} transition={{ duration: .6, ease: "easeOut" }} className="flex flex-col items-center gap-5">
          <OnlineGif src={GIFS.loading} alt="A cute loading animation" eager className="loading-gif" />
          <div><h2 className="loading-title">{MESSAGES.loadingHeading}</h2><p className="loading-subtitle">{MESSAGES.loadingSubheading}</p></div>
          <div className="heart-loader" />
        </motion.div>}
      </AnimatePresence>
      <AnimatePresence>{showNoPopup && <motion.div className="loading-no-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="loading-no-card" initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: .8, opacity: 0 }}><h3>{MESSAGES.loadingNoHeading}</h3><p>{MESSAGES.loadingNoBody}</p><motion.button onClick={() => setShowNoPopup(false)} className="solid-pink-button no-popup-button" whileHover={{ scale: 1.07 }} whileTap={{ scale: .96 }}>{MESSAGES.loadingNoButton}</motion.button></motion.div></motion.div>}</AnimatePresence>
    </div>
  </div>;
};

export default LoadingScreen;
