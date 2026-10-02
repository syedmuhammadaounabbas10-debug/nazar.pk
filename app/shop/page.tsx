"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { Search, X, SlidersHorizontal } from "lucide-react";

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Eyeglasses" | "Sunglasses">("All");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F4EBE1] py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          
          {/* Page Header */}
          <div className="mb-10 text-center md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#C87D53]">Nazar.pk Catalog</p>
            <h1 className="mt-3 font-serif text-4xl font-medium text-[#2A2421] md:text-5xl lg:text-6xl">
              Explore Our Collection
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#2A2421]/70">
              Thoughtfully selected eyewear designed to combine timeless style, everyday comfort, and absolute visual clarity.
            </p>
          </div>

          {/* Search and Filters controls */}
          <div className="mx-auto mb-12 max-w-4xl space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2A2421]/40" />
                <input
                  type="text"
                  placeholder="Search glasses, categories, or styles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full min-h-[48px] rounded-full border border-[#2A2421]/20 bg-[#EAE1D7]/50 py-3 pl-12 pr-12 text-sm text-[#2A2421] outline-none transition-colors placeholder:text-[#2A2421]/35 focus:border-[#C87D53] focus:ring-2 focus:ring-[#C87D53]/20"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2A2421]/50 hover:text-[#2A2421]"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="hidden text-xs font-semibold uppercase tracking-wider text-[#2A2421]/50 md:inline-flex items-center gap-1.5 mr-2">
                  <SlidersHorizontal size={14} /> Filter:
                </span>
                {(["All", "Eyeglasses", "Sunglasses"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`min-h-[40px] rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      selectedCategory === cat
                        ? "bg-[#2A2421] text-[#F4EBE1]"
                        : "border border-[#2A2421]/10 bg-white/20 text-[#2A2421] hover:border-[#2A2421]/30 hover:bg-[#EAE1D7]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border border-dashed border-[#2A2421]/20 bg-[#EAE1D7]/30 p-12 text-center">
              <p className="text-lg font-medium text-[#2A2421]/80">No products found</p>
              <p className="mt-2 text-sm text-[#2A2421]/60">
                We couldn't find anything matching your search criteria. Try adjusting your query or resetting filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-6 rounded-full bg-[#2A2421] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F4EBE1] transition-colors hover:bg-[#C87D53]"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
