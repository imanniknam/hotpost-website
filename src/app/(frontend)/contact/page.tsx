import type { Metadata } from "next";

import { getSiteSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "شماره تماس، آدرس و ساعات پاسخگویی هات پست.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <section className="container-hp pt-10">
        <h1 className="text-3xl font-extrabold sm:text-4xl">تماس با ما</h1>
        <p className="mt-4 text-lg text-ink-500">
          {settings.supportHeading} {settings.supportSubheading}
        </p>
      </section>

      <section className="container-hp mt-10 grid gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-white p-6">
          <h2 className="mb-4 font-bold">شماره تماس</h2>
          <ul className="space-y-2">
            {settings.phones?.map((phone) => (
              <li key={phone.id ?? phone.dial}>
                <a
                  href={`tel:${phone.dial}`}
                  className="nums text-lg font-bold text-brand-600 hover:underline"
                >
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6">
          <h2 className="mb-4 font-bold">روز و ساعت پاسخگویی</h2>
          <p className="leading-8 text-ink-500">{settings.hours}</p>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6">
          <h2 className="mb-4 font-bold">آدرس</h2>
          <p className="leading-8 text-ink-500">{settings.address}</p>
        </div>
      </section>
    </>
  );
}
