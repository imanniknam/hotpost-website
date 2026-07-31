import type { SiteSetting } from "@/payload-types";

export function SupportBanner({ settings }: { settings: SiteSetting }) {
  return (
    <section id="contact" className="container-hp scroll-mt-24">
      <div className="grid gap-8 rounded-3xl bg-ink-900 p-8 text-white sm:p-12 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">{settings.supportHeading}</h2>
          <p className="mt-2 text-white/70">{settings.supportSubheading}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {settings.phones?.map((phone) => (
              <a
                key={phone.id ?? phone.dial}
                href={`tel:${phone.dial}`}
                className="nums rounded-full bg-brand-500 px-5 py-3 text-base font-bold transition hover:bg-brand-600"
              >
                {phone.display}
              </a>
            ))}
          </div>
        </div>

        <dl className="grid content-center gap-5 text-sm">
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
