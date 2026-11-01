"use client";

import { useEffect, useState } from "react";

export default function LetterReveal({ text, accent = "", baseDelay = 0 }: { text: string; accent?: string; baseDelay?: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), baseDelay);
    return () => clearTimeout(t);
  }, [baseDelay]);

  if (!show) return <span className="opacity-0">{text}{accent}</span>;

  return (
    <span className="letter-reveal" aria-label={text + accent}>
      {text.split("").map((ch, i) => (
        <span key={i} className="ch" style={{ animationDelay: `${i * 0.04}s` }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
      {accent && (
        <span className="accent" style={{ display: "inline-block" }}>
          {accent.split("").map((ch, i) => (
            <span key={i} className="ch" style={{ animationDelay: `${(text.length + i) * 0.04}s` }}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </span>
      )}
    </span>
  );
}
