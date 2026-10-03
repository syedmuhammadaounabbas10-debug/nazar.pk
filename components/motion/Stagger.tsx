"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  /** Delay between each child's entrance, in seconds (keep <= 0.08). */
  stagger?: number;
  /** Delay before the first child animates, in seconds. */
  delayChildren?: number;
  /** Portion of the container that must be visible before animating. */
  amount?: number;
}

/**
 * Container that reveals its `StaggerItem` children in sequence when it
 * scrolls into view. Used for product grids, contact cards, footer columns.
 */
export default function Stagger({
  children,
  className,
  stagger = 0.06,
  delayChildren = 0,
  amount = 0.15,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

/** A child of `Stagger` — inherits the parent's sequenced reveal. */
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}