"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import MotionLink from "./motion/MotionLink";
import { fadeUp, hoverLift, premiumEase, staggerContainer, tapPress } from "@/lib/motion";

/** Slightly larger travel than a standard block so the headline carries weight. */
const headlineLine: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: premiumEase } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  // Parallax is switched on after mount so the server HTML and the first client
  // render match (no hydration mismatch) and so `prefers-reduced-motion` users
  // never receive scroll-linked movement at all.
  const [parallax, setParallax] = useState(false);
  useEffect(() => {
    setParallax(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-[#2A2421]/10 bg-gradient-to-b from-[#F4EBE1] to-[#EAE1D7]"
    >
      <div className="container mx-auto grid items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 md:min-h-[82vh] md:grid-cols-[1.15fr_.85fr] md:gap-10 md:py-20 lg:gap-16">

        {/* Left Column */}
        <motion.div
          variants={staggerContainer(0.09, 0.05)}
          initial="hidden"
          animate="visible"
          className="pb-2 md:pb-4"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C87D53]/25 bg-[#C87D53]/10 px-4 py-1.5 text-[11px] font-semibold tracking-[.1em] text-[#C87D53] sm:mb-6 sm:tracking-[.2em]"
          >
            Nazar.pk — Eyewear
          </motion.p>

          <h1 className="font-serif text-[2rem] font-medium leading-[1.1] tracking-tight text-[#2A2421] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <motion.span variants={headlineLine} className="block">
              Eyewear crafted
            </motion.span>
            <motion.span
              variants={headlineLine}
              className="block italic font-normal text-[#C87D53]"
            >
              for clearer days.
            </motion.span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-lg text-sm leading-relaxed text-[#2A2421]/70 sm:mt-6 sm:text-base md:mt-8 md:text-lg"
          >
            See better. Look better. Discover thoughtfully selected eyewear designed to combine timeless style, everyday comfort, and clear vision.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <MotionLink
              href="/shop"
              whileHover={hoverLift}
              whileTap={tapPress}
              className="brand-button-primary group/cta inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold shadow-md sm:w-auto sm:min-h-[48px] sm:py-3.5"
            >
              Shop Eyewear
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              />
            </MotionLink>
            <MotionLink
              href="/contact"
              whileHover={hoverLift}
              whileTap={tapPress}
              className="brand-button-secondary inline-flex min-h-[52px] w-full items-center justify-center rounded-full px-8 py-4 text-sm font-medium sm:w-auto sm:min-h-[48px] sm:py-3.5"
            >
              Contact Nazar.pk
            </MotionLink>
          </motion.div>

          {/* Trust badges — mobile visible */}
          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center gap-4 text-xs text-[#2A2421]/50 sm:mt-8"
          >
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C87D53]/60" />
              Cash on Delivery
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C87D53]/60" />
              Nationwide Delivery
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C87D53]/60" />
              Premium Quality
            </span>
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: premiumEase }}
          className="relative flex justify-center"
        >
          <motion.div
            aria-hidden="true"
            style={parallax ? { y: glowY } : undefined}
            className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-[#C87D53]/15 via-[#E2BC9B]/25 to-transparent blur-2xl"
          />

          <motion.div
            style={parallax ? { y: imageY } : undefined}
            className="hero-image-shadow relative w-full max-w-sm overflow-hidden rounded-3xl border border-[#2A2421]/10 bg-[#EAE1D7] sm:max-w-md"
          >
            <Link href="/products/classic-frame-glasses" className="block group">
              <img
                src="/Images/products/image.png"
                alt="Nazar.pk premium eyewear frame — Classic Frame Glasses"
                className="h-[260px] w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[340px] md:h-[460px] lg:h-[520px]"
              />

              <div className="glass-card absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl p-3 shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1 sm:inset-x-4 sm:bottom-4 sm:p-4">
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#C87D53] sm:text-[10px]">Featured Frame</p>
                  <p className="truncate text-xs font-semibold text-[#2A2421] sm:text-sm">Classic Frame Glasses</p>
                </div>
                <span className="shrink-0 rounded-full bg-[#2A2421] px-3 py-1 text-[11px] font-bold text-[#F4EBE1] sm:text-xs">
                  PKR 2,500
                </span>
              </div>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
