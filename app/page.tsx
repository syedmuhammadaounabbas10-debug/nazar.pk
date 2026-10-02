import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Shop from "../components/Shop";
import OrderPanel from "../components/OrderPanel";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { Section } from "../components/Section";
import { business } from "../lib/config";

export const metadata = {
  title: "Nazar.pk — Premium Eyewear",
  description: "Premium eyewear designed for everyday clarity, comfort, and style. Shop frames and sunglasses from Nazar.pk with Cash on Delivery across Pakistan.",
  openGraph: {
    title: "Nazar.pk — Premium Eyewear",
    description: "Premium eyewear designed for everyday clarity, comfort, and style.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <Section
          id="shop"
          eyebrow="Shop"
          title="Frames selected for everyday wear."
        >
          <Shop />
        </Section>

        <Section id="order" eyebrow="Order" title="Keep the checkout human.">
          <div className="grid gap-8 md:grid-cols-[.85fr_1.15fr]">
            <div className="flex flex-col justify-center">
              <p className="text-sm leading-7 text-[#2A2421]/70">
                Choose a frame, share your delivery details, select a payment
                method, and send the order straight to Nazar.pk on WhatsApp.
              </p>
              <div className="mt-8 border-l border-[#2A2421]/20 pl-5 text-sm leading-6 text-[#2A2421]/60">
                <p>Payment states:</p>
                <p className="text-[#2A2421]/50">
                  Pending → Proof submitted → Under verification → Verified →
                  Confirmed
                </p>
              </div>
            </div>
            <OrderPanel />
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Talk to Nazar.pk.">
          <Contact />
        </Section>
      </main>

      <Footer />
    </>
  );
}
