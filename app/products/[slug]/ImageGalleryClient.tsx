"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { indicatorSpring, premiumEase } from "@/lib/motion";

interface ImageGalleryClientProps {
  images: string[];
  productName: string;
}

export default function ImageGalleryClient({
  images,
  productName,
}: ImageGalleryClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] || "/Images/products/image.png";

  function prev() {
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }

  function next() {
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Image — crossfades between selections */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] sm:rounded-3xl">
        <AnimatePresence initial={false}>
          <motion.img
            key={activeIndex}
            src={activeImage}
            alt={`${productName} — View ${activeIndex + 1}`}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: premiumEase }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Navigation arrows — only if multiple images.
            Centred with inset-y-0 + my-auto so Framer Motion's scale
            micro-interaction never collides with a translate utility. */}
        {images.length > 1 && (
          <>
            <motion.button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="absolute left-2 inset-y-0 my-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#2A2421] shadow-md backdrop-blur-sm transition-colors hover:bg-white hover:shadow-lg sm:left-3 sm:h-10 sm:w-10"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </motion.button>
            <motion.button
              type="button"
              onClick={next}
              aria-label="Next image"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="absolute right-2 inset-y-0 my-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#2A2421] shadow-md backdrop-blur-sm transition-colors hover:bg-white hover:shadow-lg sm:right-3 sm:h-10 sm:w-10"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </motion.button>
          </>
        )}

        {/* Dot indicator on mobile */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 sm:hidden">
            {images.map((_, i) => (
              <motion.button
                key={i}
                type="button"
                aria-label={`View image ${i + 1}`}
                aria-pressed={i === activeIndex}
                onClick={() => setActiveIndex(i)}
                whileTap={{ scale: 0.9 }}
                className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                  i === activeIndex ? "w-5 bg-[#C87D53]" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails — hidden on mobile, shown on sm+ */}
      {images.length > 1 && (
        <div className="hidden gap-3 sm:flex">
          {images.map((img, idx) => (
            <motion.button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`View image ${idx + 1}`}
              aria-pressed={activeIndex === idx}
              whileTap={{ scale: 0.94 }}
              className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl border border-[#2A2421]/10 transition-colors duration-200 ${
                activeIndex === idx
                  ? "border-transparent"
                  : "hover:border-[#2A2421]/30"
              }`}
            >
              <img
                src={img}
                alt={`${productName} Thumbnail ${idx + 1}`}
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
              {/* Active thumbnail ring slides between thumbnails */}
              {activeIndex === idx && (
                <motion.span
                  layoutId="gallery-active-thumb"
                  transition={indicatorSpring}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-xl border-2 border-[#C87D53]"
                />
              )}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
