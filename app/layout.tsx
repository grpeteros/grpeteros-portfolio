"use client";
import { useState, useEffect, useRef } from "react";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Prefetched when the link is hovered or enters the viewport */}
        <nav className="flex gap-4 p-4 ">
          <Link href="/">Home</Link>
          <Link href="/accordion">Accordion</Link>
          <Link href="/dropdown/">Dropdown</Link>
          <div className="flex flex-row" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <Link className="flex flex-row" onClick={() => setIsOpen(!isOpen)} href="/text-input">Text Input
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            </Link>
            {isOpen && (
              <nav className="mt-2 w-48 bg-white text-slate-800 rounded-md shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <Link
                  href="/text-input/outlined"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-slate-100 transition"
                >
                  Outlined
                </Link>
                <Link
                  href="/text-input/filled"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-slate-100 transition"
                >
                  Filled
                </Link>
                <Link
                  href="/text-input/standard"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-slate-100 transition"
                >
                  Standard
                </Link>
              </nav>
            )}
          </div>
          {/* No prefetching */}
          <a href="/contact">Contact</a>
        </nav>
        {children}


      </body>
    </html>
  );
}
