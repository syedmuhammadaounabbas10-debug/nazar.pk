"use client";

import { useState } from "react";

interface ImageGalleryClientProps {
  images: string[];
  productName: string;
}

export default function ImageGalleryClient({ images, productName }: ImageGalleryClientProps) {
  const [activeImage, setActiveImage] = useState(images[0] || "/Images/products/image.png");

  return (
    <div className="space-y-4">
      {/* Main Image View */}
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-[#2A2421]/10 bg-[#EAE1D7]">
        <img
          src={activeImage}
          alt={`${productName} - Main View`}
          className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl border transition-all ${
                activeImage === img
                  ? "border-[#C87D53] ring-2 ring-[#C87D53]/25"
                  : "border-[#2A2421]/10 hover:border-[#2A2421]/30"
              }`}
            >
              <img
                src={img}
                alt={`${productName} Thumbnail ${idx + 1}`}
                className="h-full w-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
