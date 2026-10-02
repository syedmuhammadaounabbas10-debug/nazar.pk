import { Metadata } from 'next';
import { MessageCircle, Mail } from "lucide-react";
import { business } from "@/lib/config";

export const metadata: Metadata = {
  title: 'Contact Nazar.pk | Eyewear & Customer Support',
  description: 'Have a question about your order, a frame, or payment? Reach us through WhatsApp or Email. We are here to help.',
};

const supportItems = [
  "Product questions",
  "Order assistance",
  "Payment information",
  "Delivery questions",
  "General inquiries",
];

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-xs font-semibold tracking-[.22em] uppercase text-[#C87D53]">Contact Us</p>
        <h1 className="text-4xl font-serif font-medium text-[#2A2421] md:text-5xl">Talk to Nazar.pk</h1>
        <p className="mt-4 text-base leading-relaxed text-[#2A2421]/70">
          Have a question about your order, a frame, or payment? Reach us through any channel below.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <a
            href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent("Hello Nazar.pk, I would like to know more about your products.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-start gap-3 rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] p-7 transition-all hover:-translate-y-0.5 hover:shadow-lg"
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
            className="group flex flex-col items-start gap-3 rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] p-7 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            aria-label="Email Nazar.pk"
          >
            <div className="rounded-full bg-[#2A2421]/5 p-3">
              <Mail size={24} className="text-[#2A2421]" />
            </div>
            <p className="text-lg font-serif font-medium text-[#2A2421]">Email Us</p>
            <p className="text-sm text-[#2A2421]/70">{business.email}</p>
            <span className="text-xs font-medium text-[#2A2421]/60 group-hover:underline">Send email →</span>
          </a>
        </div>

        <div className="mt-10 rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] p-7">
          <p className="mb-3 text-xs font-semibold tracking-[.2em] uppercase text-[#C87D53]">Support</p>
          <p className="text-lg font-serif font-medium text-[#2A2421]">We're here to help</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {supportItems.map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-[#2A2421]/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C87D53]/50" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] p-7">
          <p className="mb-3 text-xs font-semibold tracking-[.2em] uppercase text-[#C87D53]">Payment Methods</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-[#2A2421]">Easypaisa</p>
              <p className="mt-1 text-sm text-[#2A2421]/70">Account: {business.payments.easypaisa.accountName}</p>
              <p className="text-sm text-[#2A2421]/70">Number: {business.payments.easypaisa.number}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#2A2421]">Bank Transfer</p>
              <p className="mt-1 text-sm text-[#2A2421]/70">{business.payments.bankTransfer.bankName}</p>
              <p className="text-sm text-[#2A2421]/70">Account: {business.payments.bankTransfer.accountNumber}</p>
              <p className="text-sm text-[#2A2421]/70">IBAN: {business.payments.bankTransfer.iban}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
