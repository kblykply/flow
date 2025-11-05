// components/NewArrivals.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export type NewProduct = {
  id: string;
  title: string;
  price: number;
  compareAt?: number;
  images: [string, string?]; // [primary, secondary (for hover swap)]
  href?: string;
  badge?: string;            // e.g., 'Yeni'
};

export default function NewArrivals({
  title = 'Yeni Gelenler',
  description,
  seeAllHref = '#',
  products,
}: {
  title?: string;
  description?: string;
  seeAllHref?: string;
  products: NewProduct[];
}) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.08 },
    },
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
            {description && (
              <p className="mt-2 max-w-prose text-sm text-neutral-600">{description}</p>
            )}
          </div>
          <Link
            href={seeAllHref}
            className="inline-flex items-center rounded-full border border-neutral-900 px-5 py-2 text-sm font-medium transition hover:bg-neutral-900 hover:text-white"
          >
            Tümünü Gör
          </Link>
        </div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
        >
          {products.map((p) => (
            <motion.li
              key={p.id}
              variants={{
                hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
                show: { opacity: 1, y: 0, filter: 'blur(0)', transition: { duration: 0.5, ease: 'easeOut' } },
              }}
            >
              <ProductCard product={p} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: NewProduct }) {
  const { title, price, compareAt, images, href, badge } = product;
  const priceStr = price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
  const cmpStr =
    compareAt && compareAt.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });

  return (
    <Link href={href ?? '#'} className="group block">
      <div className="relative overflow-hidden rounded-2xl">
        {/* primary image */}
        <div className="relative aspect-[3/4]">
          <Image
            src={images[0]}
            alt={title}
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            className={clsx(
              'object-cover transition duration-500',
              images[1] && 'group-hover:opacity-0'
            )}
            priority={false}
          />
          {/* secondary (hover) */}
          {images[1] && (
            <Image
              src={images[1] as string}
              alt={`${title} (alternate)`}
              fill
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
              className="object-cover opacity-0 transition duration-500 group-hover:opacity-100"
              priority={false}
            />
          )}
        </div>

        {/* badge */}
        {(badge ?? 'Yeni') && (
          <span className="absolute left-2 top-2 rounded-full bg-black/80 px-2.5 py-1 text-xs font-medium text-white">
            {badge ?? 'Yeni'}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <h3 className="line-clamp-1 text-sm sm:text-base font-medium">{title}</h3>
      </div>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-base sm:text-lg font-semibold">{priceStr}</span>
        {cmpStr && <span className="text-xs text-neutral-400 line-through">{cmpStr}</span>}
      </div>

      {/* subtle “quick add” style button (presentation only) */}
      <div className="mt-3">
        <span className="inline-flex items-center rounded-full border border-neutral-900 px-4 py-1.5 text-sm font-medium transition group-hover:bg-neutral-900 group-hover:text-white">
          Sepete Ekle
        </span>
      </div>
    </Link>
  );
}
