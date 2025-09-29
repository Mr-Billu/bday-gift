import { useEffect, useRef, useState } from "react";
import "./candle.css";

export default function Candle({ onBlownOut }) {
  const [isLit, setIsLit] = useState(true);
  const hasNotifiedRef = useRef(false);

  useEffect(() => {
    let audioContext, analyser, dataArray;

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      const mic = audioContext.createMediaStreamSource(stream);
      mic.connect(analyser);
      dataArray = new Uint8Array(analyser.fftSize);

      const detectBlow = () => {
        analyser.getByteTimeDomainData(dataArray);
        let maxVolume = Math.max(...dataArray);

        // Tune this threshold by testing
        if (maxVolume > 250) {
          setIsLit(false);
          if (!hasNotifiedRef.current && typeof onBlownOut === 'function') {
            hasNotifiedRef.current = true;
            onBlownOut();
          }
        }
        requestAnimationFrame(detectBlow);
      };

      detectBlow();
    });
  }, []);

  return (
    <div className="flex flex-col items-center mt-20">
      {isLit ? (
        <div className="candle">
          <div className="flame animate-flicker"></div>
          <div className="wick"></div>
          <div className="candle-body"></div>
        </div>
      ) : (
        <div className="surprise">
        
        </div>
      )}
    </div>
  );
}