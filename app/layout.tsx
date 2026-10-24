"use client";
import { useState, useEffect, useRef } from "react";

import type { Metadata } from "next";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import { permanentRedirect, redirect } from "next/navigation";

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
  useEffect(() => {
    const pathName = window.location.pathname;
    setPath(pathName);
  }, [])
  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState('')


  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col dark">
        {/* Prefetched when the link is hovered or enters the viewport */}
        <nav className="flex gap-4 p-4 nav-bar">
          <Link href="/">Home</Link>
          {/* <Link href="/accordion">Accordion</Link>
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
            {
            isOpen && 
            (
              <nav className="nav-links mt-2 w-48 bg-white text-slate-800 rounded-md shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150" 
               >
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
            )
            }
          </div> */}
          {/* No prefetching */}
          <a href="/contact">Contact</a>
          <Link href="/projects">Projects</Link>
          {process.env.NEXT_PUBLIC_SHOW_ALL_ROUTES === 'true' && (
            <Link href="/products" onClick={() => {
              redirect('/products')
            }}>Products</Link>
          )}
          {process.env.NEXT_PUBLIC_SHOW_ALL_ROUTES === 'true' && <Link href="/sales">Sales</Link>}
          <div style={{ marginLeft: 'auto' }}>
            {process.env.NEXT_PUBLIC_SHOW_ADD && (path === '/products' || path === '/products/add') && <AddIcon onClick={() => { redirect('/products/add') }} className={`mr-5 cursor-pointer`} style={{ width: 35, height: 35 }} />}
            {process.env.NEXT_PUBLIC_SHOW_ALL_ROUTES == 'true' && <ShoppingCartIcon className="cursor-pointer shopping-cart-icon" onClick={() => { window.location.href = '/cart' }}  style={{ width: 35, height: 35 }} />}
          </div>


        </nav>
        <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
          {children}
        </div>


        <div>
          <footer className="flex flex-row gap-4 p-4 text-sm text-zinc-950 dark:text-zinc-50">
            <p>Powered by </p><Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
            />
          </footer>
        </div>
      </body>
    </html>
  );
}
