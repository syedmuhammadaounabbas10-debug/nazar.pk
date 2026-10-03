"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#2A2421]/10 bg-[#F4EBE1]/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:h-20 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 text-xl font-serif font-bold tracking-tight text-[#2A2421] transition-opacity hover:opacity-90 sm:text-2xl"
        >
          Nazar<span className="text-[#C87D53]">.pk</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#2A2421]/80 transition-colors hover:text-[#C87D53]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/shop"
            className="hidden items-center gap-2 rounded-full bg-[#2A2421] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F4EBE1] transition-colors hover:bg-[#C87D53] active:scale-95 sm:inline-flex"
          >
            <ShoppingBag size={14} />
            Order Now
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(prev => !prev)}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#2A2421]/80 transition-colors hover:bg-[#2A2421]/5 active:scale-95 md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-[#2A2421]/10 bg-[#F4EBE1] md:hidden animate-in fade-in slide-in-from-top-2 duration-200"
          aria-label="Mobile navigation"
        >
          <div className="container mx-auto flex flex-col px-4 py-3 sm:px-6">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="-mx-2 flex min-h-[48px] items-center rounded-lg px-3 text-base font-medium text-[#2A2421]/85 transition-colors hover:bg-[#2A2421]/5 hover:text-[#C87D53]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="-mx-2 my-2 flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#2A2421] px-5 text-xs font-semibold uppercase tracking-wider text-[#F4EBE1] transition-colors hover:bg-[#C87D53]"
            >
              <ShoppingBag size={14} />
              Order Now
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
