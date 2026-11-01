"use client";

import { useEffect, useState } from "react";
import { BASE_COUNT } from "@/lib/constants";

type Status = "idle" | "loading" | "success" | "error" | "duplicate";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function WaitlistForm({ initialCount }: { initialCount: number }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [count, setCount] = useState<number | null>(initialCount);
  const [emailTouched, setEmailTouched] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  useEffect(() => {
    fetch("/api/waitlist/count")
      .then((r) => r.json())
      .then((d) => typeof d.count === "number" && setCount(d.count))
      .catch(() => {});
  }, []);

  const emailError = emailTouched && email.length > 0 && !EMAIL_RE.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setEmailTouched(true);
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmittedEmail(email);
        setStatus("success");
        setMessage(data.message || "You're in.");
        if (typeof data.count === "number") setCount(data.count);
      } else if (res.status === 409) {
        setStatus("duplicate");
        setMessage(data.error || "You're already on the list.");
        if (typeof data.count === "number") setCount(data.count);
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  };

  const reset = () => {
    setStatus("idle");
    setEmail("");
    setName("");
    setEmailTouched(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {status === "success" ? (
        <div className="py-6 animate-fade-in">
          <SuccessMark />
          <p className="text-2xl font-semibold text-bone mt-8 mb-2 font-display">You&apos;re in.</p>
          <p className="text-dim leading-relaxed">{message}</p>
          <p className="font-mono text-xs text-faint mt-6 tracking-wider">
            {submittedEmail}
          </p>
          {count !== null && (
            <p className="font-mono text-xs accent mt-3 tracking-widest">
              {(BASE_COUNT + count).toLocaleString()} on the list
            </p>
          )}
          <button onClick={reset} className="pill pill-ghost mt-10">
            Join with another email
          </button>
        </div>
      ) : status === "duplicate" ? (
        <div className="py-6">
          <div className="focal focal-pulse mx-auto" style={{ width: 14, height: 14 }} />
          <p className="text-2xl font-semibold text-bone mt-8 mb-2 font-display">
            Already on the list.
          </p>
          <p className="text-dim leading-relaxed">{message}</p>
          {count !== null && (
            <p className="font-mono text-xs accent mt-5 tracking-widest">
              {(BASE_COUNT + count).toLocaleString()} on the list
            </p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="text-left">
          <div className="mb-2">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name — optional"
              autoComplete="name"
              maxLength={120}
              className="field"
            />
            <label htmlFor="name" className="mono-label block mt-3">
              Name
            </label>
          </div>
          <div className="mt-8">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailTouched(true);
              }}
              onBlur={() => setEmailTouched(true)}
              placeholder="you@email.com"
              autoComplete="email"
              required
              aria-invalid={emailError || undefined}
              className={`field ${emailError ? "has-error" : ""}`}
            />
            <label htmlFor="email" className="mono-label block mt-3">
              Email
            </label>
            {emailError && (
              <p className="text-sm text-[#ff7a7a] mt-3">Enter a valid email address.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="pill pill-solid w-full mt-12 justify-center disabled:opacity-50"
          >
            {status === "loading" ? (
              <>
                <Spinner /> Joining…
              </>
            ) : (
              <>
                Join the waitlist
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </>
            )}
          </button>

          {status === "error" && (
            <p className="text-sm text-[#ff7a7a] text-center mt-5">{message}</p>
          )}
        </form>
      )}
    </div>
  );
}

function SuccessMark() {
  return (
    <svg className="mx-auto" width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <circle cx="36" cy="36" r="34" stroke="rgba(68,144,255,0.35)" strokeWidth="1.5" strokeDasharray="4 5" />
      <circle cx="36" cy="36" r="25" fill="rgba(68,144,255,0.12)" />
      <path
        d="M26 37l7 7 14-15"
        stroke="#4490ff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="rgba(0,0,0,0.25)" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
