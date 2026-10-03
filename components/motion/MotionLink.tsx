"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Next.js `<Link>` with Framer Motion interaction props (`whileHover`,
 * `whileTap`, ...) so CTAs can have micro-interactions without losing
 * client-side navigation.
 */
const MotionLink = motion.create(Link);

export default MotionLink;