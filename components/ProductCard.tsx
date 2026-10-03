"use client";

import Link from "next/link";
import { type Product } from "@/lib/products";
import { ArrowUpRight } from "lucide-react";
import MotionLink from "./motion/MotionLink";
import { tapPress } from "@/lib/motion";

interface ProductCardProps {
  product: Product;
}

/**
 * Card entrance/stagger is driven by the parent <ProductGrid />, so this stays
 * a plain article. Hover elevation + image zoom use CSS transitions (GPU
 * friendly) which avoids fighting Framer Motion's layout projection.
 */
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-[#2A2421]/20 hover:shadow-xl focus-within:-translate-y-1.5 focus-within:shadow-xl">
      {/* Product Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-[#F4EBE1] sm:aspect-square"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.image || "/Images/products/image.png"}
          alt={`${product.name} by Nazar.pk`}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-[#F4EBE1]/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#C87D53] backdrop-blur-md sm:left-4 sm:top-4 sm:text-[11px]">
          {product.category}
        </span>
        {product.compareAtPrice && product.price && (
          <span className="absolute right-3 top-3 rounded-full bg-[#C87D53] px-2.5 py-1 text-[10px] font-bold text-white sm:right-4 sm:top-4">
            Sale
          </span>
        )}
      </Link>

      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 md:p-6">
        <div>
          <Link href={`/products/${product.slug}`} className="group/name">
            <h3 className="font-serif text-base font-medium leading-snug text-[#2A2421] transition-colors group-hover/name:text-[#C87D53] sm:text-lg md:text-xl">
              {product.name}
            </h3>
          </Link>
          {product.description && (
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#2A2421]/60 sm:text-sm">
              {product.description}
            </p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#2A2421]/10 pt-4">
          {/* Price */}
          <div className="flex min-w-0 flex-wrap items-baseline gap-2">
            <span className="text-base font-bold text-[#2A2421] sm:text-lg">
              {product.price != null
                ? `PKR ${product.price.toLocaleString("en-PK")}`
                : "Price on request"}
            </span>
            {product.compareAtPrice != null && (
              <span className="text-xs text-[#2A2421]/40 line-through">
                PKR {product.compareAtPrice.toLocaleString("en-PK")}
              </span>
            )}
          </div>

          {/* CTA button */}
          <MotionLink
            href={`/products/${product.slug}`}
            whileTap={tapPress}
            className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full bg-[#2A2421] px-4 py-2.5 text-xs font-semibold text-[#F4EBE1] transition-all duration-300 hover:bg-[#C87D53] hover:shadow-md sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
          >
            View
            <ArrowUpRight
              size={14}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4 sm:w-4"
            />
          </MotionLink>
        </div>
      </div>
    </article>
  );
}
