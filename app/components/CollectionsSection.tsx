// components/CollectionsSection.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';

export type Collection = {
  id: string;
  title: string;
  href: string;
  image: string;           // /public path e.g. '/collections/dresses.jpg'
  subtitle?: string;       // small label (e.g., "Yeni Sezon")
  count?: number;          // product count
  featured?: boolean;      // makes the tile bigger on lg screens
  lightText?: boolean;     // force white text (for dark images)
};

export default function CollectionsSection({
  title = 'Koleksiyonlar',
  description,
  seeAllHref,
  items,
}: {
  title?: string;
  description?: string;
  seeAllHref?: string;
  items: Collection[];
}) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0)', transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="container mx-auto px-4 py-14 sm:py-16">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
          {description && (
            <p className="mt-2 max-w-prose text-sm text-neutral-600">{description}</p>
          )}
        </div>
        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-900 px-5 py-2 text-sm font-medium hover:bg-neutral-900 hover:text-white transition"
          >
            Tümünü Gör
            <ArrowRight className="size-4" />
          </Link>
        )}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[14rem] sm:auto-rows-[18rem] lg:auto-rows-[16rem]"
      >
        {items.map((c) => (
          <motion.div key={c.id} variants={item}>
            <CollectionTile collection={c} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function CollectionTile({ collection }: { collection: Collection }) {
  const { title, href, image, subtitle, count, featured, lightText } = collection;

  return (
    <Link
      href={href}
      className={clsx(
        'group relative block overflow-hidden rounded-2xl',
        'shadow-[0_8px_30px_rgba(0,0,0,0.06)]',
        featured && 'lg:col-span-2 lg:row-span-2'
      )}
    >
      {/* Image */}
      <div className={clsx('relative h-full w-full', featured ? 'aspect-[16/10] lg:aspect-auto' : 'aspect-[4/5]')}>
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      {/* Overlay gradient */}
      <div
        className={clsx(
          'pointer-events-none absolute inset-0 transition-opacity duration-300',
          lightText
            ? 'bg-gradient-to-t from-black/60 via-black/30 to-transparent'
            : 'bg-gradient-to-t from-black/20 via-black/0 to-transparent'
        )}
      />

      {/* Text content */}
      <div
        className={clsx(
          'absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6',
          lightText ? 'text-white' : 'text-neutral-900'
        )}
      >
        {subtitle && (
          <span
            className={clsx(
              'mb-2 inline-block rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em]',
              lightText
                ? 'bg-white/15 text-white/90 backdrop-blur'
                : 'bg-white text-neutral-900'
            )}
          >
            {subtitle}
          </span>
        )}

        <h3
          className={clsx(
            'text-2xl sm:text-3xl font-semibold leading-tight drop-shadow',
            lightText && 'text-white'
          )}
        >
          {title}
        </h3>

        <div className="mt-3 flex items-center gap-3">
          {typeof count === 'number' && (
            <span
              className={clsx(
                'rounded-full px-3 py-1 text-xs',
                lightText ? 'bg-white/15 text-white/90 backdrop-blur' : 'bg-white text-neutral-900'
              )}
            >
              {count} ürün
            </span>
          )}
          <span
            className={clsx(
              'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition',
              lightText
                ? 'border-white/80 text-white hover:bg-white hover:text-black'
                : 'border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white'
            )}
          >
            Keşfet
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
