"use client";

import Link from "next/link";
import { Instagram, Music2 } from "lucide-react";
import { business } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2421]/10 bg-[#F4EBE1]">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          
          {/* Brand */}
          <div>
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
                aria-label="Instagram"
                className="rounded-full border border-[#2A2421]/12 bg-white/50 p-2.5 text-[#2A2421]/60 transition-colors hover:bg-[#C87D53] hover:text-white hover:shadow-md"
              >
                <Instagram size={16} />
              </a>
              <a
                href={business.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="rounded-full border border-[#2A2421]/12 bg-white/50 p-2.5 text-[#2A2421]/60 transition-colors hover:bg-[#2A2421] hover:text-white hover:shadow-md"
              >
                <Music2 size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="mb-4 text-xs font-semibold tracking-[.2em] uppercase text-[#2A2421]/50">Shop</p>
            <ul className="flex flex-col gap-3 text-sm text-[#2A2421]/70">
              <li><Link href="#shop" className="hover:text-[#C87D53]">Shop</Link></li>
              <li><Link href="#contact" className="hover:text-[#C87D53]">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="mb-4 text-xs font-semibold tracking-[.2em] uppercase text-[#2A2421]/50">Support</p>
            <ul className="flex flex-col gap-3 text-sm text-[#2A2421]/70">
              <li>
                <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#C87D53]">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="hover:text-[#C87D53]">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-[#2A2421]/10 pt-8 md:flex-row">
          <p className="text-xs text-[#2A2421]/45">© {new Date().getFullYear()} Nazar.pk. All rights reserved.</p>
          <p className="text-xs text-[#2A2421]/45">Cash on Delivery across Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
