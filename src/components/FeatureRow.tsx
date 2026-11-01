"use client";

import { useRef } from "react";

type Props = {
  index: string;
  title: string;
  body: string;
};

export default function FeatureRow({ index, title, body }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <a
      ref={ref}
      href="#waitlist"
      onMouseMove={onMove}
      className="group flex flex-col md:flex-row md:items-baseline gap-3 md:gap-10 py-10 md:py-12 border-t border-slate-soft last:border-b no-underline feature-row"
    >
      <span className="font-mono text-xs tracking-[0.25em] text-faint group-hover:text-blue transition-colors w-14 flex-none">
        {index}
      </span>
      <div className="md:w-72 flex-none">
        <h3 className="font-display text-2xl md:text-[28px] font-semibold tracking-tight text-bone group-hover:text-blue transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-dim leading-relaxed max-w-xl group-hover:text-bone/70 transition-colors">
        {body}
      </p>
    </a>
  );
}
