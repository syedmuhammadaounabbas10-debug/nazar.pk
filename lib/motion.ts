import type { Transition, Variants } from "framer-motion";

/**
 * SHARED MOTION TOKENS — Nazar.pk
 *
 * Centralising easing/distance/duration keeps the whole site feeling like one
 * product instead of a set of unrelated animations. Every value here is
 * deliberately subtle: short travel, moderate duration, no bounce or overshoot,
 * and only GPU-friendly properties (opacity / transform).
 */

/** Calm, "expensive" easing (easeOutQuint-ish) used for entrances. */
export const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Slightly snappier easing reserved for micro-interactions. */
export const microEase: [number, number, number, number] = [0.32, 0.72, 0, 1];

/** Fade + small rise. The default reveal for sections and content blocks. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: premiumEase },
  },
};

/** Fade only — used where a transform must not be introduced. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: premiumEase } },
};

/** Fade + subtle scale. Used for badges, icons and confirmation moments. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: premiumEase },
  },
};

/** Parent variant that reveals its children one after another. */
export function staggerContainer(staggerChildren = 0.06, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}

/** Reveal once, slightly before the element is fully in view. */
export const viewportOnce = { once: true, amount: 0.2 };

/** Reveal-once config tuned for taller grids so they still fire on small screens. */
export const viewportGrid = { once: true, amount: 0.08 };

/** Micro-interaction presets for buttons and links. */
export const hoverLift = { y: -2 };
export const tapPress = { scale: 0.97 };

/** Spring used by sliding indicators (nav underline, filter pill, gallery ring). */
export const indicatorSpring: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 32,
};