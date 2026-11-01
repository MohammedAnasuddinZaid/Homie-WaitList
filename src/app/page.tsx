import Reveal from "@/components/Reveal";
import WaitlistForm from "@/components/WaitlistForm";
import LiveCount from "@/components/LiveCount";
import FilmPlayer from "@/components/FilmPlayer";
import ScrollProgress from "@/components/ScrollProgress";
import Particles from "@/components/Particles";
import Parallax from "@/components/Parallax";
import LetterReveal from "@/components/LetterReveal";
import { getCount } from "@/lib/db";

export const dynamic = "force-dynamic";

const FEATURES = [
  {
    n: "01",
    title: "Screen-aware",
    body: "It captures the window you were just in — never your whole desktop. Held in memory, never written to disk.",
  },
  {
    n: "02",
    title: "Local-first",
    body: "Runs on your own machine with Ollama. No account. No upload. No cloud tax.",
  },
  {
    n: "03",
    title: "Live observation",
    body: "Samples your screen while you work and enriches context locally — so answers know what you're looking at.",
  },
  {
    n: "04",
    title: "Screen memory",
    body: "Opt-in. Homie recalls what you've seen, with retention windows and exclusions you control. Stored on your device.",
  },
  {
    n: "05",
    title: "Hands-free voice",
    body: "Speak the question. It listens, reasons, and answers. Hands stay on the keyboard.",
  },
  {
    n: "06",
    title: "Bring your own provider",
    body: "Ollama, OpenAI-compatible, Anthropic, or OpenCode. Your keys, your choice — switch anytime.",
  },
];

const STEPS = [
  { k: "Summon", sub: "Ctrl + Shift + Space", d: "The overlay appears above any window." },
  { k: "Capture", sub: "Active window · in memory", d: "A frame of what you were just doing — held in RAM, never saved." },
  { k: "Reason", sub: "Local model · loopback", d: "Ollama reads the frame and the question. Nothing leaves the machine." },
  { k: "Answer", sub: "In place · instantly", d: "The response renders right in the overlay." },
];

const PROVIDERS = ["OLLAMA", "OPENAI-COMPATIBLE", "ANTHROPIC", "OPENCODE"];

const MARQUEE = [
  "SCREEN-AWARE",
  "LOCAL-FIRST",
  "OPEN SOURCE",
  "NO ACCOUNT",
  "NO UPLOAD",
  "ONE SHORTCUT AWAY",
];

export default async function Home() {
  let count = 0;
  try {
    count = await getCount();
  } catch {
    count = 0;
  }

  return (
    <main className="relative bg-void text-bone">
      <ScrollProgress />
      {/* ============ NAV ============ */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-slate-soft bg-void/70 backdrop-blur-xl">
        <nav className="flex items-center justify-between px-6 md:px-12 h-16">
          <a href="#top" className="flex items-center gap-3 no-underline">
            <span className="focal focal-pulse" />
            <span className="font-display text-sm font-semibold tracking-[0.3em] uppercase text-bone">
              Homie
            </span>
          </a>
          <div className="flex items-center gap-7 text-[13px] text-dim">
            <a href="#features" className="hidden sm:inline animated-underline hover:text-blue transition-colors">
              Features
            </a>
            <a href="#film" className="hidden sm:inline animated-underline hover:text-blue transition-colors">
              Film
            </a>
            <a href="#how" className="hidden sm:inline animated-underline hover:text-blue transition-colors">
              How it works
            </a>
            <a
              href="https://github.com/sarthakshipsai/homie"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue transition-colors"
            >
              GitHub
            </a>
            <a href="#waitlist" className="pill pill-outline !py-2 !px-5">
              Waitlist
            </a>
          </div>
        </nav>
      </header>

      {/* ============ HERO ============ */}
      <section id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden">
        {/* full-bleed film */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero-loop.mp4"
          poster="/poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <Particles />
        <div className="gradient-mesh" aria-hidden="true" />
        <div className="blob" style={{ width: 500, height: 500, top: "10%", left: "5%", background: "#4490ff" }} aria-hidden="true" />
        <div className="blob" style={{ width: 400, height: 400, bottom: "15%", right: "10%", background: "#4490ff", animationDelay: "-6s" }} aria-hidden="true" />
        {/* scrims */}
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/20 to-void pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/85 via-void/35 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-void/15 pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <Parallax speed={0.08}>
          <p className="rise mono-label mb-8 flex items-center gap-3" style={{ animationDelay: "0.1s" }}>
            <span className="focal" style={{ width: 6, height: 6 }} />
            Free · Open source · Local-first
          </p>

          <h1
            className="rise display text-[13vw] sm:text-7xl md:text-8xl lg:text-[104px] text-bone"
            style={{ animationDelay: "0.25s" }}
          >
            Your screen.
            <br />
            <span className="accent text-shimmer">Your AI.</span>
          </h1>

          <p
            className="rise max-w-xl text-bone/60 text-base md:text-lg leading-relaxed mt-8"
            style={{ animationDelay: "0.45s" }}
          >
            A free, open-source desktop copilot — one shortcut away.
            <br className="hidden sm:block" />
            It captures the window you were just in, reasons locally,
            <br className="hidden sm:block" />
            and answers in place.
          </p>

          <div
            className="rise flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-12"
            style={{ animationDelay: "0.6s" }}
          >
            <a href="#waitlist" className="pill pill-solid magnetic">
              Join the waitlist
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <span className="hidden sm:inline font-mono text-[10px] tracking-[0.3em] uppercase text-faint">
              or
            </span>
            <a href="#film" className="pill pill-outline magnetic">
              Watch the film
            </a>
          </div>

          <p
            className="rise font-mono text-xs tracking-[0.22em] uppercase text-faint mt-12"
            style={{ animationDelay: "0.75s" }}
          >
            <LiveCount initial={count} /> already on the list
          </p>
          </Parallax>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <span className="scroll-cue block mono-label !text-faint">Scroll</span>
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="marquee border-y border-slate-soft py-4 overflow-hidden select-none">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {MARQUEE.map((item) => (
                <span key={item} className="flex items-center gap-8 px-4">
                  <span className="font-mono text-[11px] tracking-[0.3em] text-dim whitespace-nowrap">
                    {item}
                  </span>
                  <span className="focal" style={{ width: 5, height: 5 }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ STATEMENT ============ */}
      <section className="relative py-32 md:py-44 px-6">
        <div className="blueprint" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            <p className="mono-label mb-12">The idea</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display text-4xl md:text-6xl lg:text-7xl text-bone">
              <LetterReveal text="It sees what you see" accent="." baseDelay={200} />
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <h2 className="display text-4xl md:text-6xl lg:text-7xl text-bone mt-4">
              <LetterReveal text="It reasons where you work" accent="." baseDelay={400} />
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <h2 className="display text-4xl md:text-6xl lg:text-7xl text-bone mt-4">
              <LetterReveal text="It answers in place" accent="." baseDelay={600} />
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="relative px-6 md:px-12 py-24 md:py-36">
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex items-end justify-between mb-16 md:mb-24">
            <div>
              <p className="mono-label mb-6">Capabilities</p>
              <h2 className="display text-4xl md:text-6xl text-bone">
                More than a chat window<span className="accent">.</span>
              </h2>
            </div>
            <p className="hidden md:block font-mono text-xs tracking-[0.25em] text-faint uppercase">
              06
            </p>
          </Reveal>

          <div>
            {FEATURES.map((f, i) => (
              <Reveal key={f.n} delay={i * 60}>
                <a
                  href="#waitlist"
                  className="group flex flex-col md:flex-row md:items-baseline gap-3 md:gap-10 py-10 md:py-12 border-t border-slate-soft last:border-b no-underline feature-row"
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                  }}
                >
                  <span className="font-mono text-xs tracking-[0.25em] text-faint group-hover:text-blue transition-colors w-14 flex-none">
                    {f.n}
                  </span>
                  <div className="md:w-72 flex-none">
                    <h3 className="font-display text-2xl md:text-[28px] font-semibold tracking-tight text-bone group-hover:text-blue transition-colors">
                      {f.title}
                    </h3>
                  </div>
                  <p className="text-dim leading-relaxed max-w-xl group-hover:text-bone/70 transition-colors">
                    {f.body}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FILM ============ */}
      <section id="film" className="relative px-0 py-24 md:py-36">
        <div className="max-w-6xl mx-auto px-6 md:px-12 mb-14">
          <Reveal>
            <p className="mono-label mb-6">The film</p>
            <h2 className="display text-4xl md:text-6xl text-bone">
              Ninety seconds of Homie<span className="accent">.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal>
          <FilmPlayer />
        </Reveal>
        <div className="max-w-6xl mx-auto px-6 md:px-12 mt-6 flex items-center justify-between">
          <p className="font-mono text-[11px] tracking-[0.25em] text-faint uppercase">
            Homie — launch film · 2026
          </p>
          <p className="font-mono text-[11px] tracking-[0.25em] text-faint uppercase hidden sm:block">
            1080p · 90s
          </p>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how" className="relative px-6 md:px-12 py-24 md:py-36">
        <div className="blueprint" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto">
          <Reveal className="mb-20">
            <p className="mono-label mb-6">Under the glass</p>
            <h2 className="display text-4xl md:text-6xl text-bone">
              How a screen becomes an answer<span className="accent">.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-y-14 md:gap-y-0 md:gap-x-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.k} delay={i * 90} className="relative">
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-[22px] left-[calc(50%+26px)] w-[calc(100%-52px)] h-px bg-blue/25"
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-center gap-4 mb-6">
                  <span className="focal relative z-10" />
                  <span className="font-mono text-xs text-faint tracking-[0.25em]">
                    {`0${i + 1}`}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-bone mb-2">
                  {s.k}
                </h3>
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase accent mb-4">
                  {s.sub}
                </p>
                <p className="text-dim text-[15px] leading-relaxed">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROVIDERS ============ */}
      <section className="relative px-6 md:px-12 py-24 md:py-32 border-y border-slate-soft">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-12 md:gap-16">
          <Reveal className="md:w-1/2">
            <p className="mono-label mb-6">Providers</p>
            <h2 className="display text-3xl md:text-5xl text-bone">
              Bring your own brain<span className="accent">.</span>
            </h2>
            <p className="text-dim leading-relaxed mt-6 max-w-md">
              Local by default. Cloud when you say so — Claude, OpenAI, or any
              compatible API. Your keys, your machine, your call.
            </p>
          </Reveal>
          <Reveal delay={120} className="md:w-1/2">
            <div className="flex flex-col gap-5">
              {PROVIDERS.map((p) => (
                <div
                  key={p}
                  className="flex items-center justify-between py-4 border-b border-slate-soft last:border-0"
                >
                  <span className="font-mono text-sm tracking-[0.2em] text-bone/80">{p}</span>
                  <span className="focal" style={{ width: 6, height: 6 }} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ TRUST ============ */}
      <section className="relative px-6 md:px-12 py-28 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="display text-3xl md:text-5xl lg:text-6xl text-bone leading-[1.06]">
              Nothing leaves your machine
              <br />
              unless you choose a cloud provider<span className="accent">.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-faint mt-10">
              Free &amp; open source · No account · No telemetry · No hidden cloud
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ WAITLIST ============ */}
      <section
        id="waitlist"
        className="relative px-6 md:px-12 py-28 md:py-40 border-t border-slate-soft overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-blue opacity-[0.05] blur-[140px] pointer-events-none"
          aria-hidden="true"
        />
        <div className="gradient-mesh" aria-hidden="true" />
        <div className="blob" style={{ width: 360, height: 360, top: "10%", left: "5%", background: "#4490ff" }} aria-hidden="true" />
        <div className="blob" style={{ width: 300, height: 300, bottom: "10%", right: "8%", background: "#4490ff", animationDelay: "-9s" }} aria-hidden="true" />
        <div className="relative max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="mono-label mb-8">Waitlist</p>
            <h2 className="display text-5xl md:text-7xl text-bone">
              Be first in line<span className="accent">.</span>
            </h2>
            <p className="text-bone/55 text-lg leading-relaxed mt-8 max-w-md mx-auto">
              Homie is on its way. Drop your email and we&apos;ll tell you the moment
              it&apos;s ready.
            </p>
          </Reveal>

          <Reveal delay={140} className="mt-14">
            <div className="gradient-border rounded-2xl bg-ink/40 backdrop-blur-sm p-8 md:p-12">
              <WaitlistForm initialCount={count} />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-faint mt-16">
              Free forever · No spam · Unsubscribe anytime
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="relative px-6 md:px-12 pt-16 pb-10 border-t border-slate-soft">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
            <div className="flex items-center gap-3">
              <span className="focal" />
              <span className="font-display text-sm font-semibold tracking-[0.3em] uppercase text-bone">
                Homie
              </span>
            </div>
            <div className="flex flex-col gap-4 text-[13px] text-dim">
              <a href="#features" className="hover:text-blue transition-colors w-fit">
                Features
              </a>
              <a href="#film" className="hover:text-blue transition-colors w-fit">
                Film
              </a>
              <a href="#waitlist" className="hover:text-blue transition-colors w-fit">
                Waitlist
              </a>
              <a
                href="https://github.com/sarthakshipsai/homie"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue transition-colors w-fit"
              >
                GitHub
              </a>
            </div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-faint">
              Created by
              <br />
              <span className="text-bone/70 mt-2 block">Anas &amp; Sarthak</span>
            </p>
          </div>
          <div className="hairline my-10" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-faint">
              © 2026 Homie
            </p>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-faint">
              Free &amp; open source · MIT
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
