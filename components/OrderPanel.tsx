"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Check, Copy, MessageCircle } from "lucide-react";
import { business, PaymentMethod } from "../lib/config";
import { paymentInstructions, getWhatsAppLink, buildOrderMessage } from "../lib/order";
import { Product } from "../lib/products";

const fields = [
  { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
  { name: "phone", label: "WhatsApp / Phone", type: "tel", required: true, autoComplete: "tel" },
  { name: "address", label: "Delivery address", type: "text", required: false, autoComplete: "street-address" },
  { name: "city", label: "City", type: "text", required: true, autoComplete: "address-level2" },
] as const;

const inputClass =
  "w-full min-h-[48px] rounded-lg border border-[#2A2421]/30 bg-[#F4EBE1] px-4 py-3 text-base text-[#2A2421] outline-none transition-colors placeholder:text-[#2A2421]/35 focus:border-[#C87D53] focus:ring-2 focus:ring-[#C87D53]/25";

export default function OrderPanel({ product }: { product?: Product }) {
  const [payment, setPayment] = useState<PaymentMethod>("Cash on Delivery");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", notes: "" });

  const message = useMemo(
    () => (product ? buildOrderMessage([{ product, quantity: 1 }], { ...form, payment }) : ""),
    [product, form, payment]
  );
  const link = getWhatsAppLink(message);
  const instructions = paymentInstructions(payment);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!link) return;
    setSent(true);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] p-5 sm:p-6 md:p-8">
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[.2em] text-[#C87D53]">Direct ordering</p>
          <h3 className="display mt-2 text-2xl sm:text-3xl">Order on WhatsApp</h3>
        </div>
        <MessageCircle size={25} className="shrink-0 text-[#2A2421]/40" />
      </div>

      <form onSubmit={submit} className="mt-6 grid gap-4 sm:mt-7">
        {fields.map(field => (
          <label key={field.name} className="grid gap-2 text-sm">
            <span className="text-[#2A2421]/70">{field.label}</span>
            <input
              type={field.type}
              name={field.name}
              autoComplete={field.autoComplete}
              required={field.required}
              value={form[field.name]}
              onChange={e => setForm({ ...form, [field.name]: e.target.value })}
              className={inputClass}
            />
          </label>
        ))}

        <label className="grid gap-2 text-sm">
          <span className="text-[#2A2421]/70">Payment method</span>
          <select
            value={payment}
            onChange={e => setPayment(e.target.value as PaymentMethod)}
            className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%232A2421%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-11`}
          >
            {(["Easypaisa", "Bank Transfer", "Cash on Delivery"] as PaymentMethod[]).map(m => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>

        <div className="rounded-xl bg-[#F4EBE1] p-4 text-sm leading-6 text-[#2A2421]/70">
          <div className="flex items-center gap-2 font-medium text-[#2A2421]">
            <Check size={16} className="shrink-0" />
            {payment}
          </div>
          <p className="mt-1 break-words">{instructions}</p>
          {payment !== "Cash on Delivery" && (
            <p className="mt-2 text-xs">
              Payment remains pending until Nazar.pk verifies it. Use WhatsApp to send proof.
            </p>
          )}
        </div>

        <label className="grid gap-2 text-sm">
          <span className="text-[#2A2421]/70">Additional notes</span>
          <textarea
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            rows={3}
            className="w-full resize-none rounded-lg border border-[#2A2421]/30 bg-[#F4EBE1] px-4 py-3 text-base text-[#2A2421] outline-none transition-colors placeholder:text-[#2A2421]/35 focus:border-[#C87D53] focus:ring-2 focus:ring-[#C87D53]/25"
          />
        </label>

        <button
          type="submit"
          disabled={!business.whatsapp}
          className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#2A2421] px-5 py-3.5 text-sm font-medium text-[#F4EBE1] transition-colors hover:bg-[#C87D53] active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <MessageCircle size={18} className="shrink-0" />
          {business.whatsapp ? "Continue to WhatsApp" : "Add verified WhatsApp number in config"}
          <ArrowUpRight size={16} className="shrink-0" />
        </button>

        {sent && (
          <p className="text-sm text-[#2A2421]/60">
            Your order details are ready to send. Nazar.pk confirmation happens manually after the
            WhatsApp handoff.
          </p>
        )}
      </form>

      {payment !== "Cash on Delivery" && (
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(instructions)}
          className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-xs text-[#2A2421]/50 transition-colors hover:text-[#2A2421]"
        >
          <Copy size={14} className="shrink-0" />
          Copy payment instructions
        </button>
      )}
    </div>
  );
}
