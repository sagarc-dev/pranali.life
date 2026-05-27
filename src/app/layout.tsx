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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
