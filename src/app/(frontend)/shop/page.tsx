import type { Metadata } from "next";

import Link from "next/link";

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
        <h1 className="text-3xl font-extrabold sm:text-4xl">فروشگاه هات پست</h1>
        <p className="mt-4 max-w-3xl leading-9 text-ink-500">
          هر چه برای بسته‌بندی، برچسب‌زنی و ارسال مرسولات لازم دارید — یکجا.
        </p>
      </section>

      {/* Category groups */}
      <section className="container-hp mt-12 grid gap-6 md:grid-cols-2">
        {tree.map((group) => (
          <div key={group.id} className="rounded-3xl border border-black/5 bg-surface-muted p-6 sm:p-8">
            <h2 className="text-xl font-extrabold">{group.title}</h2>
            {group.description && <p className="mt-1 text-sm text-ink-500">{group.description}</p>}

            <ul className="mt-5 flex flex-wrap gap-2">
              {group.children.map((child) => (
                <li key={child.id}>
                  <Link
                    href={`/shop/${child.slug}`}
                    className="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium transition hover:bg-brand-50 hover:text-brand-700"
                  >
                    {child.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* All products */}
      <section className="container-hp mt-20">
        <SectionHeading title="همه محصولات" />

        {products.docs.length === 0 ? (
          <p className="rounded-2xl bg-surface-muted p-10 text-center text-ink-500">
            هنوز محصولی ثبت نشده است.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.docs.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
