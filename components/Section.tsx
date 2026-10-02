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
    <section id={id} className={`py-16 md:py-24 border-b border-[#2A2421]/10 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="mb-10 max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold tracking-widest text-[#C87D53] uppercase">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-serif font-medium text-[#2A2421] md:text-5xl leading-tight">
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