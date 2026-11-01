"use client";

import { useEffect } from "react";

export default function CursorSpotlight() {
  useEffect(() => {
    const spotlight = document.getElementById("cursor-spotlight");
    const onMove = (e: MouseEvent) => {
      if (spotlight) {
        spotlight.style.setProperty("--mx", `${e.clientX}px`);
        spotlight.style.setProperty("--my", `${e.clientY}px`);
      }
      // magnetic pull for .magnetic elements
      document.querySelectorAll<HTMLElement>(".magnetic").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const radius = 120;
        if (dist < radius) {
          const pull = (1 - dist / radius) * 0.35;
          el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
        } else {
          el.style.transform = "";
        }
      });
    };
    const onLeave = () => {
      document.querySelectorAll<HTMLElement>(".magnetic").forEach((el) => {
        el.style.transform = "";
      });
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <div id="cursor-spotlight" className="cursor-spotlight" aria-hidden="true" />;
}
