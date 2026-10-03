"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import MotionLink from "./motion/MotionLink";
import {
  fadeUp,
  hoverLift,
  indicatorSpring,
  premiumEase,
  staggerContainer,
  tapPress,
} from "@/lib/motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#2A2421]/10 bg-[#F4EBE1]/95 backdrop-blur-md">
      {/*
        The entrance transform lives on this inner bar only — never on
        <header> itself, because a transformed ancestor becomes the containing
        block for the `fixed` mobile overlay rendered below.
      */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: premiumEase }}
        className="container mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:h-20 sm:gap-4 sm:px-6"
      >
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 font-serif text-xl font-bold tracking-tight text-[#2A2421] transition-opacity hover:opacity-90 sm:text-2xl"
        >
          Nazar<span className="text-[#C87D53]">.pk</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative py-2 text-sm font-medium transition-colors hover:text-[#C87D53] ${
                  isActive ? "text-[#C87D53]" : "text-[#2A2421]/80"
                }`}
              >
                {link.label}
                {/* Animated active indicator — slides between links */}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-underline"
                    transition={indicatorSpring}
                    className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-[#C87D53]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop CTA */}
          <MotionLink
            href="/shop"
            whileHover={hoverLift}
            whileTap={tapPress}
            className="hidden items-center gap-2 rounded-full bg-[#2A2421] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F4EBE1] transition-colors hover:bg-[#C87D53] sm:inline-flex"
          >
            <ShoppingBag size={14} />
            Shop Now
          </MotionLink>

          {/* Mobile toggle */}
          <motion.button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((prev) => !prev)}
            whileTap={{ scale: 0.9 }}
            className="-mr-1 inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#2A2421]/80 transition-colors hover:bg-[#2A2421]/5 md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="inline-flex"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="navbar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: premiumEase }}
            className="fixed inset-x-0 top-16 z-40 h-[100dvh] bg-[#2A2421]/25 md:hidden"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="navbar-drawer"
            id="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: premiumEase }}
            className="absolute left-0 right-0 z-50 border-t border-[#2A2421]/10 bg-[#F4EBE1] shadow-xl md:hidden"
          >
            <motion.div
              variants={staggerContainer(0.05, 0.04)}
              initial="hidden"
              animate="visible"
              className="container mx-auto flex flex-col px-4 py-4 sm:px-6"
            >
              {links.map((link) => (
                <motion.div key={link.href} variants={fadeUp}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={`-mx-2 flex min-h-[52px] items-center rounded-xl px-4 text-base font-medium transition-colors hover:bg-[#2A2421]/5 hover:text-[#C87D53] ${
                      pathname === link.href ? "text-[#C87D53]" : "text-[#2A2421]/85"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={fadeUp} className="my-3 h-px bg-[#2A2421]/10" />
              <motion.div variants={fadeUp}>
                <MotionLink
                  href="/shop"
                  onClick={() => setOpen(false)}
                  whileTap={tapPress}
                  className="flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#2A2421] px-5 text-sm font-semibold uppercase tracking-wider text-[#F4EBE1] transition-colors hover:bg-[#C87D53]"
                >
                  <ShoppingBag size={16} />
                  Shop Now
                </MotionLink>
              </motion.div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
