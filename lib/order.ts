import { Product } from "./products";
import { business, formatPKR, PaymentMethod } from "./config";

export type OrderForm = {
  name: string;
  phone: string;
  address: string;
  city: string;
  payment: PaymentMethod;
  notes: string;
};

export function buildOrderMessage(
  items: Array<{ product: Product; quantity: number; variant?: string }>,
  form: OrderForm
) {
  const lines = items.map((item, index) => {
    const price = item.product.price;
    return `${index + 1}. ${item.product.name} × ${item.quantity}${item.variant ? ` — ${item.variant}` : ""}${price != null ? ` — ${formatPKR(price * item.quantity)}` : ""}`;
  });

  const total = items.reduce(
    (sum, item) => sum + (item.product.price ?? 0) * item.quantity,
    0
  );

  return [
    "New Nazar.pk Order",
    "",
    ...lines,
    "",
    `Order Total: ${total ? formatPKR(total) : "To be confirmed"}`,
    `Payment Method: ${form.payment}`,
    `Payment Status: ${form.payment === "Cash on Delivery" ? "COD" : "Pending"}`,
    "",
    `Customer Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Delivery Address: ${form.address}`,
    `City: ${form.city}`,
    `Notes: ${form.notes || "—"}`,
    "",
    "Please confirm my order."
  ].join("\n");
}

export function productOrderMessage(product: Product, variant = "", quantity = 1) {
  return [
    "Assalam o Alaikum, I want to order this product from Nazar.pk:",
    "",
    `Product: ${product.name}`,
    `Quantity: ${quantity}`,
    variant ? `Variant: ${variant}` : "",
    product.price != null ? `Price: ${formatPKR(product.price)}` : "Price: To be confirmed",
    "",
    "Please confirm my order."
  ].filter(Boolean).join("\n");
}

export function getWhatsAppLink(message: string) {
  return whatsappUrl(message);
}

export function paymentInstructions(method: PaymentMethod) {
  if (method === "Easypaisa") {
    const p = business.payments.easypaisa;
    return p.number
      ? `Send payment to ${p.accountName} — ${p.number}.`
      : "Payment details will appear here once verified Nazar.pk details are added.";
  }
  if (method === "Bank Transfer") {
    const p = business.payments.bankTransfer;
    return p.accountNumber || p.iban
      ? `Bank: ${p.bankName || "—"} | Account: ${p.accountNumber || "—"} | IBAN: ${p.iban || "—"}`
      : "Bank details will appear here once verified Nazar.pk details are added.";
  }
  return "No advance payment is requested for COD. Nazar.pk confirms the order manually.";
}

export function whatsappUrl(message: string) {
  if (!business.whatsapp) return "";
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}
