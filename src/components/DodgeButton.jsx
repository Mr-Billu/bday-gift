import { createPortal } from "react-dom";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export default function DodgeButton({ labels, className = "", otherButtonRef }) {
  const buttonRef = useRef(null);
  const portalRef = useRef(null);
  const [jumped, setJumped] = useState(false);
  const [labelIndex, setLabelIndex] = useState(0);
  const [position, setPosition] = useState({ left: 12, top: 12 });
  const [size, setSize] = useState({ width: 96, height: 48 });
  const lastJump = useRef(0);

  const place = useCallback(() => {
    const button = portalRef.current || buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const nextSize = { width: rect.width || 96, height: rect.height || 48 };
    setSize((previous) => previous.width === nextSize.width && previous.height === nextSize.height ? previous : nextSize);
    const margin = 12;
    const maxLeft = Math.max(margin, window.innerWidth - nextSize.width - margin);
    const maxTop = Math.max(margin, window.innerHeight - nextSize.height - margin);
    const other = otherButtonRef?.current?.getBoundingClientRect();
    let next = { left: margin, top: margin };
    for (let attempt = 0; attempt < 40; attempt += 1) {
      const candidate = { left: margin + Math.random() * (maxLeft - margin), top: margin + Math.random() * (maxTop - margin) };
      const overlaps = other && candidate.left < other.right + 18 && candidate.left + nextSize.width > other.left - 18 && candidate.top < other.bottom + 18 && candidate.top + nextSize.height > other.top - 18;
      if (!overlaps) { next = candidate; break; }
    }
    setPosition(next);
  }, [otherButtonRef]);

  const jump = (event) => {
    if (performance.now() - lastJump.current < 60) return;
    lastJump.current = performance.now();
    event.preventDefault();
    event.stopPropagation();
    setLabelIndex((index) => (index + 1) % labels.length);
    setJumped(true);
  };

  useLayoutEffect(() => { if (jumped) place(); }, [jumped, labelIndex, place]);
  useEffect(() => {
    if (!jumped) return undefined;
    const onResize = () => place();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [jumped, place]);

  const button = <button ref={jumped ? portalRef : buttonRef} type="button" tabIndex={-1} aria-disabled="true" onClick={(event) => event.preventDefault()} onPointerEnter={jump} onMouseEnter={jump} onTouchStart={jump} onPointerDown={jump} className={className} style={jumped ? { position: "fixed", left: position.left, top: position.top, zIndex: 80, transition: "left 180ms ease, top 180ms ease" } : undefined}>{labels[labelIndex]}</button>;
  return jumped ? <><span aria-hidden="true" style={{ display: "inline-block", width: size.width, height: size.height }} />{createPortal(button, document.body)}</> : button;
}
