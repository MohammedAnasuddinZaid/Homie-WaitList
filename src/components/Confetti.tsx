"use client";

import { useEffect, useState } from "react";

type Piece = { id: number; dx: string; dy: string; color: string; delay: number };

const COLORS = ["#4490ff", "#f4efe9", "#ffffff", "#8ab6ff"];

export default function Confetti({ trigger }: { trigger: number }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (trigger === 0) return;
    const next: Piece[] = [];
    for (let i = 0; i < 48; i++) {
      const angle = (Math.PI * 2 * i) / 48 + Math.random() * 0.3;
      const dist = 80 + Math.random() * 140;
      next.push({
        id: trigger * 1000 + i,
        dx: `${Math.cos(angle) * dist}px`,
        dy: `${Math.sin(angle) * dist - 60}px`,
        color: COLORS[i % COLORS.length],
        delay: Math.random() * 0.15,
      });
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPieces(next);
    const t = setTimeout(() => setPieces([]), 1600);
    return () => clearTimeout(t);
  }, [trigger]);

  if (pieces.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            background: p.color,
            ["--dx" as string]: p.dx,
            ["--dy" as string]: p.dy,
            animationDelay: `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
