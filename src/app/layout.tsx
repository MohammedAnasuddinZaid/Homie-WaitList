import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://homie-waitlist.vercel.app"),
  title: "Homie — Your screen. Your AI.",
  description:
    "Homie is a free, open-source desktop copilot. One shortcut away — it sees your screen, reasons locally, and answers in place. No account. No upload.",
  keywords: ["homie", "ai copilot", "desktop assistant", "local ai", "open source", "ollama"],
  openGraph: {
    title: "Homie — Your screen. Your AI.",
    description:
      "A free, open-source desktop copilot. One shortcut away. Join the waitlist.",
    type: "website",
    url: "https://homie-waitlist.vercel.app",
    siteName: "Homie",
    images: [{ url: "/poster.jpg", width: 1280, height: 720, alt: "Homie film still" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Homie — Your screen. Your AI.",
    description: "A free, open-source desktop copilot. One shortcut away. Join the waitlist.",
    images: ["/poster.jpg"],
  },
  icons: { icon: "/icon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
