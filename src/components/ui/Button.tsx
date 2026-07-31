import Link from "next/link";

import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "bg-brand-500 text-white hover:bg-brand-600",
  outline: "border border-brand-200 text-brand-700 hover:bg-brand-50",
  ghost: "text-ink-700 hover:bg-surface-muted",
} as const;

type Variant = keyof typeof variants;

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}
