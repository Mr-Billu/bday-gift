// Reusable Framer Motion variants for romantic animations

export const fadeIn = (direction = "up", delay = 0) => ({
  initial: {
    opacity: 0,
    y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
    x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: direction === "up" ? -60 : direction === "down" ? 60 : 0,
    x: direction === "left" ? -60 : direction === "right" ? 60 : 0,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
});

export const scaleIn = (delay = 0, scale = 0.8) => ({
  initial: {
    opacity: 0,
    scale,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
});

export const float = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const glowPulse = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(236, 72, 153, 0.3)",
      "0 0 40px rgba(236, 72, 153, 0.6)",
      "0 0 20px rgba(236, 72, 153, 0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const heartFloat = {
  animate: {
    y: [-5, 5, -5],
    rotate: [-2, 2, -2],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const twinkle = {
  animate: {
    opacity: [0.3, 1, 0.3],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const slideIn = (direction = "left", delay = 0) => ({
  initial: {
    opacity: 0,
    x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
    y: direction === "up" ? -100 : direction === "down" ? 100 : 0,
  },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut",
    },
  },
});

export const bounceIn = (delay = 0) => ({
  initial: {
    opacity: 0,
    scale: 0.3,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut",
      type: "spring",
      stiffness: 200,
      damping: 10,
    },
  },
});
