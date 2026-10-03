import { Metadata } from 'next';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "@/components/motion/Reveal";
import Stagger, { StaggerItem } from "@/components/motion/Stagger";
import { MessageCircle, Mail } from "lucide-react";
import { business } from "@/lib/config";

export const metadata: Metadata = {
  title: 'Contact Nazar.pk | Eyewear & Customer Support',
  description: 'Have a question about your order, a frame, or payment? Reach Nazar.pk on WhatsApp or email. Cash on Delivery available across Pakistan.',
  alternates: { canonical: '/contact' },
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
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12 sm:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <Stagger stagger={0.09} amount={0.3}>
            <StaggerItem>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[.22em] text-[#C87D53]">Contact Us</p>
            </StaggerItem>
            <StaggerItem>
              <h1 className="text-3xl font-serif font-medium leading-tight text-[#2A2421] sm:text-4xl md:text-5xl">
                Talk to Nazar.pk
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-4 text-base leading-relaxed text-[#2A2421]/70">
                Have a question about your order, a frame, or payment? Reach us through any channel below.
              </p>
            </StaggerItem>
          </Stagger>

          <Stagger className="mt-8 grid gap-6 sm:mt-10 md:grid-cols-2" stagger={0.1}>
            <StaggerItem>
              <a
                href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent("Hello Nazar.pk, I would like to know more about your products.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] p-5 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[#2A2421]/20 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:shadow-lg sm:p-7"
                aria-label="Chat with Nazar.pk on WhatsApp"
              >
                <div className="rounded-full bg-[#25D366]/15 p-3 transition-transform duration-300 ease-out group-hover:scale-105">
                  <MessageCircle size={24} className="text-[#25D366]" aria-hidden="true" />
                </div>
                <p className="text-lg font-serif font-medium text-[#2A2421]">WhatsApp</p>
                <p className="break-all text-sm text-[#2A2421]/70">{business.phone}</p>
                <span className="mt-auto pt-1 text-xs font-medium text-[#25D366] group-hover:underline">
                  Open chat →
                </span>
              </a>
            </StaggerItem>

            <StaggerItem>
              <a
                href={`mailto:${business.email}`}
                className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] p-5 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[#2A2421]/20 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:shadow-lg sm:p-7"
                aria-label="Email Nazar.pk"
              >
                <div className="rounded-full bg-[#2A2421]/5 p-3 transition-transform duration-300 ease-out group-hover:scale-105">
                  <Mail size={24} className="text-[#2A2421]" aria-hidden="true" />
                </div>
                <p className="text-lg font-serif font-medium text-[#2A2421]">Email Us</p>
                <p className="break-all text-sm text-[#2A2421]/70">{business.email}</p>
                <span className="mt-auto pt-1 text-xs font-medium text-[#2A2421]/60 group-hover:underline">
                  Send email →
                </span>
              </a>
            </StaggerItem>
          </Stagger>

          <Reveal y={16} amount={0.1} className="mt-8 rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] p-5 sm:mt-10 sm:p-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[.2em] text-[#C87D53]">Support</p>
            <p className="text-lg font-serif font-medium text-[#2A2421]">We're here to help</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {supportItems.map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-[#2A2421]/70">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C87D53]/50" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal y={16} amount={0.1} className="mt-8 rounded-2xl border border-[#2A2421]/10 bg-[#EAE1D7] p-5 sm:mt-10 sm:p-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[.2em] text-[#C87D53]">Payment Methods</p>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-[#2A2421]">Easypaisa</p>
                <p className="mt-1 break-words text-sm text-[#2A2421]/70">Account: {business.payments.easypaisa.accountName}</p>
                <p className="break-words text-sm text-[#2A2421]/70">Number: {business.payments.easypaisa.number}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#2A2421]">Bank Transfer</p>
                <p className="mt-1 break-words text-sm text-[#2A2421]/70">{business.payments.bankTransfer.bankName}</p>
                <p className="break-words text-sm text-[#2A2421]/70">Account: {business.payments.bankTransfer.accountNumber}</p>
                <p className="break-words text-sm text-[#2A2421]/70">IBAN: {business.payments.bankTransfer.iban}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
