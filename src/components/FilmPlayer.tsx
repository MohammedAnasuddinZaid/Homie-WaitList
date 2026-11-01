"use client";

import { useRef, useState } from "react";

export default function FilmPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };

  const pause = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setPlaying(false);
  };

  const handleEnded = () => {
    setPlaying(false);
    setEnded(true);
  };

  const toggle = () => {
    if (playing) pause();
    else play();
  };

  return (
    <div className="relative bg-ink aspect-video w-full overflow-hidden group">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full"
        src="/homie-film.mp4"
        poster="/poster.jpg"
        preload="metadata"
        playsInline
        onEnded={handleEnded}
        onClick={toggle}
      />

      {/* overlay */}
      {!playing && (
        <button
          type="button"
          onClick={play}
          aria-label="Play the Homie film with sound"
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-void/40 backdrop-blur-[2px] transition-opacity duration-300 hover:bg-void/25"
        >
          <span className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-28 w-28 rounded-full bg-blue/20 animate-ping" />
            <span className="relative flex items-center justify-center h-24 w-24 rounded-full bg-blue text-void shadow-[0_0_60px_rgba(68,144,255,0.6)] transition-transform duration-300 group-hover:scale-105">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-bone/80">
            {ended ? "Replay the film" : "Play film · with sound"}
          </span>
        </button>
      )}

      {/* hint when playing */}
      {playing && (
        <button
          type="button"
          onClick={pause}
          aria-label="Pause"
          className="absolute bottom-4 right-4 z-10 h-10 w-10 rounded-full bg-void/60 backdrop-blur flex items-center justify-center text-bone/80 hover:text-bone transition opacity-0 group-hover:opacity-100"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" />
            <rect x="14" y="5" width="4" height="14" />
          </svg>
        </button>
      )}
    </div>
  );
}
