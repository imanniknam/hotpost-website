import type { Metadata } from "next";

import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { SupportBanner } from "@/components/ui/SupportBanner";
import { getAboutPage, getSiteSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "درباره ما",
  description:
    "هات پست حاصل بیش از ۳۰ سال تجربه مدیریتی در منطقه ۱۸ پستی و ۱۱ سال فعالیت مستمر در پیشخوان دولت است.",
};

export default async function AboutPage() {
  const [about, settings] = await Promise.all([getAboutPage(), getSiteSettings()]);
  const image = typeof about.image === "object" ? about.image : null;

  return (
    <>
      <section className="container-hp pt-10">
        <Reveal y={0}>
          <h1 className="text-3xl font-extrabold sm:text-4xl">{about.heading}</h1>
          <span
            aria-hidden="true"
            className="mt-4 block h-1 w-24 rounded-full bg-linear-to-l from-brand-400 to-brand-600"
          />
        </Reveal>
      </section>

      <section className="container-hp mt-10 grid gap-10 md:grid-cols-5">
        {image?.url && (
          <div className="md:col-span-2">
            <Image
              src={image.url}
              alt={image.alt}
              width={640}
              height={800}
              className="sticky top-24 rounded-3xl object-cover"
            />
          </div>
        )}

        <Reveal
          className={
            image?.url
              ? "md:col-span-3 [&_p]:mb-5 [&_p]:leading-9 [&_p]:text-ink-700"
              : "md:col-span-5 max-w-4xl [&_p]:mb-5 [&_p]:leading-9 [&_p]:text-ink-700"
          }
        >
          <RichText data={about.body} />
        </Reveal>
      </section>

      <section className="mt-24">
        <Reveal scale>
          <SupportBanner settings={settings} />
        </Reveal>
      </section>
    </>
  );
}
