import type { Metadata } from "next";

import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
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
      <StaggerGroup as="ul" className="space-y-2" stagger={0.05}>
        {items.map((item) => (
          <StaggerItem
            as="li"
            key={item.id ?? item.text}
            className="flex gap-2 text-sm leading-7 text-ink-500"
          >
            <span
              aria-hidden="true"
              className="mt-2.5 size-1.5 shrink-0 rounded-full bg-linear-to-br from-brand-400 to-brand-600"
            />
            {item.text}
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSiteSettings()]);

  return (
    <>
      <section className="container-hp pt-10">
        <Reveal y={0}>
          <h1 className="text-3xl font-extrabold sm:text-4xl">خدمات هات پست</h1>
          <p className="mt-4 max-w-3xl leading-9 text-ink-500">
            خدمات پستی مختلف با انتخاب بهترین اپراتور از بین تیپاکس، چاپار، پینکس، ماهکس و ... انجام
            می‌شود.
          </p>
        </Reveal>
      </section>

      <div className="container-hp mt-12 space-y-8">
        {services.map((service) => (
          <Reveal key={service.id} scale>
            <section
              id={service.slug}
              className="bg-brand-gradient-soft relative overflow-hidden rounded-3xl p-8 shadow-sm ring-1 ring-black/5 sm:p-10"
            >
              {/* Accent rail along the leading edge, RTL-safe via inset-inline-start. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 start-0 w-1.5 bg-linear-to-b from-brand-400 to-brand-600"
              />

              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="text-2xl font-extrabold">{service.title}</h2>
                {service.englishTitle && (
                  <span className="rounded-full bg-brand-gradient px-3 py-1 text-xs font-bold text-white shadow-sm shadow-brand-500/25">
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

              <div className="mt-8 rounded-2xl bg-white/70 p-5 ring-1 ring-black/5 backdrop-blur">
                <span className="font-bold">بهترین گزینه برای: </span>
                <span className="text-ink-500">{service.bestFor}</span>
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      <section className="mt-24">
        <Reveal scale>
          <SupportBanner settings={settings} />
        </Reveal>
      </section>
    </>
  );
}
