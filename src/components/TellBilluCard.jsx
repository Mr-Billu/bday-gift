/* eslint-disable no-unused-vars */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GIFS } from "../gifs.js";
import { HER_NAME, MESSAGES } from "../messages.js";
import { notify, sendNtfy } from "../notify.js";
import OnlineGif from "./OnlineGif.jsx";
import FloatingDecor from "./FloatingDecor.jsx";

const CloseIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true" className="close-icon"><path d="M6 6 18 18M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;

export default function TellBilluCard({ isVisible, onClose }) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failure, setFailure] = useState(false);
  const [sentReplies, setSentReplies] = useState(new Set());
  const sendReply = (reply) => {
    if (sentReplies.has(reply)) return;
    setSentReplies((previous) => new Set(previous).add(reply));
    notify(`${HER_NAME} says: ${reply}`, `chip-${reply}`);
  };
  const sendMessage = async () => {
    const clean = message.trim();
    if (!clean || sending) return;
    setSending(true);
    setFailure(false);
    try {
      await sendNtfy(clean);
      setSent(true);
    } catch {
      setFailure(true);
    } finally {
      setSending(false);
    }
  };
  return <AnimatePresence>{isVisible && <motion.div className="popup-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="popup-shell">
      <FloatingDecor preset="tellBillu" />
      <motion.div className="popup-content-card popup-tell" initial={{ opacity: 0, y: 24, scale: .94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -24, scale: .94 }}>
        <button type="button" aria-label="Close" onClick={onClose} className="popup-close"><CloseIcon /></button>
        <OnlineGif src={GIFS.tellBillu} alt="A happy romantic animation" eager className="popup-gif" />
        <h2 className="popup-title popup-heading">{MESSAGES.tellHeading}</h2>
        <div className="quick-replies">{MESSAGES.quickReplies.map((reply) => <button type="button" key={reply} className="quick-reply" onClick={() => sendReply(reply)}>{reply}{sentReplies.has(reply) ? <svg viewBox="0 0 20 20" className="check-icon" aria-label="sent"><path d="m4 10 4 4 8-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg> : null}</button>)}</div>
        <label className="tell-label" htmlFor="billu-note">{MESSAGES.tellLabel}</label>
        <textarea id="billu-note" value={message} maxLength={1000} rows={4} placeholder={MESSAGES.tellPlaceholder} onChange={(event) => setMessage(event.target.value)} />
        {!sent ? <button type="button" className="rose-button send-button" disabled={!message.trim() || sending} onClick={sendMessage}>{sending ? MESSAGES.sending : MESSAGES.sendButton}</button> : <p className="success-message">{MESSAGES.tellSuccess}</p>}
        {failure && <p className="failure-message">{MESSAGES.tellFailure}</p>}
        {sent && <button type="button" className="soft-button" onClick={onClose}>{MESSAGES.close}</button>}
      </motion.div>
    </div>
  </motion.div>}</AnimatePresence>;
}
