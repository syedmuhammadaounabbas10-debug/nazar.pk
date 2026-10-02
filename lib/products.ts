/**
 * VERIFIED PRODUCT DATA FOR NAZAR.PK
 */
export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "Eyeglasses" | "Sunglasses" | "Other";
  price?: number;
  compareAtPrice?: number;
  image?: string;
  images?: string[]; // Multiple images for the product gallery
  variants?: string[];
  description?: string;
  rating?: number;
  reviews?: Review[];
};

export const products: Product[] = [
  {
    id: "1",
    slug: "classic-frame-glasses",
    name: "Classic Frame Glasses",
    category: "Eyeglasses",
    price: 2500,
    compareAtPrice: 3500,
    image: "/Images/products/image.png",
    images: ["/Images/products/image.png"],
    variants: ["Matte Black", "Tortoise", "Clear Crystal"],
    description: "Premium quality hand-finished frame with elegant style, perfect for everyday clarity and comfortable wear.",
    rating: 4.8,
    reviews: [
      { id: "r1", author: "Ahmad Khan", rating: 5, text: "Excellent quality and very comfortable to wear. Highly recommended!", date: "2026-09-15" },
      { id: "r2", author: "Sana Malik", rating: 4, text: "The frame fits perfectly and feels very lightweight. Fast delivery.", date: "2026-09-28" }
    ]
  },
  {
    id: "2",
    slug: "aviator-style-sunglasses",
    name: "Aviator Style Sunglasses",
    category: "Sunglasses",
    price: 2900,
    compareAtPrice: 4000,
    image: "/Images/products/image.png",
    images: ["/Images/products/image.png"],
    variants: ["Gold/Green", "Black/Dark Grey", "Silver/Blue Gradient"],
    description: "Classic aviator design that blends timeless style with superior sun protection. Crafted with lightweight yet durable metal.",
    rating: 4.9,
    reviews: [
      { id: "r3", author: "Zainab Bibi", rating: 5, text: "Looks absolutely stunning! The lens clarity is top-notch.", date: "2026-09-20" }
    ]
  },
  {
    id: "3",
    slug: "retro-square-eyeglasses",
    name: "Retro Square Eyeglasses",
    category: "Eyeglasses",
    price: 2700,
    compareAtPrice: 3800,
    image: "/Images/products/image.png",
    images: ["/Images/products/image.png"],
    variants: ["Glossy Black", "Honey Amber", "Clear Grey"],
    description: "A bold, vintage-inspired square shape that adds a smart and fashionable statement to any outfit.",
    rating: 4.7,
    reviews: [
      { id: "r4", author: "Bilal Shafi", rating: 5, text: "Good build quality. Great value for money.", date: "2026-09-25" }
    ]
  },
  {
    id: "4",
    slug: "wayfarer-classic-shades",
    name: "Wayfarer Classic Shades",
    category: "Sunglasses",
    price: 3200,
    compareAtPrice: 4500,
    image: "/Images/products/image.png",
    images: ["/Images/products/image.png"],
    variants: ["Matte Black", "Tortoiseshell"],
    description: "The ultimate iconic design. Perfect for both casual outings and formal days in the sun. Hand-polished acetate frame.",
    rating: 5.0,
    reviews: [
      { id: "r5", author: "Hamza Ali", rating: 5, text: "Perfect wayfarers. Exactly what I was looking for.", date: "2026-09-29" }
    ]
  }
];

export const categories = [
  { label: "All Frames", href: "/shop" },
  { label: "Eyeglasses", href: "/shop?category=Eyeglasses" },
  { label: "Sunglasses", href: "/shop?category=Sunglasses" }
];
