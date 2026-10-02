import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";
import { ArrowLeft } from "lucide-react";
import OrderFormClient from "./OrderFormClient";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  return {
    title: product ? `Order ${product.name} | Nazar.pk` : "Place Order | Nazar.pk",
    description: "Complete your order with Nazar.pk. Easy Cash on Delivery across Pakistan.",
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
            <h1 className="font-serif text-3xl font-medium text-[#2A2421]">Product not selected</h1>
            <p className="mt-4 text-[#2A2421]/70">Please select a product from the shop to start ordering.</p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2A2421] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F4EBE1] hover:bg-[#C87D53]"
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
      <main className="min-h-screen bg-[#F4EBE1] py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl">
            
            {/* Page Header */}
            <div className="mb-10">
              <Link href={`/products/${product.slug}`} className="inline-flex items-center gap-2 text-sm text-[#2A2421]/60 hover:text-[#C87D53]">
                <ArrowLeft size={16} /> Back to Product Details
              </Link>
              <h1 className="mt-4 font-serif text-3xl font-medium text-[#2A2421] sm:text-4xl">
                Complete Your Order
              </h1>
              <p className="mt-2 text-sm text-[#2A2421]/70">
                You are ordering premium eyewear from Nazar.pk. Please fill out your shipping and payment details below.
              </p>
            </div>

            {/* Form + Summary Client Component */}
            <OrderFormClient product={product} />

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
