"use client";

import { motion } from "framer-motion";
import { premiumEase } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before the reveal starts (used to sequence blocks). */
  delay?: number;
  /** Vertical travel in px. Keep <= 24 so it reads as a fade, not a slide. */
  y?: number;
  /** Only animate the first time the element enters the viewport. */
  once?: boolean;
  /** Portion of the element that must be visible before animating. */
  amount?: number;
}

/**
 * Fade + rise when the element scrolls into view.
 *
 * Client component so it can be dropped into Server Components (e.g. the
 * product detail page) without turning the whole page into a client module.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  once = true,
  amount = 0.2,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.55, delay, ease: premiumEase }}
    >
      {children}
    </motion.div>
  );
}