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
  title: "UAE e-Invoicing Compliance | KRV Auditing - FTA Approved Tax Agency",
  description: "Ensure UAE e-Invoicing compliance with KRV Auditing. FTA-approved tax agency with 20+ years experience. Avoid penalties up to AED 50,000. Get expert guidance for mandatory e-Invoicing registration.",
  keywords: ["UAE e-Invoicing", "FTA compliance", "e-Invoicing UAE", "KRV Auditing", "UAE tax compliance", "Federal Tax Authority", "e-Invoicing registration", "UAE VAT compliance"],
  icons: {
    icon: "/fevicon.png",
    apple: "/fevicon.png",
  },
  openGraph: {
    title: "UAE e-Invoicing Compliance | KRV Auditing - FTA Approved Tax Agency",
    description: "Ensure UAE e-Invoicing compliance with KRV Auditing. FTA-approved tax agency with 20+ years experience. Avoid penalties up to AED 50,000.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "UAE e-Invoicing Compliance | KRV Auditing",
    description: "FTA-approved tax agency helping UAE businesses achieve e-Invoicing compliance. Avoid penalties up to AED 50,000.",
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
