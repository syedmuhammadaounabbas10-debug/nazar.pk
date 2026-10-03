import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import { products } from "@/lib/products";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import OrderFormClient from "./OrderFormClient";

type Props = {
  params: Promise<{ id: string }>;
};

// Pre-generate all order pages at build time
export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  return {
    title: product
      ? `Order ${product.name} | Nazar.pk`
      : "Place Order | Nazar.pk",
    description:
      "Complete your order with Nazar.pk. Easy Cash on Delivery across Pakistan.",
  };
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center bg-[#F4EBE1] px-4 text-center">
          <div>
            <ShoppingBag size={40} className="mx-auto mb-4 text-[#2A2421]/30" />
            <h1 className="font-serif text-2xl font-medium text-[#2A2421] sm:text-3xl">
              Product not selected
            </h1>
            <p className="mt-3 text-sm text-[#2A2421]/70">
              Please select a product from the shop to start ordering.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#2A2421] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#F4EBE1] transition-colors hover:bg-[#C87D53]"
            >
              <ArrowLeft size={16} /> Go to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F4EBE1]">
        <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 md:py-16">
          <div className="mx-auto max-w-5xl">

            {/* Back link */}
            <Reveal y={10}>
              <Link
                href={`/products/${product.slug}`}
                className="group inline-flex items-center gap-2 text-sm text-[#2A2421]/60 transition-colors hover:text-[#C87D53]"
              >
                <ArrowLeft
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
                />
                Back to Product Details
              </Link>
            </Reveal>

            {/* Page header */}
            <Reveal y={14} delay={0.06} className="mt-5 mb-8 sm:mt-6 sm:mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-[#C87D53]">
                Step 3 of 3
              </p>
              <h1 className="mt-2 font-serif text-2xl font-medium text-[#2A2421] sm:text-3xl md:text-4xl">
                Complete Your Order
              </h1>
              <p className="mt-2 text-sm text-[#2A2421]/65">
                You are ordering premium eyewear from Nazar.pk. Fill in your details below — we&apos;ll confirm on WhatsApp.
              </p>
            </Reveal>

            {/* Form + Summary */}
            <OrderFormClient product={product} />

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
