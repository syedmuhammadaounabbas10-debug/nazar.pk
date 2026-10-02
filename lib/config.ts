/**
 * CENTRAL BUSINESS CONFIG
 * Replace every placeholder with Nazar.pk's verified business information.
 * Do not scatter payment/contact details through UI components.
 */
export const business = {
  name: "Nazar.pk",
  tagline: "Premium eyewear designed for everyday clarity, comfort, and style.",
  whatsapp: "923245908220",
  phone: "0324 5908220",
  email: "nazar.pk.offical@gmail.com",
  address: "Lahore, Pakistan",
  city: "Lahore",
  instagram: "https://www.instagram.com/nazar.pk.offical?stkn=MWtjY215azg0MXBpeA==",
  tiktok: "https://www.tiktok.com/@nazar.pk.offical?is_from_webapp=1&sender_device=pc",
  payments: {
    easypaisa: { enabled: true, accountName: "Syed Muhammad Aun Abbas", number: "03245908220" },
    bankTransfer: {
      enabled: true,
      bankName: "Meezan Bank",
      accountTitle: "Syed Muhammad Aun Abbas",
      accountNumber: "11560116132159",
      iban: "PK30MEZN0011560116132159",
    },
    cod: { enabled: true }
  }
} as const;

export type PaymentMethod = "Easypaisa" | "Bank Transfer" | "Cash on Delivery";

export function formatPKR(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0
  }).format(value);
}

export function whatsappUrl(message: string) {
  if (!business.whatsapp) return "";
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}
