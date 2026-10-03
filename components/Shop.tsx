"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import ProductGrid from "./ProductGrid";
import Reveal from "./motion/Reveal";
import { ArrowRight } from "lucide-react";

export default function Shop() {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#2A2421]/20 bg-[#EAE1D7]/50 p-8 text-center sm:p-12">
        <p className="text-base font-medium text-[#2A2421]/80">
          No products added yet. Add items in{" "}
          <code className="rounded bg-[#2A2421]/10 px-2 py-1 text-xs">
            lib/products.ts
          </code>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 sm:space-y-12 md:space-y-16">
      {/* 2-column on mobile, 3-column on large desktop. Cards stagger in. */}
      <ProductGrid
        products={products.slice(0, 6)}
        className="grid grid-cols-2 gap-4 sm:gap-6 sm:gap-y-8 lg:grid-cols-3"
      />

      <Reveal className="pt-2 text-center sm:pt-4">
        <Link
          href="/shop"
          className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#2A2421]/20 bg-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#2A2421] transition-[background-color,color,border-color,transform] duration-300 hover:border-[#2A2421] hover:bg-[#2A2421] hover:text-[#F4EBE1] active:scale-95 sm:px-8"
        >
          <span>Explore All Frames in Shop</span>
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </Reveal>
    </div>
  );
}