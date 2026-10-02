import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Shop from "../components/Shop";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { Section } from "../components/Section";

export const metadata = {
  title: "Nazar.pk — Premium Eyewear & Sunglasses in Pakistan",
  description: "Shop premium frames and sunglasses from Nazar.pk. Thoughtfully selected eyewear designed for everyday clarity, comfort, and style. Cash on Delivery across Pakistan.",
  openGraph: {
    title: "Nazar.pk — Premium Eyewear & Sunglasses in Pakistan",
    description: "Discover premium eyewear and sunglasses from Nazar.pk.",
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

        <Section id="contact" eyebrow="Contact" title="Talk to Nazar.pk.">
          <Contact />
        </Section>
      </main>

      <Footer />
    </>
  );
}
