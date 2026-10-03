"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  LoaderCircle,
  MessageCircle,
  Minus,
  Plus,
  Tag,
  Truck,
} from "lucide-react";
import { business, PaymentMethod } from "@/lib/config";
import { paymentInstructions, getWhatsAppLink, buildOrderMessage } from "@/lib/order";
import { Product } from "@/lib/products";
import Stagger, { StaggerItem } from "@/components/motion/Stagger";
import Reveal from "@/components/motion/Reveal";
import { premiumEase, tapPress } from "@/lib/motion";

const fields = [
  { name: "name", label: "Full Name", type: "text", placeholder: "e.g. Syed Muhammad", required: true, autoComplete: "name" },
  { name: "phone", label: "WhatsApp / Phone Number", type: "tel", placeholder: "e.g. 03245908220", required: true, autoComplete: "tel" },
  { name: "address", label: "Complete Delivery Address", type: "text", placeholder: "House #, Street Name, Area", required: true, autoComplete: "street-address" },
  { name: "city", label: "City", type: "text", placeholder: "e.g. Lahore", required: true, autoComplete: "address-level2" },
] as const;

const inputClass =
  "w-full min-h-[48px] rounded-lg border border-[#2A2421]/30 bg-[#F4EBE1] px-4 py-3 text-base text-[#2A2421] outline-none transition-colors placeholder:text-[#2A2421]/35 focus:border-[#C87D53] focus:ring-2 focus:ring-[#C87D53]/25";

export default function OrderFormClient({ product }: { product: Product }) {
  const router = useRouter();
  const [payment, setPayment] = useState<PaymentMethod>("Cash on Delivery");
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || "");
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", notes: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const message = useMemo(() => {
    return buildOrderMessage(
      [{ product, quantity, variant: selectedVariant }],
      { ...form, payment }
    );
  }, [product, quantity, selectedVariant, form, payment]);

  const link = getWhatsAppLink(message);
  const instructions = paymentInstructions(payment);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!link || isSubmitting) return;

    setIsSubmitting(true);

    // Open WhatsApp in a new tab
    try {
      window.open(link, "_blank", "noopener,noreferrer");
    } catch {
      // In case popups are blocked, continue to confirmation
    }

    // Generate order reference number for confirmation screen
    const orderNum = `NZ-${Math.floor(100000 + Math.random() * 900000)}`;

    // Redirect to custom success page with query params
    const query = new URLSearchParams({
      orderNum,
      productName: product.name,
      price: (product.price || 0).toString(),
      qty: quantity.toString(),
      total: ((product.price || 0) * quantity).toString(),
      variant: selectedVariant,
      payment,
      name: form.name,
      phone: form.phone,
      address: form.address,
      city: form.city,
    });

    router.push(`/order/success?${query.toString()}`);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      
      {/* Left: Customer Information Form */}
      <div className="rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7]/40 p-5 sm:p-6 md:p-8">
        <h2 className="font-serif text-2xl font-medium text-[#2A2421] mb-6">Shipping Details</h2>
        <form onSubmit={submit}>
          <Stagger className="grid gap-5" stagger={0.05} amount={0.05}>
          {fields.map(field => (
            <StaggerItem key={field.name}>
            <label className="grid gap-2 text-sm">
              <span className="font-medium text-[#2A2421]/70">{field.label}</span>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                required={field.required}
                value={form[field.name]}
                onChange={e => setForm({ ...form, [field.name]: e.target.value })}
                className={inputClass}
              />
            </label>
            </StaggerItem>
          ))}

          <StaggerItem>
          <label className="grid gap-2 text-sm">
            <span className="font-medium text-[#2A2421]/70">Payment method</span>
            <select
              value={payment}
              onChange={e => setPayment(e.target.value as PaymentMethod)}
              className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%232A2421%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-11`}
            >
              {(["Cash on Delivery", "Easypaisa", "Bank Transfer"] as PaymentMethod[]).map(m => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
          </StaggerItem>

          {/*
            Payment details. COD needs no account information, so it gets a
            single plain helper line; the boxed card — which read as a second,
            selectable payment option with its checkmark — is reserved for the
            methods that actually surface account details.
          */}
          <StaggerItem>
            {payment === "Cash on Delivery" ? (
              <p className="text-xs leading-6 text-[#2A2421]/60">{instructions}</p>
            ) : (
              <div className="rounded-xl bg-[#F4EBE1] p-4 text-sm leading-6 text-[#2A2421]/70">
                <div className="flex items-center gap-2 font-medium text-[#2A2421]">
                  <Check size={16} aria-hidden="true" className="shrink-0 text-[#C87D53]" />
                  {payment}
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={payment}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: premiumEase }}
                  >
                    <p className="mt-1 break-words">{instructions}</p>
                    <p className="mt-2 text-xs">
                      Payment remains pending until Nazar.pk manually verifies it. Use WhatsApp to send payment screenshot.
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </StaggerItem>

          <StaggerItem>
          <label className="grid gap-2 text-sm">
            <span className="font-medium text-[#2A2421]/70">Additional notes (optional)</span>
            <textarea
              placeholder="Any special instructions for delivery..."
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
              rows={3}
              className="w-full resize-none rounded-lg border border-[#2A2421]/30 bg-[#F4EBE1] px-4 py-3 text-base text-[#2A2421] outline-none transition-colors placeholder:text-[#2A2421]/35 focus:border-[#C87D53] focus:ring-2 focus:ring-[#C87D53]/25"
            />
          </label>
          </StaggerItem>

          <StaggerItem>
          <motion.button
            type="submit"
            disabled={!business.whatsapp || isSubmitting}
            whileTap={isSubmitting ? undefined : tapPress}
            className="group flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#2A2421] px-6 py-4 text-sm font-semibold uppercase tracking-wider text-[#F4EBE1] shadow-lg shadow-[#2A2421]/15 transition-colors duration-300 hover:bg-[#C87D53] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <LoaderCircle size={18} aria-hidden="true" className="shrink-0 animate-spin" />
            ) : (
              <MessageCircle size={18} aria-hidden="true" className="shrink-0" />
            )}
            {isSubmitting ? "Processing Order..." : "Place Order on WhatsApp"}
            {!isSubmitting && (
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            )}
          </motion.button>
          </StaggerItem>
          </Stagger>
        </form>
      </div>

      {/* Right: Order Summary */}
      <Reveal y={18} delay={0.12} amount={0.08} className="space-y-6">
        <div className="rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] p-5 sm:p-6">
          <h2 className="font-serif text-xl font-medium text-[#2A2421] mb-5">Order Summary</h2>

          {/* Product block */}
          <div className="flex gap-4 border-b border-[#2A2421]/10 pb-5">
            <div className="relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[#2A2421]/10 bg-[#F4EBE1]">
              <img
                src={product.image || "/Images/products/image.png"}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-serif font-semibold text-[#2A2421] truncate">{product.name}</h3>
              <p className="text-xs text-[#2A2421]/50 mt-0.5">{product.category}</p>
              
              {/* Product Price */}
              <p className="text-sm font-semibold text-[#2A2421] mt-2">
                {product.price != null ? `PKR ${product.price.toLocaleString()}` : "Price on request"}
              </p>
            </div>
          </div>

          {/* Configuration selections */}
          <div className="space-y-4 border-b border-[#2A2421]/10 py-5">
            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-[#2A2421]/60">Select Variant:</span>
                <select
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  className="rounded-lg border border-[#2A2421]/20 bg-white/20 px-3 py-1.5 text-xs font-semibold text-[#2A2421] outline-none"
                >
                  {product.variants.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#2A2421]/60">Quantity:</span>
              <div className="flex items-center rounded-lg border border-[#2A2421]/20 bg-[#F4EBE1]">
                <motion.button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-10 w-10 items-center justify-center text-base font-semibold text-[#2A2421] transition-colors hover:bg-[#2A2421]/5"
                >
                  <Minus size={14} aria-hidden="true" />
                </motion.button>
                <span className="relative min-w-[2.5rem] text-center text-sm font-bold text-[#2A2421]">
                  {/* Number swaps with a tiny slide so changes feel responsive */}
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={quantity}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18, ease: premiumEase }}
                      className="inline-block"
                    >
                      {quantity}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <motion.button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity(q => q + 1)}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-10 w-10 items-center justify-center text-base font-semibold text-[#2A2421] transition-colors hover:bg-[#2A2421]/5"
                >
                  <Plus size={14} aria-hidden="true" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Pricing calculations */}
          <div className="space-y-3 pt-5 text-sm">
            <div className="flex justify-between">
              <span className="text-[#2A2421]/60">Subtotal:</span>
              <motion.span
                key={product.price != null ? product.price * quantity : "na"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: premiumEase }}
                className="font-semibold text-[#2A2421]"
              >
                {product.price != null ? `PKR ${(product.price * quantity).toLocaleString()}` : "—"}
              </motion.span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2A2421]/60">Delivery:</span>
              <span className="font-semibold text-emerald-600 flex items-center gap-1">
                <Truck size={14} aria-hidden="true" /> FREE
              </span>
            </div>
            
            <div className="flex justify-between border-t border-[#2A2421]/15 pt-3 text-base font-bold">
              <span className="text-[#2A2421]">Order Total:</span>
              <motion.span
                key={product.price != null ? product.price * quantity : "na"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: premiumEase, delay: 0.05 }}
                className="text-[#C87D53]"
              >
                {product.price != null ? `PKR ${(product.price * quantity).toLocaleString()}` : "—"}
              </motion.span>
            </div>
          </div>
        </div>

        {/* Brand guarantee banner */}
        <div className="rounded-2xl border border-dashed border-[#C87D53]/30 bg-[#C87D53]/5 p-5 text-xs text-[#2A2421]/80">
          <p className="font-bold text-[#C87D53] flex items-center gap-1.5 mb-2">
            <Tag size={12} aria-hidden="true" /> Genuine eyewear promise
          </p>
          <p>
            Every order is manually confirmed on WhatsApp by a human representative. Pay securely at delivery with Cash on Delivery or send proof for electronic methods.
          </p>
        </div>
      </Reveal>

    </div>
  );
}
