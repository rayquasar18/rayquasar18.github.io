import type { Metadata } from "next";
import "./globals.css";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const MarlinGeoSQ_Regular = localFont({
  src: "./fonts/MarlinGeoSQ-Regular.woff",
  display: "swap",
  variable: "--MarlinGeoSQ_Regular",
});
const MarlinGeoSQ_Medium = localFont({
  src: "./fonts/MarlinGeoSQ-Medium.woff",
  display: "swap",
  variable: "--MarlinGeoSQ-Medium",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://rayquasar18.github.io/"),
  title: {
    default: "QuanMofii",
    template: "Hà Minh Quân",
  },
  description:
    "Hà Minh Quân Portfolio | QuanMofii, AI engineer in NLP, LLMs, and chatbots with projects in chatbot and language tech.",
  keywords: [
    "Hà Minh Quân",
    "Ha Minh Quan",
    "QuanMofii",
    "AI Engineer",
    "Chatbot Developer",
    "LLM Specialist",
    "AI Agent Developer",
    "NLP Engineer",
    "Frontend Design",
    "Backend Architect",
    "Deploy AI",
    "Large Language Models",
    "Conversational AI",
    "Hà Minh Quân Portfolio",
    "QuanMofii Portfolio",
    "Vietnam AI Engineer",
  ],
  authors: [
    {
      name: "QuanMofii",
      url: "https://rayquasar18.github.io/",
    },
  ],
  creator: "QuanMofii",
  publisher: "QuanMofii",
  alternates: {
    canonical: "/",
    languages: {
      "vi-VN": "/vi",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "vi-VN",
    url: "https://rayquasar18.github.io/",
    siteName: "Hà Minh Quân Portfolio | QuanMofii",
    title: "Hà Minh Quân Portfolio | QuanMofii",
    description:
      "Hà Minh Quân Portfolio | QuanMofii, AI engineer in NLP, LLMs, and chatbots.",
    images: [
      {
        url: "https://rayquasar18.github.io/share_img.png",
        width: 1200,
        height: 630,
        alt: "Hà Minh Quân Portfolio | QuanMofii, AI engineer in NLP, LLMs, and chatbots.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hà Minh Quân Portfolio | QuanMofii",
    description:
      "Hà Minh Quân Portfolio | QuanMofii, AI engineer in NLP, LLMs, and chatbots.",
    creator: "@QuanMofii",
    images: ["https://rayquasar18.github.io/share_img.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,

      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "ZZkPNFkZS-d1KtXlcA9ri2j9YP0WepMMkPfCln9Qcik",
    yandex: "",
  },
  icons: {
    icon: "favicon.ico",
    shortcut: "favicon-16x16.png",
    apple: "apple-touch-icon.png",
    other: [{ rel: "mask-icon", url: "safari-pinned-tab.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ha Minh Quan",
              alternateName: "QuanMofii",
              url: "https://rayquasar18.github.io/",
              image: "https://rayquasar18.github.io/avatar.jpg",
              jobTitle: "AI Engineer | Chatbot Developer | LLM Specialist",
              worksFor: {
                "@type": "Organization",
                name: "QuanMofii",
              },
              sameAs: [
                "https://github.com/rayquasar18",
                "https://www.linkedin.com/in/ha-minh-quan-b10717294/",
                "https://x.com/QuanMofii",
              ],
              description:
                "Hà Minh Quân is an AI Engineer dedicated to developing Chatbots, LLMs, AI Agents, and NLP-driven intelligent solutions.",
            }),
          }}
        />
      </head>
      <body
        className={`${MarlinGeoSQ_Regular.className} ${geistMono.className} ${MarlinGeoSQ_Medium.variable}  antialiased text-black `}
      >
        <Header />
        {children}
        <LoadingScreen />
        <Footer />
      </body>
    </html>
  );
}
