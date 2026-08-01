import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { ProductCard } from "@/components/shop/ProductCard";
import { getCategoryBySlug, getCategoryTree, getProductsByCategory } from "@/lib/queries";

type Params = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  const tree = await getCategoryTree();
  return tree.flatMap((group) => [
    { category: group.slug },
    ...group.children.map((child) => ({ category: child.slug })),
  ]);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.title,
    description: category.description || `خرید ${category.title} از فروشگاه هات پست.`,
  };
}

export default async function CategoryPage({ params }: Params) {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  // A root group shows everything underneath it, not just directly-assigned products.
  const tree = await getCategoryTree();
  const group = tree.find((g) => g.id === category.id);
  const ids = group ? [group.id, ...group.children.map((c) => c.id)] : [category.id];

  const products = await getProductsByCategory(ids);
  const parent = typeof category.parent === "object" ? category.parent : null;

  return (
    <>
      <section className="container-hp pt-10">
        <nav aria-label="مسیر صفحه" className="mb-4 flex flex-wrap gap-2 text-sm text-ink-500">
          <Link href="/" className="hover:text-brand-600">
            خانه
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/shop" className="hover:text-brand-600">
            فروشگاه
          </Link>
          {parent && (
            <>
              <span aria-hidden="true">/</span>
              <Link href={`/shop/${parent.slug}`} className="hover:text-brand-600">
                {parent.title}
              </Link>
            </>
          )}
          <span aria-hidden="true">/</span>
          <span className="text-ink-900">{category.title}</span>
        </nav>

        <Reveal y={0}>
          <h1 className="text-3xl font-extrabold sm:text-4xl">{category.title}</h1>
          {category.description && <p className="mt-3 text-ink-500">{category.description}</p>}
        </Reveal>
      </section>

      {group && group.children.length > 0 && (
        <section className="container-hp mt-8">
          <ul className="flex flex-wrap gap-2">
            {group.children.map((child) => (
              <li key={child.id}>
                <Link
                  href={`/shop/${child.slug}`}
                  className="inline-block rounded-full bg-surface-muted px-4 py-2 text-sm font-medium ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-gradient hover:text-white hover:shadow-md hover:shadow-brand-500/25"
                >
                  {child.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="container-hp mt-10">
        {products.docs.length === 0 ? (
          <Reveal>
            <p className="bg-brand-gradient-soft rounded-2xl p-10 text-center text-ink-500 ring-1 ring-black/5">
              هنوز محصولی در این دسته‌بندی ثبت نشده است.
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
