"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [count, setCount] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch waitlist count
    fetch("/api/waitlist/count")
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list.");
        setCount((c) => (c !== null ? c + 1 : null));
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#4490ff] opacity-[0.06] blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 w-[400px] h-[400px] rounded-full bg-[#4490ff] opacity-[0.03] blur-[80px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-3">
          <span className="focal-dot animate-pulse-dot" />
          <span className="text-sm font-medium tracking-widest uppercase text-white/90">
            HOMIE
          </span>
        </div>
        <div className="flex items-center gap-8 text-sm text-white/60">
          <a href="#features" className="hover:text-[#4490ff] transition-colors">Features</a>
          <a href="#waitlist" className="hover:text-[#4490ff] transition-colors">Waitlist</a>
          <a
            href="https://github.com/sarthakshipsai/homie"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4490ff] transition-colors"
          >
            GitHub
          </a>
        </div>
      </nav>

      <hr className="hairline mx-6 md:mx-12" />

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
        <div className="animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <span className="focal-dot mb-8 inline-block" />
        </div>

        <h1
          className="animate-fade-up text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          Your screen.
          <br />
          <span className="text-[#4490ff]">Your AI.</span>
        </h1>

        <p
          className="animate-fade-up text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mb-10"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          Homie is a free, local-first desktop copilot. One shortcut away.
          <br className="hidden md:block" />
          It sees your screen, reasons locally, and answers in place.
        </p>

        <div
          className="animate-fade-up flex flex-col sm:flex-row items-center gap-4"
          style={{ animationDelay: "0.6s", opacity: 0 }}
        >
          <a href="#waitlist" className="pill pill-solid">
            Join the waitlist
          </a>
          <a
            href="https://github.com/sarthakshipsai/homie"
            target="_blank"
            rel="noopener noreferrer"
            className="pill pill-outline"
          >
            View on GitHub
          </a>
        </div>

        {count !== null && (
          <p
            className="animate-fade-up text-sm text-white/30 mt-8 font-mono tracking-wider"
            style={{ animationDelay: "0.8s", opacity: 0 }}
          >
            {count.toLocaleString()} people already on the list
          </p>
        )}
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="focal-dot mb-4 inline-block" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              More than a chat window
            </h2>
            <p className="text-white/40 text-lg max-w-xl">
              Built for the way you actually work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Screen-aware",
                desc: "Captures the window you were just in. Not your whole desktop. In memory, never a file.",
                accent: "#4490ff",
              },
              {
                title: "Local-first",
                desc: "Runs on your machine via Ollama. No account. No upload. Nothing leaves unless you choose a cloud provider.",
                accent: "#4490ff",
              },
              {
                title: "Live observation",
                desc: "Watches your screen while you work. Samples every few seconds. Enriches locally.",
                accent: "#4490ff",
              },
              {
                title: "Screen memory",
                desc: "Opt-in. Homie recalls what you saw. Stored locally, with retention and exclusions you control.",
                accent: "#4490ff",
              },
              {
                title: "Voice input",
                desc: "Speak your question. Homie listens, then answers. Hands-free.",
                accent: "#4490ff",
              },
              {
                title: "Connect your provider",
                desc: "Claude, OpenAI, or any compatible API. Bring your own keys. Switch anytime.",
                accent: "#4490ff",
              },
            ].map((f, i) => (
              <div
                key={f.title}
                className="group p-8 border border-[#1f2937] rounded-none hover:border-[#4490ff]/40 transition-colors duration-300"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className="w-2 h-2 rounded-full bg-[#4490ff] mb-6 shadow-[0_0_12px_#4490ff]" />
                <h3 className="text-xl font-semibold mb-3 tracking-tight">{f.title}</h3>
                <p className="text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline mx-6 md:mx-12" />

      {/* How it works */}
      <section className="relative z-10 px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="focal-dot mb-4 inline-block" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Under the glass
            </h2>
            <p className="text-white/40 text-lg max-w-xl">
              How Homie turns a screen into an answer.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0">
            {[
              { label: "Overlay", sub: "Electron · always on top" },
              { label: "Screenshot", sub: "in memory · active window" },
              { label: "Ollama", sub: "loopback · 127.0.0.1" },
              { label: "qwen3-vl", sub: "vision model · local" },
            ].map((node, i) => (
              <div key={node.label} className="flex items-center">
                <div className="px-6 py-4 text-center">
                  <div className="w-2 h-2 rounded-full bg-[#4490ff] mx-auto mb-3 shadow-[0_0_12px_#4490ff]" />
                  <div className="text-lg font-semibold tracking-tight">{node.label}</div>
                  <div className="text-xs text-white/40 mt-1 font-mono tracking-wider">{node.sub}</div>
                </div>
                {i < 3 && (
                  <div className="hidden md:block w-12 h-px bg-[#4490ff]/40" />
                )}
              </div>
            ))}
          </div>

          <p className="text-white/60 text-lg mt-12 max-w-2xl leading-relaxed">
            No account. No upload. Free and open source. Nothing leaves your machine
            unless you choose a cloud provider.
          </p>
        </div>
      </section>

      <hr className="hairline mx-6 md:mx-12" />

      {/* Waitlist */}
      <section id="waitlist" className="relative z-10 px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <span className="focal-dot mb-6 inline-block" />
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Be the first to try Homie
          </h2>
          <p className="text-white/40 text-lg mb-10">
            Join the waitlist. We&apos;ll let you know when it&apos;s ready.
          </p>

          {status === "success" ? (
            <div className="py-8">
              <div className="w-12 h-12 rounded-full bg-[#4490ff]/20 border border-[#4490ff]/40 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4490ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-xl font-medium text-[#4490ff]">{message}</p>
              {count !== null && (
                <p className="text-sm text-white/30 mt-4 font-mono tracking-wider">
                  {count.toLocaleString()} people on the list
                </p>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3 bg-transparent border border-[#1f2937] rounded-full text-white placeholder-white/30 focus:outline-none focus:border-[#4490ff] transition-colors text-sm"
              />
              <input
                ref={inputRef}
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-3 bg-transparent border border-[#1f2937] rounded-full text-white placeholder-white/30 focus:outline-none focus:border-[#4490ff] transition-colors text-sm"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="pill pill-solid w-full justify-center disabled:opacity-50"
              >
                {status === "loading" ? "Joining..." : "Join waitlist"}
              </button>
              {status === "error" && (
                <p className="text-sm text-red-400">{message}</p>
              )}
            </form>
          )}

          <p className="text-xs text-white/20 mt-8">
            Free and open source. No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      <hr className="hairline mx-6 md:mx-12" />

      {/* Footer */}
      <footer className="relative z-10 px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="focal-dot" />
            <span className="text-sm font-medium tracking-widest uppercase text-white/60">
              HOMIE
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/30">
            <a
              href="https://github.com/sarthakshipsai/homie"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4490ff] transition-colors"
            >
              GitHub
            </a>
            <span>Created by Anas & Sarthak</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
