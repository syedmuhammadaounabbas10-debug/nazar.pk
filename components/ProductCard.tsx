"use client";

import Link from "next/link";
import { type Product } from "@/lib/products";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-[#F4EBE1]">
        <img
          src={product.image || "/Images/products/image.png"}
          alt={`${product.name} by Nazar.pk`}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-[#F4EBE1]/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#C87D53] backdrop-blur-md sm:left-4 sm:top-4 sm:text-xs">
          {product.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <Link href={`/products/${product.slug}`} className="hover:underline">
            <h3 className="text-lg font-serif font-medium text-[#2A2421] sm:text-xl">
              {product.name}
            </h3>
          </Link>
          {product.description && (
            <p className="mt-2 line-clamp-2 text-sm text-[#2A2421]/70">
              {product.description}
            </p>
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#2A2421]/10 pt-4 sm:mt-6">
          <div className="flex min-w-0 flex-wrap items-baseline gap-2">
            <span className="text-base font-semibold text-[#2A2421] sm:text-lg">
              {product.price != null ? `PKR ${product.price.toLocaleString("en-PK")}` : "Price on request"}
            </span>
            {product.compareAtPrice != null && (
              <span className="text-xs text-[#2A2421]/40 line-through">
                PKR {product.compareAtPrice.toLocaleString("en-PK")}
              </span>
            )}
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full bg-[#2A2421] px-5 py-2.5 text-sm font-semibold text-[#F4EBE1] transition-all duration-300 hover:bg-[#C87D53] active:scale-[.98] sm:px-6 sm:py-3"
          >
            View Product
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
