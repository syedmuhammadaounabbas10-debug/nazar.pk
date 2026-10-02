"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#2A2421]/10 bg-[#F4EBE1]/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="text-2xl font-serif font-bold tracking-tight text-[#2A2421]">
          Nazar<span className="text-[#C87D53]">.pk</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#shop" className="text-sm font-medium text-[#2A2421]/80 transition-colors hover:text-[#C87D53]">Shop</Link>
          <Link href="#order" className="text-sm font-medium text-[#2A2421]/80 transition-colors hover:text-[#C87D53]">How to Order</Link>
          <Link href="#contact" className="text-sm font-medium text-[#2A2421]/80 transition-colors hover:text-[#C87D53]">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <a 
            href="#shop" 
            className="inline-flex items-center gap-2 rounded-full bg-[#2A2421] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#F4EBE1] transition-colors hover:bg-[#C87D53]"
          >
            <ShoppingBag size={14} />
            Order Now
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-[#2A2421]/80 hover:bg-[#2A2421]/5"
          >
            {open ? <X size={20} /> : <ShoppingBag size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden border-t border-[#2A2421]/10 bg-[#F4EBE1] px-6 py-4" aria-label="Mobile navigation">
          <div className="flex flex-col gap-4">
            <Link href="#shop" onClick={() => setOpen(false)} className="text-sm font-medium text-[#2A2421]/80 hover:text-[#C87D53]">Shop</Link>
            <Link href="#order" onClick={() => setOpen(false)} className="text-sm font-medium text-[#2A2421]/80 hover:text-[#C87D53]">How to Order</Link>
            <Link href="#contact" onClick={() => setOpen(false)} className="text-sm font-medium text-[#2A2421]/80 hover:text-[#C87D53]">Contact</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
