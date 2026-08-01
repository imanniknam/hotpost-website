import type { Metadata } from "next";

import { HoverLift } from "@/components/motion/HoverLift";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
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
        <Reveal y={0}>
          <h1 className="text-3xl font-extrabold sm:text-4xl">تماس با ما</h1>
          <p className="mt-4 text-lg text-ink-500">
            {settings.supportHeading} {settings.supportSubheading}
          </p>
        </Reveal>
      </section>

      <StaggerGroup as="div" className="container-hp mt-10 grid gap-5 sm:grid-cols-3">
        <StaggerItem className="h-full">
          <HoverLift className="h-full">
            <div className="bg-brand-gradient-soft h-full rounded-2xl p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="mb-4 font-bold">شماره تماس</h2>
              <ul className="space-y-2">
                {settings.phones?.map((phone) => (
                  <li key={phone.id ?? phone.dial}>
                    <a
                      href={`tel:${phone.dial}`}
                      className="nums text-brand-gradient text-lg font-bold hover:underline"
                    >
                      {phone.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </HoverLift>
        </StaggerItem>

        <StaggerItem className="h-full">
          <HoverLift className="h-full">
            <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="mb-4 font-bold">روز و ساعت پاسخگویی</h2>
              <p className="leading-8 text-ink-500">{settings.hours}</p>
            </div>
          </HoverLift>
        </StaggerItem>

        <StaggerItem className="h-full">
          <HoverLift className="h-full">
            <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="mb-4 font-bold">آدرس</h2>
              <p className="leading-8 text-ink-500">{settings.address}</p>
            </div>
          </HoverLift>
        </StaggerItem>
      </StaggerGroup>
    </>
  );
}
