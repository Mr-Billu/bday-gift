import { useState } from "react";

const HeartFallback = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true" className="h-full w-full">
    <path d="M32 54S8 39 8 22C8 12 20 8 27 17c7-9 19-5 19 5 0 17-14 24-14 32Z" fill="#f08da4" opacity=".7" />
  </svg>
);

export default function OnlineGif({ src, alt, className = "", eager = false }) {
  const [failed, setFailed] = useState(!src);
  return (
    <span className={`inline-flex aspect-square items-center justify-center overflow-hidden ${className}`}>
      {failed ? <HeartFallback /> : (
        <img
          src={src}
          alt={alt}
          width="160"
          height="160"
          loading={eager ? "eager" : "lazy"}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      )}
    </span>
  );
}

