import type { SiteSetting } from "@/payload-types";

export function SupportBanner({ settings }: { settings: SiteSetting }) {
  return (
    <section id="contact" className="container-hp scroll-mt-24">
      <div className="bg-ink-gradient relative grid gap-8 overflow-hidden rounded-3xl p-8 text-white sm:p-12 md:grid-cols-2">
        {/* Brand glow bleeding in from the trailing corner. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -end-24 size-72 rounded-full bg-brand-500/25 blur-3xl"
        />

        <div className="relative">
          <h2 className="text-2xl font-extrabold sm:text-3xl">{settings.supportHeading}</h2>
          <p className="mt-2 text-white/70">{settings.supportSubheading}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {settings.phones?.map((phone) => (
              <a
                key={phone.id ?? phone.dial}
                href={`tel:${phone.dial}`}
                className="nums rounded-full bg-brand-gradient px-5 py-3 text-base font-bold shadow-lg shadow-brand-500/30 transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                {phone.display}
              </a>
            ))}
          </div>
        </div>

        <dl className="relative grid content-center gap-5 text-sm">
          <div>
            <dt className="mb-1 font-bold text-brand-300">روز و ساعت پاسخگویی</dt>
            <dd className="text-white/80">{settings.hours}</dd>
          </div>
          <div>
            <dt className="mb-1 font-bold text-brand-300">آدرس</dt>
            <dd className="text-white/80">{settings.address}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
