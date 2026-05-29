import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/shared/CustomCursor";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://pranali.life"),
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
    images: [
      {
        url: "/pranali/in_blue_air_india_uniform.jpg",
        width: 1200,
        height: 630,
        alt: "Pranali Chahande in official Air India cabin crew uniform",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranali Chahande — Journey Through the Skies",
    images: ["/pranali/in_blue_air_india_uniform.jpg"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Pranali Chahande",
                "jobTitle": "Cabin Crew",
                "worksFor": {
                  "@type": "Organization",
                  "name": "Air India",
                  "sameAs": "https://en.wikipedia.org/wiki/Air_India"
                },
                "url": "https://pranali.life",
                "sameAs": [
                  "https://www.instagram.com/__pranaliii___/"
                ],
                "description": "From nursing theatres to the skies — the cinematic journey of Pranali Chahande, Air India cabin crew."
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Who is Pranali Chahande?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Pranali Chahande is a professional cabin crew member for Air India. She transitioned from a dedicated career as a theatre nurse to representing the Air India brand globally in the skies."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What airline does Pranali Chahande work for?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Pranali Chahande works as a cabin crew member for Air India."
                    }
                  }
                ]
              }
            ])
          }}
        />
      </head>
      <body>
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
