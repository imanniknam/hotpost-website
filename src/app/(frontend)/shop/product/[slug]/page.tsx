import type { Metadata } from "next";

import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductPurchase } from "@/components/shop/ProductPurchase";
import { getProductBySlug } from "@/lib/queries";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.title,
    description: product.shortDescription || `خرید ${product.title} از فروشگاه هات پست.`,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const category = typeof product.category === "object" ? product.category : null;
  const images = (product.images ?? [])
    .map((row) => (typeof row.image === "object" ? row.image : null))
    .filter((img): img is NonNullable<typeof img> => img !== null && Boolean(img.url));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription ?? undefined,
    image: images.map((img) => img.url),
    sku: product.sku ?? undefined,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "IRR",
      availability:
        (product.stock ?? 0) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="container-hp pt-10">
        <nav aria-label="مسیر صفحه" className="mb-6 flex flex-wrap gap-2 text-sm text-ink-500">
          <Link href="/" className="hover:text-brand-600">
            خانه
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/shop" className="hover:text-brand-600">
            فروشگاه
          </Link>
          {category && (
            <>
              <span aria-hidden="true">/</span>
              <Link href={`/shop/${category.slug}`} className="hover:text-brand-600">
                {category.title}
              </Link>
            </>
          )}
        </nav>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            {images[0]?.url ? (
              <Image
                src={images[0].url}
                alt={images[0].alt}
                width={800}
                height={800}
                priority
                className="w-full rounded-3xl bg-surface-muted object-contain p-6"
              />
            ) : (
              <div className="grid aspect-square place-items-center rounded-3xl bg-surface-muted text-ink-500">
                بدون تصویر
              </div>
            )}

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.slice(1).map((img) => (
                  <Image
                    key={img.id}
                    src={img.url!}
                    alt={img.alt}
                    width={200}
                    height={200}
                    className="aspect-square rounded-xl bg-surface-muted object-contain p-2"
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-extrabold sm:text-3xl">{product.title}</h1>
            {product.shortDescription && (
              <p className="mt-3 leading-8 text-ink-500">{product.shortDescription}</p>
            )}

            <hr className="my-6 border-black/5" />
            <ProductPurchase product={product} />

            {product.specs && product.specs.length > 0 && (
              <>
                <hr className="my-6 border-black/5" />
                <h2 className="mb-3 font-bold">مشخصات</h2>
                <dl className="divide-y divide-black/5 rounded-2xl bg-surface-muted px-5">
                  {product.specs.map((spec) => (
                    <div key={spec.id ?? spec.name} className="flex justify-between gap-4 py-3 text-sm">
                      <dt className="text-ink-500">{spec.name}</dt>
                      <dd className="font-medium">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>
        </div>

        {product.description && (
          <div className="mt-16 max-w-4xl [&_p]:mb-4 [&_p]:leading-9 [&_p]:text-ink-700">
            <h2 className="mb-4 text-xl font-extrabold">توضیحات</h2>
            <RichText data={product.description} />
          </div>
        )}
      </section>
    </>
  );
}
