import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ComponentsWrapper from "./ComponentsWrapper";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mini Store",
  description: "ecommerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ComponentsWrapper>
          <Navbar />
          {children}
        </ComponentsWrapper>
      </body>
    </html>
  );
}
