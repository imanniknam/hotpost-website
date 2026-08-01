"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/** Entrance easing: fast out, long settle. Reads as "arriving" rather than "sliding". */
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * How long to wait for IntersectionObserver before revealing regardless.
 * Content must never stay hidden because an observer failed to report.
 */
const FALLBACK_MS = 1500;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before this element starts. */
  delay?: number;
  /** Travel distance in px. Set 0 for a pure fade. */
  y?: number;
  /** Start slightly small and settle to full size. */
  scale?: boolean;
  as?: "div" | "section" | "article" | "li";
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  scale = false,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setExpired(true), FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Narrowed to one element type: the union of allowed tags would otherwise
  // intersect their ref types into something no single ref can satisfy.
  const Component = motion[as] as typeof motion.div;
  const show = inView || expired;

  // Movement is what triggers vestibular discomfort, so reduced motion keeps
  // the fade (which conveys the same "this is new" signal) and drops the rest.
  const hidden = reduced ? { opacity: 0 } : { opacity: 0, y, scale: scale ? 0.96 : 1 };
  const shown = reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 };

  return (
    <Component
      ref={ref}
      className={cn(className)}
      initial={hidden}
      animate={show ? shown : hidden}
      transition={{ duration: reduced ? 0.3 : 0.7, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}
