"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/motion/Reveal";
import Stagger, { StaggerItem } from "@/components/motion/Stagger";
import { products } from "@/lib/products";
import { indicatorSpring } from "@/lib/motion";
import { Search, X, SlidersHorizontal } from "lucide-react";

const CATEGORIES = ["All", "Eyeglasses", "Sunglasses"] as const;
type Category = (typeof CATEGORIES)[number];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        (product.description && product.description.toLowerCase().includes(q)) ||
        (product.variants && product.variants.some((v) => v.toLowerCase().includes(q)));

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  function clearAll() {
    setSearchQuery("");
    setSelectedCategory("All");
  }

  const hasActiveFilters = searchQuery || selectedCategory !== "All";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F4EBE1]">
        {/* Page Header */}
        <div className="border-b border-[#2A2421]/10 bg-gradient-to-b from-[#EAE1D7]/60 to-[#F4EBE1] px-4 py-10 text-center sm:px-6 sm:py-16 md:py-20">
          <Stagger className="mx-auto max-w-3xl" stagger={0.09} amount={0.3}>
            <StaggerItem>
              {/* Short label: the heuristic reserves all-caps for brief labels,
                  and this keeps the eyebrow consistent with the "Shop" /
                  "Contact" eyebrows used elsewhere on Nazar.pk. */}
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#C87D53]">
                Catalog
              </p>
            </StaggerItem>
            <StaggerItem>
              <h1 className="mt-3 font-serif text-3xl font-medium text-[#2A2421] sm:text-4xl md:text-5xl lg:text-6xl">
                Explore Our Collection
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#2A2421]/65 sm:text-base">
                Thoughtfully selected eyewear designed to combine timeless style, everyday comfort, and absolute visual clarity.
              </p>
            </StaggerItem>
          </Stagger>
        </div>

        <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-12 md:py-16">
          {/* Search + Filter Bar */}
          <Reveal y={14} className="mx-auto mb-8 max-w-4xl sm:mb-10 md:mb-14">
            <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center">

              {/* Search Bar */}
              <div className="relative flex-1">
                <Search
                  size={18}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2A2421]/40"
                />
                <input
                  type="search"
                  placeholder="Search glasses, sunglasses, styles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full min-h-[52px] rounded-full border border-[#2A2421]/20 bg-[#EAE1D7]/50 py-3 pl-12 pr-12 text-sm text-[#2A2421] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-[#2A2421]/35 focus:border-[#C87D53] focus:ring-2 focus:ring-[#C87D53]/20 sm:min-h-[48px]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full text-[#2A2421]/50 transition-colors hover:bg-[#2A2421]/10 hover:text-[#2A2421]"
                    aria-label="Clear search"
                  >
                    <X size={15} aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Category Pills.
                  role="group" + aria-label names the button group so its
                  purpose is available to assistive tech, not just to sighted
                  users reading the label. */}
              <div
                role="group"
                aria-label="Filter products by category"
                className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0"
              >
                <span className="hidden shrink-0 items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-[#2A2421]/80 md:flex">
                  <SlidersHorizontal size={16} aria-hidden="true" />
                  Filter:
                </span>
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      aria-pressed={isActive}
                      className={`relative min-h-[44px] shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 sm:px-5 ${
                        isActive
                          ? "text-[#F4EBE1]"
                          : "border border-[#2A2421]/15 bg-white/30 text-[#2A2421] hover:border-[#2A2421]/30 hover:bg-[#EAE1D7]"
                      }`}
                    >
                      {/* Active pill slides between categories */}
                      {isActive && (
                        <motion.span
                          layoutId="shop-filter-pill"
                          transition={indicatorSpring}
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full bg-[#2A2421] shadow-sm"
                        />
                      )}
                      <span className="relative z-10">{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active filter summary */}
            <AnimatePresence initial={false}>
              {hasActiveFilters && (
                <motion.div
                  key="filter-summary"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 flex items-center gap-3 text-sm text-[#2A2421]/60"
                >
                  <span>
                    {filteredProducts.length} product
                    {filteredProducts.length !== 1 ? "s" : ""} found
                  </span>
                  <button
                    onClick={clearAll}
                    className="text-[#C87D53] underline-offset-2 hover:underline"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>

          {/* Section heading for the results list.
              Visually hidden so the design is unchanged, but it completes the
              document outline: H1 ("Explore Our Collection") → H2 (this) → H3
              (each product name in ProductCard) instead of skipping H1 → H3.
              It also updates with the active filter so the outline stays true. */}
          <h2 className="sr-only">
            {selectedCategory === "All" ? "All Frames" : selectedCategory}
          </h2>

          {/* Product Grid or Empty State */}
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mx-auto max-w-sm rounded-2xl border border-dashed border-[#2A2421]/20 bg-[#EAE1D7]/30 p-10 text-center sm:max-w-md sm:p-12"
            >
              <p className="font-serif text-lg font-medium text-[#2A2421]/80 sm:text-xl">
                No products found
              </p>
              <p className="mt-2 text-sm text-[#2A2421]/55">
                We couldn&apos;t find anything matching your search. Try adjusting your query or resetting filters.
              </p>
              <button
                onClick={clearAll}
                className="mt-6 rounded-full bg-[#2A2421] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F4EBE1] transition-colors hover:bg-[#C87D53] active:scale-95"
              >
                Reset Search
              </button>
            </motion.div>
          ) : (
            <ProductGrid
              products={filteredProducts}
              className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:grid-cols-3 xl:grid-cols-4"
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
