import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aventura de Favo",
  description: "Projeto de PA greedy algorithms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${pressStart2P.className} relative min-h-full flex flex-col`}>
          <img src={'/background-better.avif'} className="absolute h-full w-full z-0 object-cover"/>
          {children}
        </body>
    </html>
  );
}
