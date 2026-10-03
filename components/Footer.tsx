"use client";

import Link from "next/link";
import { Instagram, Music2 } from "lucide-react";
import { business } from "@/lib/config";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

const supportLinks = [
  { href: "/contact", label: "Contact Us" },
  { href: `https://wa.me/${business.whatsapp}`, label: "WhatsApp", external: true },
  { href: `mailto:${business.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2421]/10 bg-[#F4EBE1]">
      <div className="container mx-auto px-4 py-12 sm:px-6 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-xl font-serif font-bold tracking-tight text-[#2A2421]">
              Nazar<span className="text-[#C87D53]">.pk</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#2A2421]/70">
              {business.tagline}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nazar.pk on Instagram"
                title="Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2A2421]/12 bg-white/50 text-[#2A2421]/60 transition-colors hover:bg-[#C87D53] hover:text-white hover:shadow-md"
              >
                <Instagram size={18} />
              </a>
              <a
                href={business.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nazar.pk on TikTok"
                title="TikTok"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2A2421]/12 bg-white/50 text-[#2A2421]/60 transition-colors hover:bg-[#2A2421] hover:text-white hover:shadow-md"
              >
                <Music2 size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[.2em] text-[#2A2421]/50">
              Quick Links
            </p>
            <ul className="flex flex-col text-sm text-[#2A2421]/70">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center transition-colors hover:text-[#C87D53]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[.2em] text-[#2A2421]/50">
              Customer Support
            </p>
            <ul className="flex flex-col text-sm text-[#2A2421]/70">
              {supportLinks.map(link => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center transition-colors hover:text-[#C87D53]"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="inline-flex min-h-[44px] items-center transition-colors hover:text-[#C87D53]"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-[#2A2421]/10 pt-8 text-center sm:mt-12 md:flex-row md:justify-between md:text-left">
          <p className="text-xs text-[#2A2421]/45">
            © {new Date().getFullYear()} Nazar.pk. All rights reserved.
          </p>
          <p className="text-xs text-[#2A2421]/45">Cash on Delivery across Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
