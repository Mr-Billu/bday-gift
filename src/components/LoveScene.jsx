/* eslint-disable no-unused-vars */
import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { GIFS } from "../gifs.js";
import { HER_NAME, MESSAGES } from "../messages.js";
import { notify } from "../notify.js";
import FloatingDecor from "./FloatingDecor.jsx";
import OnlineGif from "./OnlineGif.jsx";
import DodgeButton from "./DodgeButton.jsx";
import TellBilluCard from "./TellBilluCard.jsx";
import ClosingCard from "./ClosingCard.jsx";

const HeartIcon = () => <svg viewBox="0 0 24 24" className="heart-icon" aria-hidden="true"><path d="M12 20.2S3.8 15.1 3.8 9.3C3.8 5.9 8 4.5 12 8.3c4-3.8 8.2-2.4 8.2 1 0 5.8-8.2 10.9-8.2 10.9Z" fill="currentColor" /></svg>;

const Flower = ({ type }) => {
  const colors = { rose: "#e97893", tulip: "#f3a0ac", daisy: "#fff5d8", blossom: "#f4b6c8", petal: "#ec839e", heart: "#e86482" };
  const color = colors[type] || colors.petal;
  return <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden="true"><path d="M20 19v21" stroke="#8b6a60" strokeWidth="2"/><path d="M20 30c-5-5-9-2-10 0 4 3 8 3 10 0Zm0-3c5-5 9-2 10 0-4 3-8 3-10 0Z" fill="#9abf83"/>{type === "heart" ? <path d="M20 20S7 12 10 6c2-3 6-2 10 2 4-4 8-5 10-2 3 6-10 14-10 14Z" fill={color}/> : <><circle cx="12" cy="13" r="7" fill={color}/><circle cx="28" cy="13" r="7" fill={color}/><circle cx="20" cy="9" r="7" fill={color}/><circle cx="20" cy="16" r="5" fill="#f4c56b"/></>}</svg>;
};

function FallingFlowers() {
  const flowers = useMemo(() => Array.from({ length: window.innerWidth < 640 ? 22 : 45 }, (_, index) => ({ id: index, left: `${Math.random() * 100}%`, size: 16 + Math.random() * 22, duration: 6 + Math.random() * 7, delay: Math.random() * 4, sway: 20 + Math.random() * 60, type: ["rose", "tulip", "daisy", "blossom", "petal", "heart"][index % 6] })), []);
  return <div className="falling-flowers" aria-hidden="true">{flowers.map((flower) => <motion.span key={flower.id} className="absolute top-[-8vh]" style={{ left: flower.left, width: flower.size, height: flower.size }} initial={{ y: "-10vh", rotate: 0, opacity: 0 }} animate={{ y: "118vh", x: [-flower.sway, flower.sway, -flower.sway], rotate: [0, 180, 360], opacity: [0, 1, 1, 0] }} transition={{ duration: flower.duration, delay: flower.delay, repeat: Infinity, ease: "linear" }}><Flower type={flower.type} /></motion.span>)}</div>;
}

const stickers = [
  { key: "cheekKiss1", className: "sticker-one" },
  { key: "cheekKiss2", className: "sticker-two" },
  { key: "cheekKiss3", className: "sticker-three" },
];

export default function LoveScene({ onBackToCake }) {
  const [finale, setFinale] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [surpriseReady, setSurpriseReady] = useState(false);
  const [showTell, setShowTell] = useState(false);
  const [showClosing, setShowClosing] = useState(false);
  const loveRef = useRef(null);

  const pressLove = (event) => {
    if (finale) return;
    const heart = confetti.shapeFromPath({ path: "M 0 10 C -18 -4 -24 -20 -12 -24 C -5 -27 0 -20 0 -16 C 0 -20 5 -27 12 -24 C 24 -20 18 -4 0 10 Z" });
    const rect = event.currentTarget.getBoundingClientRect();
    confetti({ particleCount: 90, spread: 75, origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight }, shapes: [heart], scalar: 1.1, colors: ["#e97893", "#ef476f", "#b8325d"] });
    notify(`${HER_NAME} says: I love you too`, "love-button");
    setFinale(true);
  };

  const revealSurprise = (event) => {
    event.stopPropagation();
    notify(`${HER_NAME} pressed What`, "surprise-what");
    setShowSurprise(true);
    window.setTimeout(() => setSurpriseReady(true), 400);
  };

  const closeSurprise = () => {
    if (!surpriseReady) return;
    setShowSurprise(false);
    window.setTimeout(() => setShowTell(true), 700);
  };

  const closeTell = () => {
    setShowTell(false);
    window.setTimeout(() => setShowClosing(true), 700);
  };

  return <main className={`love-screen relative min-h-[100dvh] overflow-hidden px-5 py-10 safe-area ${finale ? "is-finale" : ""}`}>
    <FloatingDecor preset={finale ? "finale" : "loveScene"} />
    {finale && <FallingFlowers />}
    {!finale && stickers.map((sticker) => <OnlineGif key={sticker.key} src={GIFS[sticker.key]} alt="A cute cheek kiss" className={`screen-sticker ${sticker.className}`} />)}
    {finale && <><OnlineGif src={GIFS.cheekKiss1} alt="A cute cheek kiss" className="screen-sticker sticker-one" /><OnlineGif src={GIFS.cheekKiss2} alt="A cute cheek kiss" className="screen-sticker sticker-two" /><OnlineGif src={GIFS.cheekKiss3} alt="A cute cheek kiss" className="screen-sticker sticker-three" /><OnlineGif src={GIFS.finaleLove} alt="A cute love animation" className="screen-sticker finale-love" /><OnlineGif src={GIFS.finaleGift} alt="A cute gift animation" className="screen-sticker finale-gift" /></>}
    <AnimatePresence mode="wait">
      {!finale ? <motion.section key="love" className="love-stage" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }}><OnlineGif src={GIFS.loveSmall1} alt="A romantic love animation" className="popup-gif" /><h1 className="script-title love-heading">{MESSAGES.loveHeading}</h1><p className="script-title love-subheading">{MESSAGES.loveSubheading}</p><div className="popup-actions love-actions"><DodgeButton labels={MESSAGES.loveDodgeLabels} otherButtonRef={loveRef} className="dodge-button" /><motion.button ref={loveRef} onClick={pressLove} className="rose-button love-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}><HeartIcon />{MESSAGES.loveButton}</motion.button></div></motion.section> : <motion.section key="finale" className="finale-stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div className="finale-card"><button type="button" className="finale-close soft-button" onClick={onBackToCake}>{MESSAGES.close}</button><h1 className="popup-title popup-heading">{MESSAGES.finaleHeading}</h1><p className="popup-copy">{MESSAGES.finaleBody}</p><p className="script-title finale-line">{MESSAGES.finaleBigLine}</p><div className="surprise-card"><OnlineGif src={GIFS.finaleGift} alt="A small gift animation" className="surprise-gif" /><p>{MESSAGES.surprise}</p><button type="button" className="soft-button" onClick={revealSurprise}>What?</button></div></div></motion.section>}
    </AnimatePresence>
    <AnimatePresence>{showSurprise && <motion.div className="surprise-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeSurprise}><motion.div className="surprise-card surprise-reveal-card" initial={{ scale: .92, y: 18 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .92, y: 18 }}><OnlineGif src={GIFS.finaleGift} alt="A small gift animation" className="surprise-gif" /><p>{MESSAGES.surpriseReveal}</p><p className="popup-hint">{MESSAGES.surpriseHint}</p></motion.div></motion.div>}</AnimatePresence>
    <TellBilluCard isVisible={showTell} onClose={closeTell} />
    <ClosingCard isVisible={showClosing} onClose={() => setShowClosing(false)} />
  </main>;
}
