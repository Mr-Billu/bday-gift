/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GIFS } from "../gifs.js";
import { HER_NAME, MESSAGES } from "../messages.js";
import { notify } from "../notify.js";
import FloatingDecor from "./FloatingDecor.jsx";
import OnlineGif from "./OnlineGif.jsx";
import DodgeButton from "./DodgeButton.jsx";

const CloseIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true" className="close-icon"><path d="M6 6 18 18M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;

export default function ApologyCard({ isVisible, onForgiven }) {
  const closed = useRef(false);
  const forgiveRef = useRef(null);
  const forgive = () => {
    if (closed.current) return;
    closed.current = true;
    notify(`${HER_NAME} forgave you`, "forgiven");
    setTimeout(() => onForgiven?.(), 500);
  };
  return <AnimatePresence>{isVisible && <motion.div className="popup-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="popup-shell">
      <FloatingDecor preset="popupSorry" />
      <motion.div className="popup-content-card popup-sorry" initial={{ opacity: 0, y: 32, scale: .92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -30, scale: .92 }}>
        <OnlineGif src={GIFS.sorry} alt="A cute apology" eager className="popup-gif" />
        <OnlineGif src={GIFS.sorryRomantic} alt="A romantic sticker" eager className="sorry-romantic-gif" />
        <h2 className="popup-title popup-heading">{MESSAGES.apologyHeading}</h2>
        <p className="popup-copy">{MESSAGES.apologyBody}</p>
        <div className="popup-actions popup-button-row">
          <motion.button ref={forgiveRef} type="button" onClick={forgive} className="rose-button pulse-button">{MESSAGES.forgive}</motion.button>
          <DodgeButton labels={MESSAGES.apologyDodgeLabels} otherButtonRef={forgiveRef} className="dodge-button" />
        </div>
      </motion.div>
    </div>
  </motion.div>}</AnimatePresence>;
}
