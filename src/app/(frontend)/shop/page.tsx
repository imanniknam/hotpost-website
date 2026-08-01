import type { Metadata } from "next";

import Link from "next/link";

import { HoverLift } from "@/components/motion/HoverLift";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllProducts, getCategoryTree } from "@/lib/queries";

export const metadata: Metadata = {
  title: "فروشگاه هات پست",
  description:
    "هات پست پک (ملزومات بسته‌بندی و ارسال) و هات پست چاپ (تجهیزات چاپ و لیبل) — کارتن پستی، پاکت پستی، چسب، لیبل، ریبون، پرینتر و کارتریج.",
};

export default async function ShopPage() {
  const [tree, products] = await Promise.all([getCategoryTree(), getAllProducts(1, 24)]);

  return (
    <>
      <section className="container-hp pt-10">
        <Reveal y={0}>
          <h1 className="text-3xl font-extrabold sm:text-4xl">فروشگاه هات پست</h1>
          <p className="mt-4 max-w-3xl leading-9 text-ink-500">
            هر چه برای بسته‌بندی، برچسب‌زنی و ارسال مرسولات لازم دارید — یکجا.
          </p>
        </Reveal>
      </section>

      {/* Category groups */}
      <StaggerGroup as="div" className="container-hp mt-12 grid gap-6 md:grid-cols-2">
        {tree.map((group) => (
          <StaggerItem key={group.id} className="h-full">
            <HoverLift lift={2} scale={1.01} className="h-full">
              <div className="bg-surface-gradient h-full rounded-3xl p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
                <h2 className="text-brand-gradient text-xl font-extrabold">{group.title}</h2>
                {group.description && (
                  <p className="mt-1 text-sm text-ink-500">{group.description}</p>
                )}

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.children.map((child) => (
                    <li key={child.id}>
                      <Link
                        href={`/shop/${child.slug}`}
                        className="inline-block rounded-full bg-white/90 px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-gradient hover:text-white hover:shadow-md hover:shadow-brand-500/25"
                      >
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </HoverLift>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* All products */}
      <section className="container-hp mt-20">
        <Reveal>
          <SectionHeading title="همه محصولات" />
        </Reveal>

        {products.docs.length === 0 ? (
          <Reveal>
            <p className="bg-brand-gradient-soft rounded-2xl p-10 text-center text-ink-500 ring-1 ring-black/5">
              هنوز محصولی ثبت نشده است.
            </p>
          </Reveal>
        ) : (
          <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {products.docs.map((product) => (
              <StaggerItem key={product.id} className="h-full">
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
    </>
  );
}
