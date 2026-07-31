import Image from "next/image";
import Link from "next/link";

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
        <div className="grid items-center gap-10 rounded-3xl bg-surface-muted p-8 sm:p-12 md:grid-cols-2">
          <div>
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
          </div>

          <div className="grid gap-4">
            {heroImage?.url && (
              <Image
                src={heroImage.url}
                alt={heroImage.alt}
                width={640}
                height={420}
                priority
                className="rounded-2xl object-cover"
              />
            )}

            <dl className="grid grid-cols-3 gap-3">
              {home.stats?.map((stat) => (
                // Reversed so the value reads above the label while keeping dt before dd.
                <div
                  key={stat.id ?? stat.label}
                  className="flex flex-col-reverse rounded-2xl bg-white p-4 text-center"
                >
                  <dt className="mt-1 text-xs text-ink-500">{stat.label}</dt>
                  <dd className="nums text-2xl font-extrabold text-brand-600">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-hp mt-24">
        <SectionHeading
          title="خدمات اصلی هات پست"
          subtitle="چهار مدل خدماتی، متناسب با هر کسب‌وکار"
          href="/services"
          hrefLabel="مشاهده خدمات"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services#${service.slug}`}
              className="group rounded-2xl border border-black/5 bg-white p-6 transition hover:border-brand-200 hover:shadow-lg"
            >
              <h3 className="text-lg font-extrabold group-hover:text-brand-600">{service.title}</h3>
              {service.englishTitle && (
                <p className="mt-1 text-xs font-medium text-brand-500">{service.englishTitle}</p>
              )}
              <p className="mt-3 text-sm leading-7 text-ink-500">{service.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Shop */}
      {products.length > 0 && (
        <section className="container-hp mt-24">
          <SectionHeading
            title="اقلام فروشگاه هات پست"
            subtitle="ملزومات بسته‌بندی، ارسال و تجهیزات چاپ"
            href="/shop"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* About */}
      <section className="container-hp mt-24">
        <div className="grid items-center gap-10 rounded-3xl bg-surface-muted p-8 sm:p-12 md:grid-cols-2">
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
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="container-hp mt-24">
          <SectionHeading title="پرسش‌های متداول" className="justify-center text-center" />
          <FaqList faqs={faqs} />
        </section>
      )}

      {/* Support */}
      <section className="mt-24">
        <SupportBanner settings={settings} />
      </section>

      {/* Closing */}
      <section className="container-hp mt-16">
        <p className="mx-auto max-w-4xl text-center leading-9 text-ink-500">{home.closingText}</p>
      </section>
    </>
  );
}
