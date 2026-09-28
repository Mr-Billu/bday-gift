const birthday = "\u{1F382}";
const party = "\u{1F389}";
const balloon = "\u{1F388}";
const gift = "\u{1F381}";
const sparkle = "\u{2728}";
const bow = "\u{1F380}";
const pleading = "\u{1F97A}";
const pray = "\u{1F64F}";
const bouquet = "\u{1F490}";
const heart = "\u{1F49C}";
const blueHeart = "\u{1F499}";
const kiss = "\u{1F618}";
const heartEyes = "\u{1F60D}";
const doubleHeart = "\u{1F495}";
const heartPulse = "\u{1F497}";
const growingHeart = "\u{1F497}";
const hearts = "\u{1F496}";
const flowers = "\u{1F338}";
const rose = "\u{1F339}";
const blossom = "\u{1F33A}";
const tulip = "\u{1F337}";
const moon = "\u{1F319}";
const star = "\u{2B50}";
const letter = "\u{1F48C}";

export const LOADING_DECOR = [
  { glyph: "\u{1F98B}", top: "15%", left: "10%" },
  { glyph: flowers, top: "25%", right: "15%" },
  { glyph: bow, top: "60%", left: "8%" },
  { glyph: blossom, top: "40%", right: "12%" },
  { glyph: "\u{1F33B}", bottom: "20%", right: "20%" },
  { glyph: tulip, top: "70%", left: "25%" },
];

export const DECOR = {
  popupBirthday: [
    { glyph: birthday, top: "-4%", left: "-5%", size: 38, delay: 0, duration: 4, motion: "float", mobile: true },
    { glyph: party, top: "-3%", right: "-4%", size: 34, delay: 1.2, duration: 5, motion: "wobble", mobile: true },
    { glyph: balloon, top: "44%", left: "-7%", size: 32, delay: 0.5, duration: 6, motion: "drift", mobile: true },
    { glyph: gift, bottom: "3%", right: "-5%", size: 34, delay: 2, duration: 5, motion: "float", mobile: true },
    { glyph: sparkle, top: "6%", left: "45%", size: 26, delay: 0.8, duration: 3, motion: "pulse", mobile: true },
    { glyph: bow, bottom: "4%", left: "5%", size: 28, delay: 1.6, duration: 6, motion: "wobble", mobile: false },
    { glyph: "\u{1F973}", top: "45%", right: "-6%", size: 30, delay: 2.5, duration: 5, motion: "drift", mobile: false },
    { sticker: "birthdaySmall", bottom: "-8%", left: "-4%", size: 76, delay: 1.4, duration: 5, motion: "wobble", mobile: true },
  ],
  popupSorry: [
    { glyph: pleading, top: "-4%", right: "-5%", size: 36, delay: 0.4, duration: 5, motion: "float", mobile: true },
    { glyph: pray, top: "43%", left: "-7%", size: 32, delay: 1.3, duration: 6, motion: "wobble", mobile: true },
    { glyph: bouquet, bottom: "3%", left: "-4%", size: 34, delay: 2, duration: 5, motion: "drift", mobile: true },
    { glyph: heart, top: "-8%", left: "43%", size: 28, delay: 0.8, duration: 4, motion: "float", mobile: false },
    { glyph: rose, top: "44%", right: "-7%", size: 30, delay: 2.5, duration: 6, motion: "wobble", mobile: false },
    { glyph: "\u{1F98D}", bottom: "5%", right: "-4%", size: 28, delay: 1.6, duration: 5, motion: "pulse", mobile: true },
    { sticker: "sorrySmall", top: "-3%", left: "-5%", size: 76, delay: 0.7, duration: 5, motion: "float", mobile: true },
    { sticker: "sorryRomantic", bottom: "-5%", right: "-4%", size: 70, delay: 1.5, duration: 5, motion: "wobble", mobile: true },
  ],
  loveScene: [
    { glyph: kiss, top: "8%", left: "5%", size: 30, delay: 0, duration: 5, motion: "float", mobile: true },
    { glyph: doubleHeart, top: "10%", right: "7%", size: 32, delay: 1.2, duration: 6, motion: "wobble", mobile: true },
    { glyph: blueHeart, top: "45%", left: "4%", size: 28, delay: 2, duration: 5, motion: "drift", mobile: false },
    { glyph: heartEyes, top: "43%", right: "5%", size: 30, delay: 0.6, duration: 4, motion: "pulse", mobile: true },
    { glyph: heartPulse, bottom: "11%", left: "8%", size: 28, delay: 1.8, duration: 7, motion: "float", mobile: false },
    { glyph: hearts, bottom: "10%", right: "7%", size: 34, delay: 2.7, duration: 5, motion: "wobble", mobile: true },
    { glyph: growingHeart, top: "7%", left: "47%", size: 24, delay: 1, duration: 4, motion: "pulse", mobile: false },
    { sticker: "loveSmall1", top: "14%", right: "18%", size: 72, delay: 0.4, duration: 6, motion: "float", mobile: true },
    { sticker: "loveSmall2", bottom: "15%", left: "18%", size: 72, delay: 1.6, duration: 5, motion: "wobble", mobile: true },
  ],
  finale: [
    { glyph: flowers, top: "10%", left: "4%", size: 30, delay: 0.2, duration: 5, motion: "float", mobile: true },
    { glyph: tulip, top: "28%", left: "7%", size: 36, delay: 1, duration: 6, motion: "wobble", mobile: true },
    { glyph: rose, top: "52%", left: "3%", size: 30, delay: 2, duration: 5, motion: "drift", mobile: false },
    { glyph: hearts, bottom: "13%", left: "8%", size: 32, delay: 1.5, duration: 7, motion: "pulse", mobile: true },
    { glyph: sparkle, top: "6%", right: "5%", size: 26, delay: 0.8, duration: 4, motion: "pulse", mobile: true },
    { glyph: gift, top: "33%", right: "6%", size: 34, delay: 2.4, duration: 6, motion: "float", mobile: true },
    { glyph: "\u{1F970}", top: "57%", right: "3%", size: 30, delay: 0.4, duration: 5, motion: "wobble", mobile: false },
    { glyph: "\u{1F4AB}", bottom: "15%", right: "8%", size: 30, delay: 2.8, duration: 6, motion: "drift", mobile: true },
    { sticker: "finaleSmall", bottom: "3%", left: "47%", size: 80, delay: 1.2, duration: 5, motion: "pulse", mobile: true },
  ],
  tellBillu: [
    { glyph: hearts, top: "5%", left: "5%", size: 30, delay: 0, duration: 5, motion: "float", mobile: true },
    { glyph: letter, top: "12%", right: "6%", size: 28, delay: 1, duration: 5, motion: "wobble", mobile: true },
    { glyph: sparkle, bottom: "10%", left: "7%", size: 26, delay: 1.8, duration: 4, motion: "pulse", mobile: true },
    { glyph: flowers, bottom: "8%", right: "8%", size: 28, delay: 2.5, duration: 6, motion: "drift", mobile: false },
  ],
  closing: [
    { glyph: blossom, top: "6%", left: "5%", size: 30, delay: 0.4, duration: 5, motion: "float", mobile: true },
    { glyph: sparkle, top: "8%", right: "7%", size: 26, delay: 1.2, duration: 4, motion: "pulse", mobile: true },
    { glyph: heart, bottom: "10%", left: "8%", size: 30, delay: 2, duration: 5, motion: "wobble", mobile: true },
    { glyph: moon, bottom: "8%", right: "7%", size: 28, delay: 2.8, duration: 6, motion: "drift", mobile: false },
    { glyph: star, top: "42%", right: "4%", size: 24, delay: 1.6, duration: 4, motion: "pulse", mobile: true },
  ],
  aboutYou: [
    { glyph: hearts, top: "8%", left: "4%", size: 28, delay: 0.2, duration: 5, motion: "float", mobile: true },
    { glyph: sparkle, top: "10%", right: "5%", size: 24, delay: 1.1, duration: 4, motion: "pulse", mobile: true },
    { glyph: flowers, bottom: "8%", left: "6%", size: 28, delay: 1.8, duration: 5, motion: "wobble", mobile: true },
    { glyph: rose, bottom: "9%", right: "6%", size: 28, delay: 2.4, duration: 6, motion: "drift", mobile: false },
  ],
};
