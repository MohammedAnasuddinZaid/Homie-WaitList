import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Homie — Waitlist",
  description: "A free, local-first desktop copilot. One shortcut away. Join the waitlist.",
  openGraph: {
    title: "Homie — Waitlist",
    description: "A free, local-first desktop copilot. One shortcut away.",
    type: "website",
  },
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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
