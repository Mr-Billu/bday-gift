/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "framer-motion";
import { GIFS } from "../gifs.js";
import { MESSAGES } from "../messages.js";
import FloatingDecor from "./FloatingDecor.jsx";
import OnlineGif from "./OnlineGif.jsx";

const CloseIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true" className="close-icon"><path d="M6 6 18 18M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;

export default function ClosingCard({ isVisible, onClose }) {
  return <AnimatePresence>{isVisible && <motion.div className="popup-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
    <div className="popup-shell" onClick={onClose}>
      <FloatingDecor preset="closing" />
      <motion.div className="popup-content-card popup-closing" initial={{ opacity: 0, y: 24, scale: .94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -24, scale: .94 }}>
        <button type="button" aria-label="Close" onClick={onClose} className="popup-close"><CloseIcon /></button>
        <OnlineGif src={GIFS.closing} alt="A calm loving animation" eager className="popup-gif" />
        <h2 className="popup-title popup-heading">{MESSAGES.closingHeading}</h2>
        <p className="popup-copy">{MESSAGES.closingBody}</p>
        <button type="button" className="soft-button" onClick={onClose}>{MESSAGES.close}</button>
      </motion.div>
    </div>
  </motion.div>}</AnimatePresence>;
}
