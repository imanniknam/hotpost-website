import type { Metadata } from "next";

import { SupportBanner } from "@/components/ui/SupportBanner";
import { getServices, getSiteSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "خدمات هات پست",
  description:
    "پس‌کرایه، تسویه درب منزل (COD)، فول‌فیلمنت و پیک اختصاصی — خدمات پستی هات پست با انتخاب بهترین اپراتور از بین تیپاکس، چاپار، پینکس، ماهکس و پست جمهوری اسلامی.",
};

function List({ title, items }: { title: string; items?: { text: string; id?: string | null }[] | null }) {
  if (!items?.length) return null;

  return (
    <div>
      <h3 className="mb-3 font-bold">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id ?? item.text} className="flex gap-2 text-sm leading-7 text-ink-500">
            <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-500" />
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSiteSettings()]);

  return (
    <>
      <section className="container-hp pt-10">
        <h1 className="text-3xl font-extrabold sm:text-4xl">خدمات هات پست</h1>
        <p className="mt-4 max-w-3xl leading-9 text-ink-500">
          خدمات پستی مختلف با انتخاب بهترین اپراتور از بین تیپاکس، چاپار، پینکس، ماهکس و ... انجام
          می‌شود.
        </p>
      </section>

      <div className="container-hp mt-12 space-y-8">
        {services.map((service) => (
          <section
            key={service.id}
            id={service.slug}
            className="scroll-mt-24 rounded-3xl border border-black/5 bg-white p-8 sm:p-10"
          >
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="text-2xl font-extrabold">{service.title}</h2>
              {service.englishTitle && (
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                  {service.englishTitle}
                </span>
              )}
            </div>

            <p className="mt-3 font-medium text-brand-600">{service.tagline}</p>
            <p className="mt-4 max-w-4xl leading-9 text-ink-700">{service.summary}</p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <List title="خدمات شامل" items={service.includes} />
              <List
                title={service.slug === "courier" ? "مدل زمانی و حوزه جغرافیایی" : "پوشش"}
                items={service.coverage}
              />
              <List title="مزایا" items={service.benefits} />
            </div>

            <div className="mt-8 rounded-2xl bg-surface-muted p-5">
              <span className="font-bold">بهترین گزینه برای: </span>
              <span className="text-ink-500">{service.bestFor}</span>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-24">
        <SupportBanner settings={settings} />
      </section>
    </>
  );
}
