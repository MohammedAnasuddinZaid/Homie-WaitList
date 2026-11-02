"use client";

import { useEffect, useRef, useState } from "react";

export default function Parallax({ children, speed = 0.15 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let running = false;
    const update = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        setY(center * speed);
      }
      running = false;
    };
    const onScroll = () => {
      if (!running) {
        running = true;
        rafRef.current = requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  return (
    <div ref={ref} style={{ transform: `translate3d(0, ${y}px, 0)` }} className="will-change-transform">
      {children}
    </div>
  );
}
