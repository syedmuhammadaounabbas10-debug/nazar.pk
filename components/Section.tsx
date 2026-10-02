import React from "react";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`border-b border-[#2A2421]/10 py-12 sm:py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 max-w-3xl sm:mb-10">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#C87D53]">
              {eyebrow}
            </p>
          )}
          <h2 className="text-2xl font-serif font-medium leading-tight text-[#2A2421] sm:text-3xl md:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base leading-relaxed text-[#2A2421]/70 md:text-lg">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

export default Section;