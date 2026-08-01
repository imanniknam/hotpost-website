"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/cn";

/**
 * Card-sized hover affordance: a small lift and scale on a spring, so it tracks
 * the pointer's arrival and departure rather than running a fixed duration.
 */
export function HoverLift({
  children,
  className,
  lift = 4,
  scale = 1.02,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  lift?: number;
  scale?: number;
  as?: "div" | "article" | "li";
}) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) return <div className={cn(className)}>{children}</div>;

  return (
    <Component
      className={cn(className)}
      whileHover={{ y: -lift, scale }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
    >
      {children}
    </Component>
  );
}
