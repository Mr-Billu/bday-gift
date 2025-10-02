import React, { useState } from "react";

const SecretOverlay = ({ onClose }) => {
  const [secretStep, setSecretStep] = useState("password");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleProceed = () => {
    if (password === "ihatesummer") {
      setPasswordError("");
      setSecretStep("loading");
      setTimeout(() => setSecretStep("message"), 900);
    } else {
      setPasswordError("Wrong password");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60  backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col justify-center items-center bg-gradient-to-br from-card/98 to-card/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-romantic-purple/20"
        style={{
          boxShadow: "var(--romantic-glow)",
          width: "600px",
          height: "600px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full border border-romantic-purple/30 text-romantic-lavender hover:text-romantic-pink hover:border-romantic-pink/50 bg-white/5 hover:bg-white/10 transition"
          title="Close"
        >
          ×
        </button>
        {secretStep === "password" && (
          <div className="p-8 text-center flex flex-col justify-center items-center gap-8">
            <div className="mt-6 flex flex-col items-start gap-2 ml-12">
              <label className="font-body text-romantic-lavender text-sm font-medium">
                Youu know this
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
                className="w-[300px] rounded border border-romantic-purple/20 bg-white/10 text-romantic-pink px-4 py-3 outline-none"
                style={{ padding: "10px 20px" }}
              />
              {passwordError && (
                <span className="font-body text-rose-300 text-sm">
                  {passwordError}
                </span>
              )}
            </div>
            <div className="mt-2 flex justify-center">
              <button
                onClick={handleProceed}
                className="border-2 border-romantic-purple text-center bg-transparent text-white rounded-full transition-all duration-300 font-medium px-3 py-1.5"
              >
                Proceed
              </button>
            </div>
          </div>
        )}

        {secretStep === "loading" && (
          <div className="p-10 flex flex-col items-center justify-center gap-4 text-center relative">
            <div className="dots-loader absolute top-50" />
            <p className="font-body text-romantic-lavender w-[200px] absolute top-100">
              Preparing your secret...
            </p>
          </div>
        )}

        {secretStep === "message" && (
          <div className="p-8 text-center flex flex-col justify-center items-center bg-red max-w-7xl w-6xl ">
            <p className="font-body w-[500px] text-romantic-lavender text-lg leading-relaxed">
              Happpyy birthday meriii jannnnnn🎉🎂🥰 Wish you happpppeir
              birthday, May you succeed in every field of life May Allah protect
              you from evil eyes and harmful peoples.you are so 
              beautiful, amazing and carin and cute, you are the most pretty
              girl i have ever seen in my life, you have the beautiful smile in
              all over the worlds, you are the reason of my happiness, even when
              im at my lowest and in my dullest mood and moment when i think
              about you and see you , i literly become happy. i am so grateful
              to have you in my life, you not just a girl for me, you are my
              love, my peace, my babe,meri pyariii si jannn🎀, my
              everything 💖your smile it
              just lightens my world up, I LOVEEEE YOUUUUU SOOOO MUCHHHHHHH meri
              jannnnn🤎 im so in love with you, and once again Ifohh HAPPYYYYYY
              BIRTHDAYYYYYYY! may you have this year full of happiness and joy
              and wonderfull memories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecretOverlay;
