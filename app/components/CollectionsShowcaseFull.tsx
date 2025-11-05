// components/CollectionsShowcaseFull.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';

export type CollectionItem = {
  id: string;
  title: string;
  href: string;
  image: string;       // e.g. '/collections/dresses.jpg'
  subtitle?: string;   // small label, e.g. 'Yeni Sezon'
  blurb?: string;      // short description
  count?: number;      // number of products
  lightText?: boolean; // force white text (kept for future; section uses dark bg overlay)
};

export default function CollectionsShowcaseFull({
  items,
  heightClass = 'h-[90svh] min-h-[580px]',
  overlayDarkness = 0.38,
}: {
  items: CollectionItem[];
  heightClass?: string;
  overlayDarkness?: number;
}) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const activeItem = items[active] ?? items[0];

  return (
    <section className={clsx('relative w-full overflow-hidden', heightClass)}>
      {/* Section background cross-fade */}
      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeItem?.image || 'fallback'}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            {activeItem?.image && (
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            )}
            <div
              className="absolute inset-0"
              style={{ background: `rgba(0,0,0,${overlayDarkness})` }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 h-full">
        {/* 4 columns desktop / 2x2 mobile */}
        <div className="grid h-full grid-cols-2 lg:grid-cols-4">
          {items.slice(0, 4).map((c, i) => {
            const isActive = i === active;

            return (
              <button
                key={c.id}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={clsx(
                  'group relative isolate overflow-hidden text-left',
                  'after:pointer-events-none after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-white/10'
                )}
                aria-label={c.title}
                aria-current={isActive ? 'true' : 'false'}
              >
                {/* Subtle local overlay for better contrast */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25" />
                </div>

                {/* Big heading (kept visible on hover/active) */}
                <motion.div
                  className="absolute inset-0 grid place-items-center px-6"
                  initial={false}
                  animate={{ scale: isActive ? 1.02 : 1, opacity: 1 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                >
                  <span className="text-white/95 text-[clamp(20px,2.2vw,30px)] font-semibold tracking-[0.01em] drop-shadow-sm">
                    {c.title}
                  </span>
                </motion.div>

                {/* Info stack (no box) — appears at bottom when active */}
                <motion.div
                  initial={false}
                  animate={{ y: isActive ? 0 : 16, opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[88%] max-w-sm"
                >
                  <div className="text-white">
                    {c.subtitle && (
                      <div className="text-[10px] uppercase tracking-[0.18em] text-white/85">
                        {c.subtitle}
                      </div>
                    )}

                    {c.blurb && (
                      <p className="mt-1 text-[13px]/6 text-white/90">
                        {c.blurb}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      {typeof c.count === 'number' && (
                        <span className="rounded-full border border-white/35 px-3 py-1 text-xs text-white/90">
                          {c.count} ürün
                        </span>
                      )}
                      <Link
                        href={c.href}
                        prefetch
                        className="inline-flex items-center gap-2 text-sm font-medium text-white/95 underline underline-offset-[6px] decoration-white/60 hover:decoration-white"
                        aria-label={`${c.title} koleksiyonu — Keşfet`}
                      >
                        Keşfet
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>

                    {/* Hairline accent */}
                    <div className="mt-4 h-px w-24 bg-white/40" />
                  </div>
                </motion.div>

                {/* Column active wash (very subtle) */}
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-white/6"
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Mobile tap hint pulse when inactive */}
                {mounted && (
                  <motion.div
                    className="pointer-events-none absolute inset-0"
                    animate={{ opacity: isActive ? 0 : [0, 0.1, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
