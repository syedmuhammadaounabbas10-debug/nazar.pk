# Nazar.pk — Premium Eyewear Website

A production-oriented Next.js + TypeScript + Tailwind + Framer Motion starter for Nazar.pk.

## Important data policy

This project intentionally does **not** invent Nazar.pk phone numbers, WhatsApp numbers, addresses, payment credentials, products, prices, reviews, certifications or delivery promises.

Before launch, update:

- `lib/config.ts` — verified business contact and payment information.
- `lib/products.ts` — verified product catalogue, prices, variants and images.
- `public/` — real Nazar.pk logo and product/lifestyle assets.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## WhatsApp ordering

The order workflow is intentionally manual:

1. Customer selects product/order details.
2. Customer enters delivery information.
3. Customer selects JazzCash, Easypaisa, Bank Transfer or COD.
4. The app generates a structured WhatsApp message.
5. Nazar.pk receives the order request and confirms it manually.
6. For manual payments, the customer can share payment proof in WhatsApp.
7. Payment is not marked verified automatically.

Set `business.whatsapp` in `lib/config.ts` to the verified WhatsApp number in international format without `+`, spaces or punctuation.

## Adding products

Add only verified products to `lib/products.ts`.

Example shape:

```ts
{
  id: "verified-sku",
  name: "Verified Product Name",
  category: "Eyeglasses",
  price: 0,
  image: "/products/verified-product.webp",
  variants: ["Verified variant"]
}
```

Do not copy the example values as real business data.

## Payment details

Keep all payment details in `lib/config.ts`:

- JazzCash
- Easypaisa
- Bank transfer
- COD availability

Never put account credentials or secrets into client code. Public payment destination details should only be entered if Nazar.pk has explicitly verified them.

## Accessibility

The UI uses semantic controls, visible focus behavior from browser defaults, keyboard-operable navigation and avoids hover-only ordering actions on mobile.

## Reduced motion

Framer Motion animations are intentionally subtle. For a final production launch, add a project-wide `useReducedMotion` policy if stronger animation is introduced.

## Deployment

This app is compatible with standard Next.js hosting. Configure environment variables and image domains only if future integrations require them.
