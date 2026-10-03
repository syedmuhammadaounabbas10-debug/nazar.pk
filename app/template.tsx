"use client";

import { motion } from "framer-motion";
import { premiumEase } from "@/lib/motion";

/**
 * Next.js `template` re-mounts on every navigation, which gives every route a
 * smooth, consistent entrance without any routing/exit complexity.
 *
 * NOTE: opacity-only on purpose. This wrapper is an ancestor of the sticky
 * navbar (and its `position: fixed` mobile overlay), and a transform here would
 * create a containing block and break `position: sticky` / `fixed` children.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: premiumEase }}
    >
      {children}
    </motion.div>
  );
}