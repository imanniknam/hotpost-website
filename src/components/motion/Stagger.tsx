"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** See Reveal: never leave content hidden because an observer failed to report. */
const FALLBACK_MS = 1500;

const container = (stagger: number, reduced: boolean): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: reduced ? 0 : stagger } },
});

const child = (reduced: boolean): Variants => ({
  hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: reduced ? 0.3 : 0.6, ease: EASE },
  },
});

/**
 * Wraps a grid or list so its children animate in sequence. Children must be
 * `StaggerItem`s — variants propagate from parent to child automatically, so
 * the items need no props of their own.
 */
export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "dl";
}) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setExpired(true), FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Narrowed to one element type: the union of allowed tags would otherwise
  // intersect their ref types into something no single ref can satisfy.
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      ref={ref}
      className={cn(className)}
      variants={container(stagger, reduced)}
      initial="hidden"
      animate={inView || expired ? "show" : "hidden"}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const reduced = useReducedMotion() ?? false;
  const Component = motion[as];

  return (
    <Component className={cn(className)} variants={child(reduced)}>
      {children}
    </Component>
  );
}
