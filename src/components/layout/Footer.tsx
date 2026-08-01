import Link from "next/link";

import type { SiteSetting } from "@/payload-types";

export function Footer({ settings }: { settings: SiteSetting }) {
  return (
    <footer className="bg-surface-gradient relative mt-24 border-t border-black/5">
      {/* Hairline brand rule across the top edge. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-l from-transparent via-brand-400 to-transparent"
      />
      <div className="container-hp grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-4 flex items-center gap-2 text-lg font-extrabold">
            <span className="bg-brand-gradient grid size-9 place-items-center rounded-xl text-white shadow-md shadow-brand-500/30">
              هـ
            </span>
            <span>هات پست</span>
          </div>
          <p className="max-w-prose text-sm leading-8 text-ink-500">{settings.footerText}</p>
        </div>

        <div>
          <h2 className="mb-4 font-bold">دسترسی سریع</h2>
          <ul className="space-y-2 text-sm text-ink-500">
            {settings.quickLinks?.map((link) => (
              <li key={link.id ?? link.href}>
                <Link href={link.href} className="transition hover:text-brand-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-bold">تماس با هات پست</h2>
          <ul className="space-y-3 text-sm text-ink-500">
            {settings.phones?.map((phone) => (
              <li key={phone.id ?? phone.dial}>
                <a href={`tel:${phone.dial}`} className="nums transition hover:text-brand-600">
                  {phone.display}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <span className="block font-medium text-ink-700">روز و ساعت پاسخگویی</span>
              {settings.hours}
            </li>
            <li className="pt-2">
              <span className="block font-medium text-ink-700">آدرس</span>
              {settings.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/5">
        <div className="container-hp py-5 text-center text-xs text-ink-500">
          تمامی حقوق برای هات پست محفوظ است.
        </div>
      </div>
    </footer>
  );
}
