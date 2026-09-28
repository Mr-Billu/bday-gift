/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { DECOR } from "../decor.js";
import { GIFS } from "../gifs.js";
import OnlineGif from "./OnlineGif.jsx";

const motionValues = {
  float: { y: [-5, 5, -5] },
  wobble: { rotate: [-5, 5, -5] },
  drift: { x: [-4, 5, -4], y: [3, -4, 3] },
  pulse: { scale: [0.9, 1.05, 0.9] },
};

export default function FloatingDecor({ preset }) {
  const items = DECOR[preset] || [];
  return (
    <div className={`floating-decor floating-decor-${preset}`} aria-hidden="true">
      {items.map((item, index) => {
        const style = {
          top: item.top,
          left: item.left,
          right: item.right,
          bottom: item.bottom,
          "--decor-size": `clamp(${Math.max(20, item.size - 8)}px, ${item.size / 4}vw, ${item.size + 8}px)`,
        };
        return (
          <motion.span
            key={`${preset}-${index}`}
            className={`floating-decor-item ${item.sticker ? "floating-sticker" : ""}`}
            style={style}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.92, ...motionValues[item.motion] }}
            transition={{
              opacity: { duration: 0.6, delay: item.delay },
              default: { duration: item.duration, delay: item.delay, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            {item.sticker ? <OnlineGif src={GIFS[item.sticker]} alt="" className="h-[clamp(56px,12vw,96px)] w-[clamp(56px,12vw,96px)]" /> : item.glyph}
          </motion.span>
        );
      })}
    </div>
  );
}
