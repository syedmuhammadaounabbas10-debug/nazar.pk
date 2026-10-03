"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { business } from "@/lib/config";
import { premiumEase } from "@/lib/motion";

export default function WhatsAppFab() {
  const pathname = usePathname();

  const href = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
    "Hello Nazar.pk, I would like to know more about your products."
  )}`;

  /*
    Positioning: bottom-right as the audit recommends, but pulled tighter into
    the corner (12px + safe area) and slightly smaller on mobile so the fixed
    overlay intrudes as little as possible on the product grid. The whole anchor
    stays >=44px in both dimensions, so the tap target remains safe.

    End-of-page clearance is handled by `.fab-clearance` (globals.css) on the
    shared footer, and the hairline `ring` makes the button read as an overlay
    layer rather than part of the page content it floats above.
  */
  const fabClass =
    "group fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] right-3 z-40 flex items-center gap-3 rounded-full bg-[#25D366] py-2.5 pl-2.5 pr-2.5 text-white shadow-lg shadow-black/25 ring-1 ring-black/5 transition-colors duration-300 hover:bg-[#1EBE5A] hover:pr-5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:py-3 sm:pl-3 sm:pr-3";

  /*
    Suppressed on the checkout flow (`/order/*`). That page keeps the Variant
    selector and Quantity controls flush to the bottom-right of the Order
    Summary, and a `position: fixed` anchor can never be guaranteed clear of
    them at every scroll position — it ends up overlapping (and capturing taps
    meant for) those controls. The order page already provides its own
    prominent "Place Order on WhatsApp" action, so no support entry point is
    lost.
  */
  if (pathname?.startsWith("/order")) return null;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Nazar.pk on WhatsApp"
      title="Chat with Nazar.pk on WhatsApp"
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: premiumEase }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      className={fabClass}
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15 sm:h-11 sm:w-11">
        <span className="absolute inset-0 rounded-full bg-[#25D366]/60 motion-safe:animate-ping" />
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="relative h-5 w-5 sm:h-6 sm:w-6"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.003-5.45 4.437-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.83 9.83 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.8 11.8 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0020.465 3.488" />
        </svg>
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[6rem]">
        Chat with us
      </span>
    </motion.a>
  );
}
