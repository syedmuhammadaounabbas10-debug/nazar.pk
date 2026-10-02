"use client";

import { MessageCircle, Mail } from "lucide-react";
import { business } from "@/lib/config";

const supportItems = [
  "Product questions",
  "Order assistance",
  "Payment information",
  "Delivery questions",
  "General inquiries",
];

export default function Contact() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      <a
        href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent("Hello Nazar.pk, I would like to know more about your products.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-start gap-3 rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
        aria-label="Chat with Nazar.pk on WhatsApp"
      >
        <div className="rounded-full bg-[#25D366]/15 p-3">
          <MessageCircle size={24} className="text-[#25D366]" />
        </div>
        <p className="text-lg font-serif font-medium text-[#2A2421]">WhatsApp</p>
        <p className="text-sm text-[#2A2421]/70">{business.phone}</p>
        <span className="text-xs font-medium text-[#25D366] group-hover:underline">Open chat →</span>
      </a>

      <a
        href={`mailto:${business.email}`}
        className="group flex flex-col items-start gap-3 rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
        aria-label="Email Nazar.pk"
      >
        <div className="rounded-full bg-[#2A2421]/5 p-3">
          <Mail size={24} className="text-[#2A2421]" />
        </div>
        <p className="text-lg font-serif font-medium text-[#2A2421]">Email Us</p>
        <p className="text-sm text-[#2A2421]/70">{business.email}</p>
        <span className="text-xs font-medium text-[#2A2421]/60 group-hover:underline">Send email →</span>
      </a>

      <div className="rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] p-6">
        <p className="mb-3 text-xs font-semibold tracking-[.2em] uppercase text-[#C87D53]">Support</p>
        <p className="text-lg font-serif font-medium text-[#2A2421]">We're here to help</p>
        <ul className="mt-3 flex flex-col gap-2 text-sm text-[#2A2421]/70">
          {supportItems.map(item => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C87D53]/50" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
