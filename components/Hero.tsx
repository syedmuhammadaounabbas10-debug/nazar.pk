"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#2A2421]/10 bg-gradient-to-b from-[#F4EBE1] to-[#EAE1D7]">
      <div className="container mx-auto grid items-center gap-10 px-4 py-12 sm:px-6 md:min-h-[82vh] md:grid-cols-[1.15fr_.85fr] md:gap-10 md:py-20 lg:gap-16">

        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="pb-4"
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C87D53]/25 bg-[#C87D53]/10 px-4 py-1.5 text-[11px] font-semibold tracking-[.12em] normal-case text-[#C87D53] sm:mb-6 sm:tracking-[.22em]">
            Nazar.pk — Eyewear
          </p>

          <h1 className="text-3xl font-serif font-medium leading-[1.1] text-[#2A2421] tracking-tight sm:text-4xl md:text-6xl lg:text-7xl">
            Eyewear crafted <br />
            <span className="italic font-normal text-[#C87D53]">for clearer days.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#2A2421]/70 md:mt-8 md:text-lg">
            See better. Look better. Discover thoughtfully selected eyewear designed to combine timeless style, everyday comfort, and clear vision.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href="#shop"
              className="brand-button-primary inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium shadow-md transition-transform active:scale-[.98] sm:w-auto"
            >
              Shop Eyewear
              <ArrowUpRight size={18} />
            </a>
            <a
              href="#contact"
              className="brand-button-secondary inline-flex min-h-[48px] w-full items-center justify-center rounded-full px-8 py-3.5 text-sm font-medium transition-transform active:scale-[.98] sm:w-auto"
            >
              Contact Nazar.pk
            </a>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative flex justify-center"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#C87D53]/15 via-[#E2BC9B]/25 to-transparent blur-2xl -z-10" />

          <div className="hero-image-shadow relative w-full max-w-md overflow-hidden rounded-3xl border border-[#2A2421]/10 bg-[#EAE1D7]">
            <img
              src="/Images/products/image.png"
              alt="Nazar.pk premium eyewear frame"
              className="h-[280px] w-full object-cover object-center transition-transform duration-700 hover:scale-105 sm:h-[380px] md:h-[500px]"
            />

            <div className="glass-card absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl p-3 shadow-lg backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-4">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#C87D53] sm:text-xs">Featured Frame</p>
                <p className="truncate text-xs font-medium text-[#2A2421] sm:text-sm">Classic Matte Eyeglasses</p>
              </div>
              <span className="shrink-0 rounded-full bg-[#2A2421] px-3 py-1 text-xs font-semibold text-[#F4EBE1]">
                PKR 2,500
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
