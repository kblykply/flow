// components/LimitedOffer.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type OfferProduct = {
  id: string;
  title: string;
  price: number;
  compareAt?: number;
  image: string;
  href?: string;
  badge?: string; // e.g. 'Yeni'
};

export default function LimitedOffer({
  product,
  endsAt,            // ISO string or Date for when the offer ends
  startsAt,          // optional: set this to show a progress bar from start→end
  title = 'Limited-Time Offers',
  ctaLabel = 'Sepete Ekle',
  linkLabel = 'Ürünü İncele',
}: {
  product: OfferProduct;
  endsAt: string | Date;
  startsAt?: string | Date;
  title?: string;
  ctaLabel?: string;
  linkLabel?: string;
}) {
  const end = useMemo(() => new Date(endsAt), [endsAt]);
  const start = useMemo(() => (startsAt ? new Date(startsAt) : null), [startsAt]);

  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const remainingMs = Math.max(0, end.getTime() - now.getTime());
  const isExpired = remainingMs === 0;

  const totalMs = start ? Math.max(1, end.getTime() - start.getTime()) : null;
  const elapsedMs = start ? Math.min(totalMs!, Math.max(0, now.getTime() - start.getTime())) : null;
  const progress = start && totalMs ? Math.round((elapsedMs! / totalMs) * 100) : null;

  const { d, h, m, s } = msToDhms(remainingMs);
  const priceStr = product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
  const compareStr =
    product.compareAt &&
    product.compareAt.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
  const savings =
    product.compareAt && product.compareAt > product.price
      ? (product.compareAt - product.price).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })
      : null;

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-2 max-w-prose text-sm text-neutral-600">
              {isExpired ? 'Süre doldu.' : 'Sınırlı süre için özel fiyat.'}
            </p>
          </div>
          {progress !== null && (
            <div className="w-full sm:w-80">
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                <span>İlerleme</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-neutral-200">
                <div
                  className="h-2 rounded-full bg-neutral-900 transition-all"
                  style={{ width: `${progress}%` }}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                  role="progressbar"
                />
              </div>
            </div>
          )}
        </div>

        {/* Card */}
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="grid items-stretch gap-6 rounded-3xl border border-black/5 p-4 sm:p-6 lg:grid-cols-2"
        >
          {/* Image */}
          <div className="relative overflow-hidden rounded-2xl">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[16/10]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            {/* corner badge */}
            {(product.badge || 'Sınırlı') && (
              <span className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white">
                {product.badge ?? 'Sınırlı'}
              </span>
            )}
            {/* small corner chip for expiry */}
            <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-neutral-900">
              {isExpired ? 'Süre Doldu' : 'Devam Ediyor'}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between rounded-2xl bg-white">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold leading-tight">{product.title}</h3>

              {/* Price row */}
              <div className="mt-3 flex items-end gap-3">
                <span className="text-2xl sm:text-3xl font-semibold">{priceStr}</span>
                {compareStr && (
                  <span className="text-sm sm:text-base text-neutral-400 line-through">{compareStr}</span>
                )}
                {savings && (
                  <span className="rounded-full bg-black text-white px-2.5 py-1 text-xs font-medium">
                    {savings} indirim
                  </span>
                )}
              </div>

              {/* Countdown */}
              <div className="mt-5">
                <span className="text-xs uppercase tracking-[0.18em] text-neutral-500">Kalan Süre</span>
                <div className="mt-2 flex items-center gap-2 text-2xl sm:text-3xl font-semibold tabular-nums">
                  <TimePill value={d} label="Gün" />
                  <span className="opacity-40">:</span>
                  <TimePill value={h} label="Saat" />
                  <span className="opacity-40">:</span>
                  <TimePill value={m} label="Dak" />
                  <span className="opacity-40">:</span>
                  <TimePill value={s} label="San" />
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={isExpired}
                className={clsx(
                  'inline-flex items-center rounded-full px-5 py-2 text-sm font-medium transition',
                  isExpired
                    ? 'cursor-not-allowed border border-neutral-300 text-neutral-400'
                    : 'border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white'
                )}
                aria-disabled={isExpired}
              >
                {ctaLabel}
              </button>
              <Link
                href={product.href ?? '#'}
                className="inline-flex items-center rounded-full border border-black/10 px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition"
              >
                {linkLabel}
              </Link>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */

function msToDhms(ms: number) {
  const sec = Math.floor(ms / 1000);
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return { d: pad(d), h: pad(h), m: pad(m), s: pad(s) };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function TimePill({ value, label }: { value: string; label: string }) {
  return (
    <div className="inline-flex min-w-[3.5rem] flex-col items-center justify-center rounded-xl border border-black/10 px-3 py-2">
      <span>{value}</span>
      <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-neutral-500">{label}</span>
    </div>
  );
}
