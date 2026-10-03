import React from "react";
import Reveal from "./motion/Reveal";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Stays a Server Component — only the <Reveal /> wrapper is a client boundary,
 * so the animation is added without shipping this markup to the client.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`border-b border-[#2A2421]/10 py-12 sm:py-16 md:py-20 lg:py-24 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header fades + rises as the section scrolls into view */}
        <Reveal className="mb-8 max-w-3xl sm:mb-10 md:mb-12">
          {eyebrow && (
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#C87D53]">
              {eyebrow}
            </p>
          )}
          <h2 className="font-serif text-2xl font-medium leading-tight text-[#2A2421] sm:text-3xl md:text-4xl lg:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base leading-relaxed text-[#2A2421]/70 md:text-lg">
              {description}
            </p>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export default Section;