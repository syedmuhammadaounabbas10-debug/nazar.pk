import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import Stagger, { StaggerItem } from "@/components/motion/Stagger";
import MotionLink from "@/components/motion/MotionLink";
import { products, type Product } from "@/lib/products";
import {
  ArrowLeft,
  Star,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import ImageGalleryClient from "./ImageGalleryClient";

type Props = {
  params: Promise<{ slug: string }>;
};

// Pre-generate all product detail pages at build time
export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

// Dynamic metadata per product
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | Nazar.pk",
      description: "The requested eyewear product could not be found.",
    };
  }

  return {
    title: `${product.name} | Premium Eyewear | Nazar.pk`,
    description:
      product.description ||
      `Shop ${product.name} from Nazar.pk. Premium eyewear made for everyday comfort and clarity.`,
    openGraph: {
      title: `${product.name} | Premium Eyewear | Nazar.pk`,
      description: product.description,
      type: "website",
    },
    alternates: { canonical: `/products/${product.slug}` },
  };
}

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center" aria-label={`Rating: ${rating} out of 5`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < Math.floor(rating) ? "currentColor" : "none"}
          className={
            i < Math.floor(rating) ? "text-amber-500" : "text-amber-400/30"
          }
        />
      ))}
    </div>
  );
}

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center bg-[#F4EBE1] px-4 text-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#C87D53]">
              404
            </p>
            <h1 className="mt-3 font-serif text-3xl font-medium text-[#2A2421]">
              Product not found
            </h1>
            <p className="mt-4 text-sm text-[#2A2421]/70">
              The product you are looking for does not exist or has been removed.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#2A2421] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#F4EBE1] hover:bg-[#C87D53]"
            >
              <ArrowLeft size={15} /> Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const rating = product.rating || 4.8;
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image || "/Images/products/image.png"];

  // If only one image, show it in gallery (duplicating for visual demo)
  const galleryImages =
    productImages.length === 1
      ? [productImages[0], productImages[0], productImages[0]]
      : productImages;

  const savings =
    product.compareAtPrice && product.price
      ? product.compareAtPrice - product.price
      : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F4EBE1]">
        <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 md:py-16">

          {/* Breadcrumb */}
          <Reveal y={10} className="mb-6 sm:mb-8">
            <nav aria-label="Breadcrumb">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 text-sm text-[#2A2421]/60 transition-colors hover:text-[#C87D53]"
              >
                <ArrowLeft
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
                />
                <span>Back to Catalog</span>
              </Link>
            </nav>
          </Reveal>

          {/* Product Hero — stacks on mobile, side-by-side on lg */}
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">

            {/* Image Gallery */}
            <Reveal y={20} amount={0.08}>
              <ImageGalleryClient
                images={galleryImages as string[]}
                productName={product.name}
              />
            </Reveal>

            {/* Product Info — reveals as one calm block alongside the gallery */}
            <Reveal y={20} delay={0.08} amount={0.08} className="flex flex-col gap-6">

              {/* Category + Name + Rating */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#C87D53]">
                  {product.category}
                </p>
                <h1 className="mt-2 font-serif text-2xl font-medium leading-tight text-[#2A2421] sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl">
                  {product.name}
                </h1>

                {/* Rating row */}
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <StarRating rating={rating} size={16} />
                  <span className="text-sm font-bold text-[#2A2421]">
                    {rating}
                  </span>
                  <span className="text-sm text-[#2A2421]/50">
                    ({product.reviews?.length || 0} review
                    {(product.reviews?.length || 0) !== 1 ? "s" : ""})
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-2xl font-bold text-[#2A2421] sm:text-3xl">
                  {product.price != null
                    ? `PKR ${product.price.toLocaleString("en-PK")}`
                    : "Price on request"}
                </span>
                {product.compareAtPrice != null && (
                  <span className="text-base text-[#2A2421]/40 line-through">
                    PKR {product.compareAtPrice.toLocaleString("en-PK")}
                  </span>
                )}
                {savings && (
                  <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-700">
                    Save PKR {savings.toLocaleString("en-PK")}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="border-t border-[#2A2421]/10 pt-5">
                <p className="text-sm leading-relaxed text-[#2A2421]/70 sm:text-base">
                  {product.description}
                </p>
              </div>

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#2A2421]/50">
                    Available Styles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <span
                        key={v}
                        className="rounded-full border border-[#2A2421]/15 bg-[#EAE1D7] px-4 py-1.5 text-xs font-medium text-[#2A2421]/80"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust badges */}
              <div className="grid grid-cols-1 gap-3 border-t border-b border-[#2A2421]/10 py-5 sm:grid-cols-3">
                <div className="flex items-center gap-2.5 text-[#2A2421]/70">
                  <Truck size={18} aria-hidden="true" className="shrink-0 text-[#C87D53]" />
                  <span className="text-xs font-medium">
                    Nationwide Cash on Delivery
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[#2A2421]/70">
                  <ShieldCheck size={18} aria-hidden="true" className="shrink-0 text-[#C87D53]" />
                  <span className="text-xs font-medium">
                    100% Verified Quality
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[#2A2421]/70">
                  <RefreshCw size={18} aria-hidden="true" className="shrink-0 text-[#C87D53]" />
                  <span className="text-xs font-medium">
                    7-Day Simple Replacement
                  </span>
                </div>
              </div>

              {/* Order CTA */}
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <MotionLink
                  href={`/order/${product.id}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-full bg-[#2A2421] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#F4EBE1] shadow-lg shadow-[#2A2421]/15 transition-colors hover:bg-[#C87D53] sm:min-h-[52px]"
                >
                  <ShoppingBag size={18} aria-hidden="true" />
                  Order Now
                </MotionLink>
              </div>
              <p className="text-center text-xs text-[#2A2421]/45">
                Easy ordering. Pay when the package arrives at your doorstep.
              </p>
            </Reveal>
          </div>

          {/* Reviews Section */}
          <section
            className="mt-12 border-t border-[#2A2421]/10 pt-12 sm:mt-16 sm:pt-16"
            aria-label="Customer reviews"
          >
            <Reveal y={14} amount={0.15}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-serif text-2xl font-medium text-[#2A2421] sm:text-3xl">
                Customer Reviews
              </h2>
              {product.rating && (
                <div className="flex items-center gap-2">
                  <StarRating rating={rating} size={18} />
                  <span className="text-sm font-bold text-[#2A2421]">
                    {rating} / 5
                  </span>
                </div>
              )}
            </div>
            </Reveal>

            <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
              {/* Review List */}
              <Stagger className="space-y-5" stagger={0.08} amount={0.1}>
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev) => (
                    <StaggerItem
                      key={rev.id}
                      className="rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7]/50 p-5 sm:p-6"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-semibold text-[#2A2421]">
                              {rev.author}
                            </span>
                            <span className="rounded-md bg-[#2A2421]/5 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-[#2A2421]/50">
                              Demo
                            </span>
                          </div>
                          <div className="mt-1.5">
                            <StarRating rating={rev.rating} size={13} />
                          </div>
                        </div>
                        <span className="text-xs text-[#2A2421]/45">
                          {rev.date}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-[#2A2421]/80">
                        {rev.text}
                      </p>
                    </StaggerItem>
                  ))
                ) : (
                  <p className="text-sm text-[#2A2421]/60">
                    No reviews yet. Be the first to review this frame!
                  </p>
                )}
              </Stagger>

              {/* Leave a Review CTA */}
              <Reveal
                y={14}
                delay={0.1}
                amount={0.1}
                className="rounded-2xl border border-dashed border-[#2A2421]/20 p-6 sm:p-8"
              >
                <h3 className="font-serif text-lg font-semibold text-[#2A2421]">
                  Write a Review
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2A2421]/70">
                  Bought this frame? Share your experience with other Nazar.pk customers. Submit reviews directly via our support channels.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#2A2421]/20 bg-white/20 px-5 text-xs font-semibold uppercase tracking-wider text-[#2A2421] transition-colors hover:border-[#2A2421]/40 hover:bg-[#EAE1D7]"
                >
                  Contact Support
                </Link>
              </Reveal>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
