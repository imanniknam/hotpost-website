"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

import { cn } from "@/lib/cn";

const MotionLink = motion.create(Link);

const spring = { type: "spring", stiffness: 400, damping: 22 } as const;

/** Button-sized press feedback. Scale only — no layout properties. */
export function PressableLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <Link href={href} className={cn(className)}>
        {children}
      </Link>
    );
  }

  return (
    <MotionLink
      href={href}
      className={cn(className)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={spring}
    >
      {children}
    </MotionLink>
  );
}

export function PressableButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <button className={cn(className)} {...props}>
        {children}
      </button>
    );
  }

  return (
    <motion.button
      className={cn(className)}
      whileHover={props.disabled ? undefined : { scale: 1.03 }}
      whileTap={props.disabled ? undefined : { scale: 0.97 }}
      transition={spring}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
