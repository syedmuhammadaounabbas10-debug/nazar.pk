"use client";

import { MotionConfig } from "framer-motion";

/**
 * Makes every Framer Motion animation on Nazar.pk respect the visitor's
 * `prefers-reduced-motion` setting.
 *
 * With `reducedMotion="user"` Framer Motion skips transform + layout
 * animations entirely (they snap to their final value) while still allowing
 * opacity fades, so content is always readable and never stuck offscreen.
 * This is a single, global opt-in — individual components keep their normal
 * animation code.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}