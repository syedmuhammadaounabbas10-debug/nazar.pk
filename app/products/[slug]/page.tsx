import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products, type Product } from "@/lib/products";
import { ArrowLeft, Star, ShoppingBag, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import ImageGalleryClient from "./ImageGalleryClient";

type Props = {
  params: Promise<{ slug: string }>;
};

// Next.js 15 dynamic metadata generation
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
    description: product.description || `Shop ${product.name} from Nazar.pk. Premium eyewear made for everyday comfort and clarity.`,
    openGraph: {
      title: `${product.name} | Premium Eyewear | Nazar.pk`,
      description: product.description,
      type: "website",
    },
  };
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
            <h1 className="font-serif text-3xl font-medium text-[#2A2421]">Product not found</h1>
            <p className="mt-4 text-[#2A2421]/70">The product you are looking for does not exist or has been removed.</p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2A2421] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F4EBE1] hover:bg-[#C87D53]"
            >
              <ArrowLeft size={16} /> Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Fallback rating and images
  const rating = product.rating || 4.8;
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image || "/Images/products/image.png"];

  // Mock 3 gallery images for visual demonstration using the same base image
  const galleryImages = [
    productImages[0],
    productImages[0],
    productImages[0]
  ].filter(Boolean) as string[];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F4EBE1] py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-[#2A2421]/60 hover:text-[#C87D53]">
              <ArrowLeft size={16} /> Back to Catalog
            </Link>
          </div>

          {/* Product Hero */}
          <div className="grid gap-12 lg:grid-cols-2">
            
            {/* Left: Image Gallery */}
            <ImageGalleryClient images={galleryImages} productName={product.name} />

            {/* Right: Info and CTA */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#C87D53]">{product.category}</p>
                <h1 className="mt-3 font-serif text-3xl font-medium text-[#2A2421] sm:text-4xl md:text-5xl">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill={i < Math.floor(rating) ? "currentColor" : "none"}
                        className={i < Math.floor(rating) ? "text-amber-500" : "text-amber-500/30"}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-[#2A2421]">{rating}</span>
                  <span className="text-sm text-[#2A2421]/50">({product.reviews?.length || 0} customer reviews)</span>
                </div>

                {/* Pricing */}
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-[#2A2421] sm:text-3xl">
                    {product.price != null ? `PKR ${product.price.toLocaleString("en-PK")}` : "Price on request"}
                  </span>
                  {product.compareAtPrice != null && (
                    <span className="text-sm text-[#2A2421]/40 line-through sm:text-base">
                      PKR {product.compareAtPrice.toLocaleString("en-PK")}
                    </span>
                  )}
                </div>

                <div className="mt-6 border-t border-[#2A2421]/10 pt-6">
                  <p className="text-sm leading-relaxed text-[#2A2421]/70 md:text-base">
                    {product.description}
                  </p>
                </div>

                {/* Product details badges */}
                <div className="mt-8 grid gap-4 border-t border-b border-[#2A2421]/10 py-6 sm:grid-cols-3">
                  <div className="flex items-center gap-3 text-[#2A2421]/80">
                    <Truck size={20} className="text-[#C87D53]" />
                    <span className="text-xs font-medium">Nationwide Cash on Delivery</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#2A2421]/80">
                    <ShieldCheck size={20} className="text-[#C87D53]" />
                    <span className="text-xs font-medium">100% Verified Quality</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#2A2421]/80">
                    <RefreshCw size={20} className="text-[#C87D53]" />
                    <span className="text-xs font-medium">7-Day Simple Replacement</span>
                  </div>
                </div>
              </div>

              {/* Order CTA Section */}
              <div className="mt-8">
                <Link
                  href={`/order/${product.id}`}
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full bg-[#2A2421] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[#F4EBE1] shadow-lg shadow-black/10 transition-colors hover:bg-[#C87D53]"
                >
                  <ShoppingBag size={18} />
                  Order Now via Cash on Delivery
                </Link>
                <p className="mt-3 text-center text-xs text-[#2A2421]/50">
                  Easy ordering. Pay when the package arrives at your doorstep.
                </p>
              </div>

            </div>
          </div>

          {/* Product Reviews section */}
          <section className="mt-16 border-t border-[#2A2421]/10 pt-16">
            <h2 className="font-serif text-2xl font-medium text-[#2A2421] sm:text-3xl">Customer Reviews</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              
              {/* Review List */}
              <div className="space-y-6">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev) => (
                    <div key={rev.id} className="rounded-xl border border-[#2A2421]/10 bg-[#EAE1D7]/50 p-6">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-semibold text-[#2A2421]">{rev.author}</span>
                        <span className="text-xs text-[#2A2421]/50">{rev.date}</span>
                      </div>
                      <div className="mt-2 flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < rev.rating ? "currentColor" : "none"}
                            className="text-amber-500"
                          />
                        ))}
                      </div>
                      <p className="mt-3 text-sm text-[#2A2421]/80">{rev.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[#2A2421]/60">No reviews yet. Be the first to review this frame!</p>
                )}
              </div>

              {/* Leave a review placeholder info */}
              <div className="rounded-xl border border-dashed border-[#2A2421]/20 p-6 sm:p-8">
                <h3 className="font-serif text-lg font-semibold text-[#2A2421]">Write a Review</h3>
                <p className="mt-2 text-sm text-[#2A2421]/70">
                  Bought this frame? Share your experience with other Nazar.pk customers. You can submit reviews directly via our support channels.
                </p>
                <Link
                  href="/#contact"
                  className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#2A2421]/20 bg-white/20 px-5 text-xs font-semibold uppercase tracking-wider text-[#2A2421] hover:border-[#2A2421]/40"
                >
                  Contact Support
                </Link>
              </div>

            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
