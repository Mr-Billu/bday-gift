/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { GIFS } from "../gifs.js";
import { HER_NAME, MESSAGES } from "../messages.js";
import { notify } from "../notify.js";
import FloatingDecor from "./FloatingDecor.jsx";
import OnlineGif from "./OnlineGif.jsx";

const CloseIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true" className="close-icon"><path d="M6 6 18 18M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;

export default function WishingCard({ isVisible, onClose }) {
  const close = () => {
    if (window.getSelection?.().toString()) return;
    notify(`${HER_NAME} read your birthday wish`, "birthday-popup");
    onClose?.();
  };
  return <AnimatePresence>{isVisible && <motion.div className="popup-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
    <div className="popup-shell" onClick={close}>
      <FloatingDecor preset="popupBirthday" />
      <motion.div className="popup-content-card popup-birthday" initial={{ opacity: 0, y: 42, scale: .92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -30, scale: .92 }} onClick={close}>
        <button type="button" aria-label="Close" onClick={close} className="popup-close"><CloseIcon /></button>
        <OnlineGif src={GIFS.birthday} alt="A cute birthday animation" eager className="popup-gif" />
        <h2 className="popup-title popup-heading">{MESSAGES.birthdayHeading}</h2>
        <p className="popup-copy">{MESSAGES.birthdayBody}</p>
        <p className="popup-signoff">{MESSAGES.birthdaySignoff}</p>
        <p className="popup-hint">{MESSAGES.birthdayHint}</p>
      </motion.div>
    </div>
  </motion.div>}</AnimatePresence>;
}
