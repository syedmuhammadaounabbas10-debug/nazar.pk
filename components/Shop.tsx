"use client";

import { products } from "@/lib/products";
import ProductCard from "./ProductCard";

interface ShopProps {
  onSelectProduct?: (product: any) => void;
}

export default function Shop({ onSelectProduct }: ShopProps) {
  return (
    <div className="space-y-16">
      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#2A2421]/20 bg-[#EAE1D7]/50 p-8 text-center sm:p-12">
          <p className="text-base font-medium text-[#2A2421]/80">
            No products added yet. Add items in <code className="rounded bg-[#2A2421]/10 px-2 py-1 text-xs">lib/products.ts</code>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}