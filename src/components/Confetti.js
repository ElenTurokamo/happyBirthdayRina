import React, { useEffect, useState } from "react";
import "./Confetti.css";

export default function Confetti({
  pieces = 30,
  duration = 8000,
  size = 8,
  speed = 1,
  onDone
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onDone) onDone();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onDone]);

  if (!visible) return null;

  const colors = ["#ff3b30", "#ff9500", "#ffcc00", "#4cd964", "#5ac8fa", "#007aff", "#5856d6"];

  return (
    <div className="confetti-root" aria-hidden="true">
      {Array.from({ length: pieces }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const fallDuration = 3 + Math.random() * 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const pieceSize = size * (0.6 + Math.random() * 0.8);
        const rotation = Math.random() * 360;
        const xDrift = (Math.random() - 0.5) * 100; // траектория по X

        return (
          <span
            key={i}
            className="confetti-piece"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${fallDuration / speed}s`,
              backgroundColor: color,
              width: `${pieceSize}px`,
              height: `${pieceSize * 0.6}px`,
              transform: `rotate(${rotation}deg) translateX(${xDrift}px)`
            }}
          />
        );
      })}
    </div>
  );
}
