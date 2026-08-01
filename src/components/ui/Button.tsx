import { PressableButton, PressableLink } from "@/components/motion/Pressable";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "bg-brand-gradient text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40",
  outline: "ring-brand-gradient text-brand-700 hover:text-brand-800",
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
    <PressableLink href={href} className={cn(base, variants[variant], className)}>
      {children}
    </PressableLink>
  );
}

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <PressableButton className={cn(base, variants[variant], className)} {...props} />;
}
