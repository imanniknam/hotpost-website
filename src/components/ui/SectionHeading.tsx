import { PressableLink } from "@/components/motion/Pressable";
import { cn } from "@/lib/cn";

export function SectionHeading({
  title,
  subtitle,
  href,
  hrefLabel = "مشاهده همه",
  className,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  hrefLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 flex flex-wrap items-end justify-between gap-4", className)}>
      <div>
        <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-ink-500">{subtitle}</p>}
      </div>
      {href && (
        <PressableLink
          href={href}
          className="ring-brand-gradient shrink-0 rounded-full px-4 py-2 text-sm font-medium text-brand-700 transition-colors hover:text-brand-800"
        >
          {hrefLabel}
        </PressableLink>
      )}
    </div>
  );
}
