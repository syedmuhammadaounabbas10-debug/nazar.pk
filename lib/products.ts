/**
 * VERIFIED PRODUCT DATA GOES HERE.
 * This starter intentionally contains no invented Nazar.pk products or prices.
 */
export type Product = {
  id: string;
  name: string;
  category: "Eyeglasses" | "Sunglasses" | "Other";
  price?: number;
  compareAtPrice?: number;
  image?: string;
  variants?: string[];
  description?: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Frame Glasses",
    category: "Eyeglasses",
    price: 2500,
    compareAtPrice: 3500,
    image: "/Images/products/image.png",
    description: "Premium quality frame with elegant style."
  }
];

export const categories = [
  { label: "Eyeglasses", href: "#eyeglasses" },
  { label: "Sunglasses", href: "#sunglasses" },
  { label: "Collections", href: "#collections" }
];