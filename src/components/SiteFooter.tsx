"use client";

import { useState } from "react";

type ModalKey = "anas" | "sarthak" | "privacy" | "terms" | "cookies" | null;

export default function SiteFooter() {
  const [open, setOpen] = useState<ModalKey>(null);

  const close = () => setOpen(null);

  return (
    <>
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
              <a href="#features" className="hover:text-blue transition-colors w-fit animated-underline">
                Features
              </a>
              <a href="#film" className="hover:text-blue transition-colors w-fit animated-underline">
                Film
              </a>
              <a href="#waitlist" className="hover:text-blue transition-colors w-fit animated-underline">
                Waitlist
              </a>
              <a
                href="https://github.com/sarthakshipsai/homie"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue transition-colors w-fit animated-underline"
              >
                GitHub
              </a>
            </div>

            <div className="flex flex-col gap-4 text-[13px] text-dim">
              <button onClick={() => setOpen("anas")} className="text-left hover:text-blue transition-colors w-fit animated-underline">
                About Anas
              </button>
              <button onClick={() => setOpen("sarthak")} className="text-left hover:text-blue transition-colors w-fit animated-underline">
                About Sarthak
              </button>
              <a
                href="https://github.com/MohammedAnasuddinZaid/Homie-WaitList"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue transition-colors w-fit animated-underline"
              >
                Source code
              </a>
            </div>

            <div className="flex flex-col gap-4 text-[13px] text-dim">
              <button onClick={() => setOpen("privacy")} className="text-left hover:text-blue transition-colors w-fit animated-underline">
                Privacy Policy
              </button>
              <button onClick={() => setOpen("terms")} className="text-left hover:text-blue transition-colors w-fit animated-underline">
                Terms of Service
              </button>
              <button onClick={() => setOpen("cookies")} className="text-left hover:text-blue transition-colors w-fit animated-underline">
                Cookie Policy
              </button>
            </div>
          </div>

          <div className="hairline my-10" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-faint">
              © 2026 Homie
            </p>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-faint">
              Free &amp; open source · MIT · Created by Anas &amp; Sarthak
            </p>
          </div>
        </div>
      </footer>

      {open && (
        <Modal title={modalTitle(open)} onClose={close}>
          {modalContent(open)}
        </Modal>
      )}
    </>
  );
}

function modalTitle(key: ModalKey): string {
  switch (key) {
    case "anas": return "About Anas — Mohammed Anasuddin Zaid";
    case "sarthak": return "About Sarthak — Sarthak Vaishnav";
    case "privacy": return "Privacy Policy";
    case "terms": return "Terms of Service";
    case "cookies": return "Cookie Policy";
    default: return "";
  }
}

function modalContent(key: ModalKey) {
  switch (key) {
    case "anas":
      return (
        <div className="space-y-4 text-bone/70 leading-relaxed text-[15px]">
          <p>
            <strong className="text-bone">Mohammed Anasuddin Zaid</strong> (also published as
            Mohammad Anasuddin Zaid / Mohmad Anasuddin Zaid) is a first-year Computer
            Science & Engineering student at Gokaraju Rangaraju Institute of Engineering and
            Technology (GRIET), Hyderabad, India — academic batch 2026–2030. He is based in
            the Greater Hyderabad Area.
          </p>
          <p>
            He is a software engineer, independent researcher, and entrepreneur. His work
            spans software development, theoretical physics, assistive technology, hackathons,
            and Model United Nations.
          </p>
          <h4 className="text-bone font-semibold mt-6 mb-2">Open source</h4>
          <p>
            Contributed to <strong className="text-bone">GoReleaser</strong> — introduced support
            for publishing additional locale manifests in the WinGet publishing pipeline
            (PR #6733, commit de88f3820). Changed 22 files, 824 insertions, 37 deletions.
            The feature adds an <code className="text-blue">additional_locales</code> config option
            with locale-specific publisher info, descriptions, tags, release notes, URLs, and
            fallback to the default locale.
          </p>
          <h4 className="text-bone font-semibold mt-6 mb-2">Flagship projects</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-bone">CareSpeak</strong> — AI-powered assistive reality system for sign language. Hand & eye gesture recognition, voice output, real-time communication, clinician dashboard. Built with Python, JavaScript, React, Node.js, computer vision. Team leader.</li>
            <li><strong className="text-bone">CareGiver</strong> — Dementia care companion with face recognition, cognitive games, reminders, progress tracking, AI assistant, on-device functionality.</li>
            <li><strong className="text-bone">Aura — The Feel Of The Phone</strong> — e-commerce venture (founder).</li>
          </ul>
          <h4 className="text-bone font-semibold mt-6 mb-2">Hackathons &amp; competitions</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Smart India Hackathon 2026 — GRIET Top 10 selection (team leader, CareSpeak & CareGiver).</li>
            <li>VYNEDAM National Hackathon 2026 — 5th place out of 179 teams / ~700 participants (36-hour, CareSpeak).</li>
            <li>Flipkart GRiD 8.0 — shortlisted before beginning undergraduate degree.</li>
            <li>HackIndia TECHSURGE 2K26 — official participant (BVRIT).</li>
            <li>CodeStorm 2K26 — Open Innovation track (Narsimha Reddy Engineering College).</li>
          </ul>
          <h4 className="text-bone font-semibold mt-6 mb-2">Research</h4>
          <p>
            Claims 13 independent physics research papers. Identifiable works include
            &ldquo;Dark Universes Within the Void,&rdquo; &ldquo;Vibrational Information Field Theory,&rdquo;
            &ldquo;Quantum Efficiency and the Emergence of Consciousness,&rdquo; &ldquo;Anas Cosmogenesis
            Hypothesis,&rdquo; &ldquo;Spacetime Vortex Gravity,&rdquo; &ldquo;Quantum Meristem States,&rdquo; and
            &ldquo;Unified Conceptual Study of High-Energy Tungsten Ion Acceleration and Abstract Energy
            Conversion Frameworks&rdquo; (published on Synapse Social, Sept 2025, with DOI).
          </p>
          <h4 className="text-bone font-semibold mt-6 mb-2">Other activities</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Model United Nations: 30+ conferences, 20+ awards, Best Delegate &amp; Best Position Paper recognition.</li>
            <li>Competitive chess (state/national level).</li>
            <li>6+ technical internships (claimed), including Trovo Fi (Backend Developer Intern) and AWS Student Builder Group at IIT Jodhpur.</li>
          </ul>
          <h4 className="text-bone font-semibold mt-6 mb-2">Links</h4>
          <div className="flex flex-wrap gap-3 mt-2">
            <a href="https://github.com/MohammedAnasuddinZaid" target="_blank" rel="noopener noreferrer" className="pill pill-outline !py-2 !px-5">GitHub (main)</a>
            <a href="https://github.com/anasuddinzaid" target="_blank" rel="noopener noreferrer" className="pill pill-outline !py-2 !px-5">GitHub (research)</a>
            <a href="https://www.linkedin.com/in/mohammed-anasuddin-zaid/" target="_blank" rel="noopener noreferrer" className="pill pill-outline !py-2 !px-5">LinkedIn</a>
          </div>
        </div>
      );
    case "sarthak":
      return (
        <div className="space-y-4 text-bone/70 leading-relaxed text-[15px]">
          <p>
            <strong className="text-bone">Sarthak Vaishnav</strong> (also referenced as Sarthak
            Shah in the official Build What Moves India Top 250 listing) is a product builder
            with a background in cryptocurrency, digital assets, investment strategy, and
            product development, now building AI-powered products.
          </p>
          <h4 className="text-bone font-semibold mt-6 mb-2">OpenAI hackathon — 2nd place</h4>
          <p>
            Finished <strong className="text-bone">2nd place</strong> at <strong className="text-bone">Build What Moves India</strong>
            (presented by Varun Mayya in partnership with OpenAI), September 2026, Bengaluru.
            Out of 13,694 applications, 250 shortlisted, 10 finalists, 3 winners.
          </p>
          <p>
            Project: <strong className="text-bone">Atithi</strong> — an AI-agent-assisted platform
            to simplify India&apos;s e-Visa application process for foreign visitors. Features
            include passport-data extraction, automatic form preparation, photograph validation,
            document preparation, reusable applicant info, and integration with Codex, Claude,
            and Gemini agents. The applicant stays in control throughout.
          </p>
          <p>
            Third-party coverage: <em>Financial Express</em> (Oct 15, 2026) —
            &ldquo;OpenAI goes beyond code&rdquo; — discussed Atithi and its creators.
            Teammate Janvi Mehta (UX designer) independently announced the 2nd-place result.
          </p>
          <p className="text-sm text-faint italic">
            Note: Atithi is not an official Government of India service. The prototype explicitly
            warns users not to upload real passports or documents.
          </p>
          <h4 className="text-bone font-semibold mt-6 mb-2">Professional background</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-bone">BitGenix</strong> — Head of Research &amp; Strategy. Digital-asset research, crypto market analysis, strategic advisory (claimed $36M+ in digital assets across India and Dubai).</li>
            <li><strong className="text-bone">Folioex</strong> — current association. Crypto-investment platform for Indian retail investors; advocates structured portfolio investing over speculative trading.</li>
            <li>Involved in crypto since age 16; describes nearly a decade of experience.</li>
            <li>Transitioned from crypto-focused background into AI product building.</li>
          </ul>
          <h4 className="text-bone font-semibold mt-6 mb-2">Education &amp; recognition</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>B.Com — KES Shroff College.</li>
            <li>MSc — Heriot-Watt University.</li>
            <li>CFA Level 1.</li>
            <li>Junior MBA (CMO) — Clever Harvey.</li>
            <li>Innovation in Wealth Management — MoneyExpo 2023.</li>
            <li>Best Research Paper — &ldquo;Banking for the Unbanked People&rdquo; — KES Shroff College &amp; Taylor&apos;s University, 2022.</li>
          </ul>
          <h4 className="text-bone font-semibold mt-6 mb-2">Research &amp; financial interests</h4>
          <p>
            Cryptocurrency adoption in India, digital-asset regulations, retail investment
            infrastructure, wealth management, financial inclusion, fintech product development.
          </p>
          <h4 className="text-bone font-semibold mt-6 mb-2">Links</h4>
          <div className="flex flex-wrap gap-3 mt-2">
            <a href="https://www.linkedin.com/in/sarthakvaishnav/" target="_blank" rel="noopener noreferrer" className="pill pill-outline !py-2 !px-5">LinkedIn</a>
            <a href="https://atithitest.sarthakshipsai.com" target="_blank" rel="noopener noreferrer" className="pill pill-outline !py-2 !px-5">Atithi prototype</a>
            <a href="https://www.financialexpress.com/business/brandwagon-openai-goes-beyond-code-how-atithi-is-reimagining-indias-e-visa-experience-4014724/" target="_blank" rel="noopener noreferrer" className="pill pill-outline !py-2 !px-5">Financial Express</a>
          </div>
        </div>
      );
    case "privacy":
      return (
        <div className="space-y-4 text-bone/70 leading-relaxed text-[15px]">
          <p><strong className="text-bone">Last updated:</strong> November 2026</p>
          <h4 className="text-bone font-semibold mt-4 mb-2">What we collect</h4>
          <p>
            When you join the waitlist, we collect your name (optional) and email address.
            We also record a timestamp. That&apos;s it — no tracking pixels, no analytics cookies,
            no fingerprinting.
          </p>
          <h4 className="text-bone font-semibold mt-4 mb-2">How we use it</h4>
          <p>
            Your email is used solely to notify you when Homie launches and to send occasional
            product updates. You can unsubscribe at any time by replying &ldquo;unsubscribe&rdquo; to
            any email. We never sell, rent, or share your data with third parties.
          </p>
          <h4 className="text-bone font-semibold mt-4 mb-2">Where it&apos;s stored</h4>
          <p>
            Data is stored in a PostgreSQL database hosted on Neon (cloud). It is encrypted
            in transit (TLS) and at rest. No data is stored on your device beyond standard
            browser caching.
          </p>
          <h4 className="text-bone font-semibold mt-4 mb-2">Your rights</h4>
          <p>
            You can request deletion of your data at any time by emailing
            mohammedanasuddin256@gmail.com. We will remove your entry within 7 days.
          </p>
        </div>
      );
    case "terms":
      return (
        <div className="space-y-4 text-bone/70 leading-relaxed text-[15px]">
          <p><strong className="text-bone">Last updated:</strong> November 2026</p>
          <h4 className="text-bone font-semibold mt-4 mb-2">Acceptance</h4>
          <p>
            By using this website or joining the waitlist, you agree to these terms. If you
            do not agree, please do not use the site.
          </p>
          <h4 className="text-bone font-semibold mt-4 mb-2">The service</h4>
          <p>
            Homie is a free, open-source desktop copilot currently in development. This
            website is a waitlist — joining does not guarantee access, a license, or any
            specific feature set. The product may change before release.
          </p>
          <h4 className="text-bone font-semibold mt-4 mb-2">No warranty</h4>
          <p>
            The site and any future product are provided &ldquo;as is&rdquo; without warranty of any
            kind, express or implied. We are not liable for any damages arising from use of
            the site or the product.
          </p>
          <h4 className="text-bone font-semibold mt-4 mb-2">Open source</h4>
          <p>
            Homie is free and open source under the MIT license. You are free to use, modify,
            and distribute it under the terms of that license.
          </p>
          <h4 className="text-bone font-semibold mt-4 mb-2">Contact</h4>
          <p>
            Questions? Email mohammedanasuddin256@gmail.com.
          </p>
        </div>
      );
    case "cookies":
      return (
        <div className="space-y-4 text-bone/70 leading-relaxed text-[15px]">
          <p><strong className="text-bone">Last updated:</strong> November 2026</p>
          <h4 className="text-bone font-semibold mt-4 mb-2">What we use</h4>
          <p>
            This site uses <strong className="text-bone">no tracking cookies</strong> and no
            third-party analytics. We do not use Google Analytics, Meta Pixel, or any
            advertising trackers.
          </p>
          <h4 className="text-bone font-semibold mt-4 mb-2">Essential cookies</h4>
          <p>
            The only cookies that may be set are essential ones required for the site to
            function (e.g., session/state). These are not used for tracking.
          </p>
          <h4 className="text-bone font-semibold mt-4 mb-2">Local storage</h4>
          <p>
            We do not store personal data in your browser&apos;s local storage or session storage.
          </p>
          <h4 className="text-bone font-semibold mt-4 mb-2">Your control</h4>
          <p>
            You can clear cookies at any time through your browser settings. Since we use no
            tracking cookies, there is nothing to opt out of.
          </p>
        </div>
      );
    default:
      return null;
  }
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-void/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto bg-ink border border-slate-soft rounded-2xl p-8 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-bone">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="h-9 w-9 rounded-full border border-slate-soft flex items-center justify-center text-dim hover:text-bone hover:border-blue transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
