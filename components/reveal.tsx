"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    document.documentElement.classList.add("js-reveal");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={elementRef} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
