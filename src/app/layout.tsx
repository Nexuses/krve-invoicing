import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://e-invoicing.krvauditing.co"),
  title: "UAE e-Invoicing Compliance | KRV Auditing - FTA Approved Tax Agency",
  description: "Ensure UAE e-Invoicing compliance with KRV Auditing. FTA-approved tax agency with 20+ years experience. Avoid penalties up to AED 50,000. Get expert guidance for mandatory e-Invoicing registration.",
  keywords: ["UAE e-Invoicing", "FTA compliance", "e-Invoicing UAE", "KRV Auditing", "UAE tax compliance", "Federal Tax Authority", "e-Invoicing registration", "UAE VAT compliance"],
  icons: {
    icon: "/fevicon.png",
    apple: "/fevicon.png",
  },
  openGraph: {
    title: "UAE e-Invoicing Compliance | KRV Auditing - FTA Approved Tax Agency",
    description: "Ensure UAE e-Invoicing compliance with KRV Auditing. FTA-approved tax agency with 20+ years experience. Avoid penalties up to AED 50,000. Get expert guidance for mandatory e-Invoicing registration.",
    url: "https://e-invoicing.krvauditing.co",
    siteName: "KRV Auditing - UAE e-Invoicing",
    type: "website",
    locale: "en_US",
    images: [
      "https://krvauditing.s3.us-east-2.amazonaws.com/krv-logo-color.png",
      {
        url: "https://krvauditing.s3.us-east-2.amazonaws.com/krv-logo-color.png",
        width: 1200,
        height: 630,
        alt: "KRV Auditing - UAE e-Invoicing Compliance",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UAE e-Invoicing Compliance | KRV Auditing",
    description: "FTA-approved tax agency helping UAE businesses achieve e-Invoicing compliance. Avoid penalties up to AED 50,000.",
    images: {
      url: "https://krvauditing.s3.us-east-2.amazonaws.com/krv-logo-color.png",
      alt: "KRV Auditing - UAE e-Invoicing Compliance",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
