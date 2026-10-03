"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import { fadeUp, staggerContainer, viewportGrid } from "@/lib/motion";

interface ProductGridProps {
  products: Product[];
  /** Grid layout classes (columns + gaps). */
  className?: string;
}

/**
 * Shared animated product grid used by the home page and the shop page.
 *
 * - Cards stagger in when the grid enters the viewport.
 * - `layout` on the container + `popLayout` exits keep the grid reflow smooth
 *   while the shop filters/search change, instead of snapping.
 */
export default function ProductGrid({ products, className }: ProductGridProps) {
  return (
    <motion.div
      layout
      variants={staggerContainer(0.07, 0.03)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportGrid}
      className={className}
    >
      {/*
        Default AnimatePresence mode: the leaving card keeps its grid slot while
        it fades out, then the remaining cards animate into place via
        `layout="position"`. This keeps the reflow smooth without popping the
        exiting card out of the CSS grid.
      */}
      <AnimatePresence>
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout="position"
            variants={fadeUp}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
            className="h-full"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}