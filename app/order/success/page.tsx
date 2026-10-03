"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionLink from "@/components/motion/MotionLink";
import Reveal from "@/components/motion/Reveal";
import Stagger, { StaggerItem } from "@/components/motion/Stagger";
import { business } from "@/lib/config";
import { premiumEase, tapPress } from "@/lib/motion";
import {
  CheckCircle2,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  Truck,
  CreditCard,
  Clock,
  ShieldCheck,
} from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();

  const orderNum = searchParams.get("orderNum") || "NZ-ORDER";
  const productName = searchParams.get("productName") || "Premium Eyewear Frame";
  const price = searchParams.get("price") ? Number(searchParams.get("price")) : null;
  const qty = searchParams.get("qty") || "1";
  const total = searchParams.get("total") ? Number(searchParams.get("total")) : null;
  const variant = searchParams.get("variant") || "";
  const payment = searchParams.get("payment") || "Cash on Delivery";
  const name = searchParams.get("name") || "";
  const city = searchParams.get("city") || "";

  const whatsappChatUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
    `Assalam o Alaikum, regarding my Nazar.pk order (${orderNum}): I would like to check the status.`
  )}`;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Success Hero Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: premiumEase }}
        className="text-center"
      >
        <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 sm:h-24 sm:w-24">
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
            className="inline-flex"
          >
            <CheckCircle2 size={48} aria-hidden="true" />
          </motion.span>
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[.25em] text-[#C87D53]">
          Thank you for choosing Nazar.pk
        </p>
        <h1 className="mt-2 font-serif text-3xl font-medium text-[#2A2421] sm:text-4xl md:text-5xl">
          Order Received Successfully
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#2A2421]/70 sm:text-base">
          {name ? `Thank you, ${name}! ` : "Thank you! "}
          Your order request has been dispatched. Our team will review the details and confirm your delivery via WhatsApp.
        </p>

        {/* Order Reference Pill */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#2A2421]/15 bg-[#EAE1D7] px-5 py-2 text-xs font-semibold text-[#2A2421] sm:text-sm">
          <span>Order Reference:</span>
          <span className="font-mono font-bold text-[#C87D53]">{orderNum}</span>
        </div>
      </motion.div>

      {/* Order Summary Card */}
      <Reveal
        y={18}
        delay={0.2}
        amount={0.05}
        className="mt-10 overflow-hidden rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] p-5 sm:p-8"
      >
        <h2 className="font-serif text-xl font-medium text-[#2A2421] sm:text-2xl">
          Order Details
        </h2>

        <div className="mt-6 divide-y divide-[#2A2421]/10 border-t border-b border-[#2A2421]/10 py-2">
          {/* Product Line */}
          <div className="flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-serif font-semibold text-[#2A2421]">{productName}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#2A2421]/60">
                {variant && <span>Variant: {variant}</span>}
                {variant && <span>•</span>}
                <span>Quantity: {qty}</span>
              </div>
            </div>
            <p className="font-semibold text-[#2A2421]">
              {price != null ? `PKR ${(price * Number(qty)).toLocaleString("en-PK")}` : "Price confirmed on chat"}
            </p>
          </div>

          {/* Delivery & Payment Info */}
          <div className="grid gap-3 py-4 text-xs sm:grid-cols-2 sm:text-sm">
            <div className="flex items-center gap-2 text-[#2A2421]/80">
              <Truck size={16} aria-hidden="true" className="text-[#C87D53] shrink-0" />
              <span>
                Shipping: <strong className="text-emerald-700 font-semibold">FREE Nationwide Delivery</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#2A2421]/80">
              <CreditCard size={16} aria-hidden="true" className="text-[#C87D53] shrink-0" />
              <span>
                Payment: <strong>{payment}</strong>
              </span>
            </div>
            {city && (
              <div className="text-[#2A2421]/70 sm:col-span-2">
                <span>Destination City: </span>
                <strong className="text-[#2A2421]">{city}</strong>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="flex items-center justify-between py-4 text-base font-bold sm:text-lg">
            <span className="text-[#2A2421]">Total Amount:</span>
            <span className="text-[#C87D53]">
              {total != null ? `PKR ${total.toLocaleString("en-PK")}` : "To be confirmed"}
            </span>
          </div>
        </div>

        {/* Steps Box */}
        <div className="mt-8 rounded-xl bg-[#F4EBE1] p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#C87D53]">Next Steps</p>
          <Stagger className="mt-4 grid gap-4 sm:grid-cols-3" stagger={0.08} amount={0.1}>
            <StaggerItem className="space-y-1">
              <div className="flex items-center gap-2 font-serif text-sm font-semibold text-[#2A2421]">
                <Clock size={16} aria-hidden="true" className="text-[#C87D53] shrink-0" />
                <span>1. Confirmation</span>
              </div>
              <p className="text-xs text-[#2A2421]/70">
                A representative will confirm your order details and delivery window via WhatsApp.
              </p>
            </StaggerItem>
            <StaggerItem className="space-y-1">
              <div className="flex items-center gap-2 font-serif text-sm font-semibold text-[#2A2421]">
                <ShieldCheck size={16} aria-hidden="true" className="text-[#C87D53] shrink-0" />
                <span>2. Verification</span>
              </div>
              <p className="text-xs text-[#2A2421]/70">
                {payment === "Cash on Delivery"
                  ? "Zero advance payment. Pay when the courier arrives at your doorstep."
                  : "Please share your payment transfer screenshot in the WhatsApp chat."}
              </p>
            </StaggerItem>
            <StaggerItem className="space-y-1">
              <div className="flex items-center gap-2 font-serif text-sm font-semibold text-[#2A2421]">
                <Truck size={16} aria-hidden="true" className="text-[#C87D53] shrink-0" />
                <span>3. Dispatch</span>
              </div>
              <p className="text-xs text-[#2A2421]/70">
                Your frames are carefully inspected, sanitized, and delivered in 2–4 business days.
              </p>
            </StaggerItem>
          </Stagger>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <motion.a
            href={whatsappChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={tapPress}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-colors duration-300 hover:bg-[#1EBE5A]"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Chat on WhatsApp
          </motion.a>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <MotionLink
              href="/shop"
              whileTap={tapPress}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#2A2421]/20 bg-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#2A2421] transition-colors hover:border-[#2A2421]/40 hover:bg-[#F4EBE1]"
            >
              <ShoppingBag size={14} aria-hidden="true" />
              Continue Shopping
            </MotionLink>
            <MotionLink
              href="/"
              whileTap={tapPress}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#2A2421] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#F4EBE1] transition-colors hover:bg-[#C87D53]"
            >
              <span>Back to Home</span>
              <ArrowRight size={14} aria-hidden="true" />
            </MotionLink>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F4EBE1] py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <Suspense
            fallback={
              <div className="mx-auto max-w-md p-12 text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-[#C87D53] border-t-transparent" />
                <p className="mt-4 font-serif text-lg text-[#2A2421]">Loading order details...</p>
              </div>
            }
          >
            <OrderSuccessContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
