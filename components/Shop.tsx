"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";

export default function Shop() {
  return (
    <div className="space-y-12 sm:space-y-16">
      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#2A2421]/20 bg-[#EAE1D7]/50 p-8 text-center sm:p-12">
          <p className="text-base font-medium text-[#2A2421]/80">
            No products added yet. Add items in <code className="rounded bg-[#2A2421]/10 px-2 py-1 text-xs">lib/products.ts</code>.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {products.slice(0, 6).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          <div className="text-center pt-4 sm:pt-6">
            <Link
              href="/shop"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#2A2421]/20 bg-white/30 px-8 py-3 text-xs font-semibold uppercase tracking-wider text-[#2A2421] transition-all hover:bg-[#2A2421] hover:text-[#F4EBE1] active:scale-95"
            >
              <span>Explore All Frames in Shop</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}