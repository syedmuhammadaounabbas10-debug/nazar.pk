"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Check, Copy, MessageCircle } from "lucide-react";
import { business, PaymentMethod } from "../lib/config";
import { paymentInstructions, getWhatsAppLink, buildOrderMessage } from "../lib/order";
import { Product } from "../lib/products";

export default function OrderPanel({product}: {product?: Product}) {
  const [payment, setPayment] = useState<PaymentMethod>("Cash on Delivery");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({name:"",phone:"",address:"",city:"",notes:""});

  const message = useMemo(() => product ? buildOrderMessage([{product,quantity:1}], {...form,payment}) : "", [product,form,payment]);
  const link = getWhatsAppLink(message);
  const instructions = paymentInstructions(payment);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!link) return;
    setSent(true);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] p-6 md:p-8">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-xs uppercase tracking-[.2em] text-[#C87D53]">Direct ordering</p>
          <h3 className="display mt-2 text-3xl">Order on WhatsApp</h3>
        </div>
        <MessageCircle size={25} className="text-[#2A2421]/40" />
      </div>
      <form onSubmit={submit} className="mt-7 grid gap-4">
        {(["name","phone","address","city"] as const).map(field => (
          <label key={field} className="grid gap-2 text-sm">
            <span className="capitalize text-[#2A2421]/70">{field === "phone" ? "WhatsApp / Phone" : field}</span>
            <input required={field !== "address"} value={form[field]} onChange={e => setForm({...form,[field]:e.target.value})} className="rounded-lg border border-[#2A2421]/30 bg-transparent px-4 py-3 outline-none transition-colors focus:border-[#C87D53]" />
          </label>
        ))}
        <label className="grid gap-2 text-sm">
          <span className="text-[#2A2421]/70">Payment method</span>
          <select value={payment} onChange={e => setPayment(e.target.value as PaymentMethod)} className="rounded-lg border border-[#2A2421]/30 bg-transparent px-4 py-3 outline-none transition-colors focus:border-[#C87D53]">
            {(["Easypaisa","Bank Transfer","Cash on Delivery"] as PaymentMethod[]).map(m => <option key={m}>{m}</option>)}
          </select>
        </label>
        <div className="rounded-xl bg-[#F4EBE1] p-4 text-sm leading-6 text-[#2A2421]/70">
          <div className="flex items-center gap-2 font-medium text-[#2A2421]"><Check size={16}/>{payment}</div>
          <p className="mt-1">{instructions}</p>
          {payment !== "Cash on Delivery" && <p className="mt-2 text-xs">Payment remains pending until Nazar.pk verifies it. Use WhatsApp to send proof.</p>}
        </div>
        <label className="grid gap-2 text-sm"><span className="text-[#2A2421]/70">Additional notes</span><textarea value={form.notes} onChange={e => setForm({...form,notes:e.target.value})} rows={3} className="resize-none rounded-lg border border-[#2A2421]/30 bg-transparent px-4 py-3 outline-none transition-colors focus:border-[#C87D53]" /></label>
        <button disabled={!business.whatsapp} className="flex items-center justify-center gap-2 rounded-full bg-[#2A2421] px-5 py-3.5 text-sm font-medium text-[#F4EBE1] transition-colors hover:bg-[#C87D53] disabled:cursor-not-allowed disabled:opacity-40">
          <MessageCircle size={18}/> {business.whatsapp ? "Continue to WhatsApp" : "Add verified WhatsApp number in config"}
          <ArrowUpRight size={16}/>
        </button>
        {sent && <p className="text-sm text-[#2A2421]/60">Your order details are ready to send. Nazar.pk confirmation happens manually after the WhatsApp handoff.</p>}
      </form>
      {payment !== "Cash on Delivery" && (
        <button type="button" onClick={() => navigator.clipboard?.writeText(instructions)} className="mt-4 flex items-center gap-2 text-xs text-[#2A2421]/50 hover:text-[#2A2421]"><Copy size={14}/> Copy payment instructions</button>
      )}
    </div>
  );
}
