"use client";

import { Headset, Mail, MessageCircle } from "lucide-react";
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
    <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
      <a
        href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent("Hello Nazar.pk, I would like to know more about your products.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-start gap-3 rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg sm:p-6"
        aria-label="Chat with Nazar.pk on WhatsApp"
      >
        <div className="rounded-full bg-[#25D366]/15 p-3">
          <MessageCircle size={24} className="text-[#25D366]" />
        </div>
        <p className="text-lg font-serif font-medium text-[#2A2421]">WhatsApp</p>
        <p className="break-all text-sm text-[#2A2421]/70">{business.phone}</p>
        <span className="mt-auto pt-1 text-xs font-medium text-[#25D366] group-hover:underline">
          Open chat →
        </span>
      </a>

      <a
        href={`mailto:${business.email}`}
        className="group flex flex-col items-start gap-3 rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg sm:p-6"
        aria-label="Email Nazar.pk"
      >
        <div className="rounded-full bg-[#2A2421]/5 p-3">
          <Mail size={24} className="text-[#2A2421]" />
        </div>
        <p className="text-lg font-serif font-medium text-[#2A2421]">Email Us</p>
        <p className="break-all text-sm text-[#2A2421]/70">{business.email}</p>
        <span className="mt-auto pt-1 text-xs font-medium text-[#2A2421]/60 group-hover:underline">
          Send email →
        </span>
      </a>

      <div className="flex flex-col items-start gap-3 rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] p-5 sm:col-span-2 sm:p-6 lg:col-span-1">
        <div className="rounded-full bg-[#C87D53]/15 p-3">
          <Headset size={24} className="text-[#C87D53]" />
        </div>
        <p className="text-lg font-serif font-medium text-[#2A2421]">Customer Support</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#2A2421]/70 sm:flex-col">
          {supportItems.map(item => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C87D53]/50" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
