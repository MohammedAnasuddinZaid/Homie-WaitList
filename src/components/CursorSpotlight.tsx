"use client";

import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const spotlight = document.getElementById("cursor-spotlight");
    let running = false;

    const apply = () => {
      if (spotlight) {
        spotlight.style.setProperty("--mx", `${mouseRef.current.x}px`);
        spotlight.style.setProperty("--my", `${mouseRef.current.y}px`);
      }
      document.querySelectorAll<HTMLElement>(".magnetic").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mouseRef.current.x - cx;
        const dy = mouseRef.current.y - cy;
        const dist = Math.hypot(dx, dy);
        const radius = 120;
        if (dist < radius) {
          const pull = (1 - dist / radius) * 0.35;
          el.style.transform = `translate3d(${dx * pull}px, ${dy * pull}px, 0)`;
        } else if (el.style.transform) {
          el.style.transform = "";
        }
      });
      running = false;
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (!running) {
        running = true;
        rafRef.current = requestAnimationFrame(apply);
      }
    };

    const onLeave = () => {
      document.querySelectorAll<HTMLElement>(".magnetic").forEach((el) => {
        el.style.transform = "";
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <div id="cursor-spotlight" className="cursor-spotlight" aria-hidden="true" />;
}
