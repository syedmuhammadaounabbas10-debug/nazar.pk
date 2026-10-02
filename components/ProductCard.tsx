"use client";

import { products, type Product } from "@/lib/products";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square w-full overflow-hidden bg-[#F4EBE1]">
        <img
          src={product.image || "/Images/products/image.png"}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-[#F4EBE1]/90 backdrop-blur-md px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C87D53]">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="text-xl font-serif font-medium text-[#2A2421]">
            {product.name}
          </h3>
          {product.description && (
            <p className="mt-2 text-sm text-[#2A2421]/70 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[#2A2421]/10 pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-[#2A2421]">
              {product.price != null ? `PKR ${product.price.toLocaleString()}` : "Price on request"}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[#2A2421]/40 line-through">
                PKR {product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={() => onSelect?.(product)}
            className="inline-flex items-center gap-2 rounded-full bg-[#2A2421] px-6 py-3 text-sm font-semibold text-[#F4EBE1] transition-all duration-300 hover:bg-[#C87D53] active:scale-[.98]"
          >
            Order
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}