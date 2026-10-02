"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#2A2421]/10 bg-gradient-to-b from-[#F4EBE1] to-[#EAE1D7]">
      <div className="container mx-auto grid min-h-[82vh] items-center gap-10 px-6 py-12 md:grid-cols-[1.15fr_.85fr] md:py-20 lg:gap-16">
        
        {/* Left Column */}
        <motion.div 
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="pb-4"
        >
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C87D53]/25 bg-[#C87D53]/10 px-4 py-1.5 text-[11px] font-semibold tracking-[.22em] uppercase text-[#C87D53]">
            Nazar.pk — Eyewear
          </p>
          
          <h1 className="text-5xl font-serif font-medium leading-[1.05] text-[#2A2421] md:text-6xl lg:text-7xl tracking-tight">
            Eyewear crafted <br />
            <span className="italic font-normal text-[#C87D53]">for clearer days.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#2A2421]/70 md:mt-8 md:text-lg">
            See better. Look better. Discover thoughtfully selected eyewear designed to combine timeless style, everyday comfort, and clear vision.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a 
              href="#shop" 
              className="brand-button-primary inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium shadow-md"
            >
              Shop Eyewear
              <ArrowUpRight size={18} />
            </a>
            <a 
              href="#contact" 
              className="brand-button-secondary rounded-full px-8 py-3.5 text-sm font-medium"
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
              alt="Nazar.pk Premium Eyewear" 
              className="h-[420px] w-full object-cover object-center transition-transform duration-700 hover:scale-105 md:h-[500px]"
            />
            
            <div className="glass-card absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl p-4 shadow-lg backdrop-blur-md">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#C87D53]">Featured Frame</p>
                <p className="text-sm font-medium text-[#2A2421]">Classic Matte Eyeglasses</p>
              </div>
              <span className="rounded-full bg-[#2A2421] px-3 py-1 text-xs font-semibold text-[#F4EBE1]">
                PKR 2,500
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
