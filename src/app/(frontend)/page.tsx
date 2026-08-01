import Image from "next/image";
import Link from "next/link";

import { HoverLift } from "@/components/motion/HoverLift";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { ProductCard } from "@/components/shop/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { FaqJsonLd, FaqList } from "@/components/ui/Faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SupportBanner } from "@/components/ui/SupportBanner";
import {
  getFaqs,
  getFeaturedProducts,
  getHomePage,
  getServices,
  getSiteSettings,
} from "@/lib/queries";

export default async function HomePage() {
  const [home, services, products, faqs, settings] = await Promise.all([
    getHomePage(),
    getServices(),
    getFeaturedProducts(8),
    getFaqs(),
    getSiteSettings(),
  ]);

  const heroImage = typeof home.heroImage === "object" ? home.heroImage : null;
  const aboutImage = typeof home.aboutImage === "object" ? home.aboutImage : null;

  return (
    <>
      <FaqJsonLd faqs={faqs} />

      {/* Hero */}
      <section className="container-hp pt-10">
        <div className="bg-surface-gradient grid items-center gap-10 overflow-hidden rounded-3xl p-8 ring-1 ring-black/5 sm:p-12 md:grid-cols-2">
          <Reveal y={0}>
            <p className="mb-3 font-bold text-brand-600">{home.eyebrow}</p>
            <h1 className="text-3xl font-extrabold leading-[1.5] sm:text-4xl sm:leading-[1.4]">
              {home.heading}
            </h1>
            <p className="mt-4 text-lg text-ink-500">{home.subheading}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/services">خدمات ما ←</ButtonLink>
              <ButtonLink href="#contact" variant="outline">
                تماس با ما
              </ButtonLink>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {heroImage?.url && (
              <Reveal delay={0.1} scale>
                <Image
                  src={heroImage.url}
                  alt={heroImage.alt}
                  width={640}
                  height={420}
                  priority
                  className="rounded-2xl object-cover"
                />
              </Reveal>
            )}

            <StaggerGroup as="dl" className="grid grid-cols-3 gap-3" stagger={0.1}>
              {home.stats?.map((stat) => (
                <StaggerItem key={stat.id ?? stat.label}>
                  {/* Reversed so the value reads above the label while keeping dt before dd. */}
                  <div className="flex h-full flex-col-reverse rounded-2xl bg-white/80 p-4 text-center shadow-sm ring-1 ring-black/5 backdrop-blur">
                    <dt className="mt-1 text-xs text-ink-500">{stat.label}</dt>
                    <dd className="nums text-brand-gradient text-2xl font-extrabold">
                      {stat.value}
                    </dd>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-hp mt-24">
        <Reveal>
          <SectionHeading
            title="خدمات اصلی هات پست"
            subtitle="چهار مدل خدماتی، متناسب با هر کسب‌وکار"
            href="/services"
            hrefLabel="مشاهده خدمات"
          />
        </Reveal>

        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <StaggerItem key={service.id} className="h-full">
              <HoverLift className="h-full">
                <Link
                  href={`/services#${service.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-500/10"
                >
                  {/* Gradient wash that fades in behind the card content on hover. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span className="relative">
                    <h3 className="text-lg font-extrabold transition-colors group-hover:text-brand-600">
                      {service.title}
                    </h3>
                    {service.englishTitle && (
                      <span className="mt-1 block text-xs font-medium text-brand-500">
                        {service.englishTitle}
                      </span>
                    )}
                    <span className="mt-3 block text-sm leading-7 text-ink-500">
                      {service.tagline}
                    </span>
                  </span>
                </Link>
              </HoverLift>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Shop */}
      {products.length > 0 && (
        <section className="container-hp mt-24">
          <Reveal>
            <SectionHeading
              title="اقلام فروشگاه هات پست"
              subtitle="ملزومات بسته‌بندی، ارسال و تجهیزات چاپ"
              href="/shop"
            />
          </Reveal>
          <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {products.map((product) => (
              <StaggerItem key={product.id} className="h-full">
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      )}

      {/* About */}
      <section className="container-hp mt-24">
        <Reveal scale>
          <div className="bg-surface-gradient grid items-center gap-10 rounded-3xl p-8 ring-1 ring-black/5 sm:p-12 md:grid-cols-2">
            {aboutImage?.url && (
              <Image
                src={aboutImage.url}
                alt={aboutImage.alt}
                width={640}
                height={480}
                className="rounded-2xl object-cover"
              />
            )}
            <div className={aboutImage?.url ? "" : "md:col-span-2"}>
              <h2 className="text-2xl font-extrabold sm:text-3xl">{home.aboutHeading}</h2>
              <p className="mt-4 leading-9 text-ink-700">{home.aboutSummary}</p>
              <ButtonLink href="/about" className="mt-8">
                درباره ما ←
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="container-hp mt-24">
          <Reveal>
            <SectionHeading title="پرسش‌های متداول" className="justify-center text-center" />
            <FaqList faqs={faqs} />
          </Reveal>
        </section>
      )}

      {/* Support */}
      <section className="mt-24">
        <Reveal scale>
          <SupportBanner settings={settings} />
        </Reveal>
      </section>

      {/* Closing */}
      <section className="container-hp mt-16">
        <Reveal>
          <p className="mx-auto max-w-4xl text-center leading-9 text-ink-500">{home.closingText}</p>
        </Reveal>
      </section>
    </>
  );
}
