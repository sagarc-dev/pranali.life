import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pranali Chahande — Journey Through the Skies | Air India Cabin Crew",
  description:
    "From nursing theatres to the skies — the cinematic journey of Pranali Chahande, Air India cabin crew. A story of transformation, courage, and elegance.",
  keywords: [
    "Air India flight attendant",
    "cabin crew portfolio",
    "travel influencer India",
    "aviation lifestyle",
    "flight attendant journey",
  ],
  openGraph: {
    title: "Pranali Chahande — Journey Through the Skies",
    description: "A cinematic portfolio of transformation, courage, and elegance.",
    type: "website",
    url: "https://pranali.life",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranali Chahande — Journey Through the Skies",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* 
          Font Strategy — Air India Aesthetic:
          • Playfair Display  → Cinematic serif for headings & poetry (high contrast, elegant luxury)
          • DM Sans           → Humanist sans for body (warm, premium — closest free match to Air India Sans)
          • Space Grotesk     → Refined geometric for labels & mono callouts (boarding pass, data)
        */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
