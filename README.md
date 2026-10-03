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

The UI uses semantic controls, keyboard-operable navigation, `aria-current` / `aria-pressed` / `aria-expanded` state on interactive controls, decorative icons marked `aria-hidden`, 44–52px minimum tap targets and a keyboard-only `:focus-visible` ring. Ordering actions never depend on hover.

## Motion system

All animation is built on the Framer Motion version already listed in `package.json` — no additional animation dependency was added.

| File | Purpose |
| --- | --- |
| `lib/motion.ts` | Shared easing, durations, distances and variants (fade/slide, stagger, scale, indicator spring). |
| `components/motion/MotionProvider.tsx` | One global `MotionConfig reducedMotion="user"`. |
| `components/motion/Reveal.tsx` | Fade + rise when an element enters the viewport. |
| `components/motion/Stagger.tsx` | Sequenced reveals for grids, lists and form sections. |
| `components/motion/MotionLink.tsx` | Next.js `Link` with `whileHover` / `whileTap` micro-interactions. |
| `app/template.tsx` | Per-route entrance fade (re-mounts on navigation). |

Only `opacity` and `transform` are animated (GPU-friendly), travel distances stay small (≤ 24px), staggers stay ≤ 0.09s per item and there is no continuous/looping animation apart from the existing WhatsApp ping.

If JavaScript is unavailable, the hidden initial state that motion elements ship in the server HTML is neutralised by a `<noscript>` rule in `app/layout.tsx` (mirrored by an `@media (scripting: none)` rule in `app/globals.css`), so the site stays fully readable and crawlable.

## Reduced motion

Motion is honoured globally rather than per component:

- `<MotionProvider>` sets `reducedMotion="user"`, so Framer Motion skips transform and layout animations while opacity fades keep content readable.
- `app/globals.css` shortens CSS animations/transitions and disables smooth scrolling under `prefers-reduced-motion: reduce`.
- The hero's scroll parallax is switched off entirely when reduced motion is requested.

## Deployment

This app is compatible with standard Next.js hosting. Configure environment variables and image domains only if future integrations require them.
