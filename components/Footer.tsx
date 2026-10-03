"use client";

import Link from "next/link";
import { Instagram, Music2 } from "lucide-react";
import Stagger, { StaggerItem } from "./motion/Stagger";
import Reveal from "./motion/Reveal";
import { business } from "@/lib/config";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

const supportLinks = [
  { href: "/contact", label: "Contact Us" },
  {
    href: `https://wa.me/${business.whatsapp}`,
    label: "WhatsApp",
    external: true,
  },
  { href: `mailto:${business.email}`, label: "Email" },
];

/** Shared link styling — a small slide on hover/focus reads as premium. */
const linkClass =
  "inline-flex min-h-[44px] items-center transition-[color,transform] duration-200 ease-out hover:translate-x-0.5 hover:text-[#C87D53] focus-visible:translate-x-0.5 focus-visible:text-[#C87D53]";

const socialClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2A2421]/12 bg-white/50 text-[#2A2421]/60 transition-[transform,background-color,color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:shadow-md active:scale-95";

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2421]/10 bg-[#F4EBE1]">
      <div className="container mx-auto px-4 py-10 sm:px-6 md:py-16">
        <Stagger
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]"
          stagger={0.08}
          amount={0.1}
        >
          {/* Brand */}
          <StaggerItem className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-serif text-xl font-bold tracking-tight text-[#2A2421] transition-opacity hover:opacity-90"
            >
              Nazar<span className="text-[#C87D53]">.pk</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#2A2421]/70">
              {business.tagline}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nazar.pk on Instagram"
                title="Instagram"
                className={`${socialClass} hover:bg-[#C87D53] hover:text-white`}
              >
                <Instagram size={18} aria-hidden="true" />
              </a>
              <a
                href={business.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nazar.pk on TikTok"
                title="TikTok"
                className={`${socialClass} hover:bg-[#2A2421] hover:text-white`}
              >
                <Music2 size={18} aria-hidden="true" />
              </a>
            </div>
          </StaggerItem>

          {/* Quick Links */}
          <StaggerItem>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#2A2421]/50">
              Quick Links
            </p>
            <ul className="flex flex-col text-sm text-[#2A2421]/70">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Support */}
          <StaggerItem>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#2A2421]/50">
              Customer Support
            </p>
            <ul className="flex flex-col text-sm text-[#2A2421]/70">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </StaggerItem>
        </Stagger>

        <Reveal
          y={12}
          amount={0}
          className="mt-10 flex flex-col items-center gap-2 border-t border-[#2A2421]/10 pt-7 text-center sm:mt-12 md:flex-row md:justify-between md:text-left"
        >
          <p className="text-xs text-[#2A2421]/45">
            © {new Date().getFullYear()} Nazar.pk. All rights reserved.
          </p>
          <p className="text-xs text-[#2A2421]/45">
            Cash on Delivery across Pakistan
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
