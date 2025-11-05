// components/SustainabilityValues.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Leaf, Recycle, HandHeart, Globe, Factory, Truck } from 'lucide-react';

export type ValueItem = {
  id: string;
  title: string;
  desc: string;
  icon?: React.ReactNode;
};

export type StatItem = {
  id: string;
  value: string;     // e.g. '92%'
  label: string;     // e.g. 'Doğa Dostu Materyal'
  note?: string;     // optional tiny footnote
};

export type CertificationLogo = { src: string; alt: string; href?: string };

export default function SustainabilityValues({
  title = 'Sürdürülebilirlik & Marka Değerleri',
  subtitle = 'Sade, modern ve uzun ömürlü tasarımlar — etik üretim ve düşük etki önceliğimiz.',
  values = DEFAULT_VALUES,
  stats = DEFAULT_STATS,
  certifications = DEFAULT_CERTS,
  image = '/sustainability/hero.jpg', // put your image in /public
  reportHref = '#',
  className = '',
}: {
  title?: string;
  subtitle?: string;
  values?: ValueItem[];
  stats?: StatItem[];
  certifications?: CertificationLogo[];
  image?: string | null;
  reportHref?: string;
  className?: string;
}) {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0)', transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className={clsx('bg-white', className)}>
      <div className="container mx-auto px-4 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
            {subtitle && (
              <p className="mt-2 max-w-prose text-sm text-neutral-600">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={reportHref}
              className="inline-flex items-center rounded-full border border-neutral-900 px-5 py-2 text-sm font-medium transition hover:bg-neutral-900 hover:text-white"
            >
              Etki Raporu
            </Link>
          </div>
        </div>

        {/* Content: values + image */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Values grid */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {values.map(v => (
              <motion.div
                key={v.id}
                variants={item}
                className="group relative rounded-2xl border border-black/5 bg-white/80 p-5 transition hover:-translate-y-0.5"
              >
                <div className="mb-3 inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-2.5 py-1.5 text-sm font-medium text-neutral-900">
                  <span className="text-neutral-900">{v.icon}</span>
                  <span>{v.title}</span>
                </div>
                <p className="text-sm text-neutral-600">{v.desc}</p>
                {/* subtle accent line */}
                <div className="mt-4 h-px w-16 bg-neutral-200" />
              </motion.div>
            ))}
          </motion.div>

          {/* Right visual (optional) */}
          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="relative overflow-hidden rounded-3xl border border-black/5"
          >
            {image && (
              <>
                <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[16/12]">
                  <Image
                    src={image}
                    alt="Sürdürülebilirlik"
                    fill
                    className="object-cover"
                    priority={false}
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </>
            )}

            {/* overlay chips */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2">
              <Chip>BCI Cotton</Chip>
              <Chip>Geri Dönüştürülmüş Ambalaj</Chip>
              <Chip>Düşük Su Tüketimi</Chip>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        {stats.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map(s => (
              <div
                key={s.id}
                className="rounded-2xl border border-black/5 bg-white/80 px-5 py-4"
              >
                <div className="text-2xl font-semibold leading-none text-neutral-900">
                  {s.value}
                </div>
                <div className="mt-1 text-sm font-medium text-neutral-700">{s.label}</div>
                {s.note && <div className="text-xs text-neutral-500">{s.note}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mt-8 rounded-2xl border border-black/5 bg-white/80 p-4 sm:p-5">
            <div className="mb-3 text-sm text-neutral-500">Sertifikalar & Girişimler</div>
            <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
              {certifications.map(c => {
                const logo = (
                  <Image
                    src={c.src}
                    alt={c.alt}
                    width={88}
                    height={36}
                    className="h-7 w-auto grayscale opacity-90 transition hover:opacity-100"
                  />
                );
                return (
                  <li key={c.alt} className="shrink-0">
                    {c.href ? (
                      <Link href={c.href} aria-label={c.alt} className="inline-flex items-center">
                        {logo}
                      </Link>
                    ) : (
                      logo
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- subcomponents ---------- */

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-900 backdrop-blur border border-black/10">
      {children}
    </span>
  );
}

/* ---------- defaults (feel free to override via props) ---------- */

const DEFAULT_VALUES: ValueItem[] = [
  {
    id: 'v1',
    title: 'Doğa Dostu Materyal',
    desc: 'Pamuk ve viskoz karışımlarda daha az su tüketimi, sertifikalı tedarik.',
    icon: <Leaf className="size-5" />,
  },
  {
    id: 'v2',
    title: 'Etik Üretim',
    desc: 'Adil çalışma koşulları ve düzenli denetimler ile şeffaf tedarik zinciri.',
    icon: <HandHeart className="size-5" />,
  },
  {
    id: 'v3',
    title: 'Geri Dönüşüm',
    desc: 'Ambalaj ve aksesuar bileşenlerinde geri dönüştürülmüş içerik.',
    icon: <Recycle className="size-5" />,
  },
  {
    id: 'v4',
    title: 'Düşük Etki Lojistik',
    desc: 'Kısa rota ve toplu sevkiyatla karbon ayak izini azaltıyoruz.',
    icon: <Truck className="size-5" />,
  },
];

const DEFAULT_STATS: StatItem[] = [
  { id: 's1', value: '92%', label: 'Doğa dostu kumaş kullanımı', note: 'Yeni sezon ortalaması' },
  { id: 's2', value: '−37%', label: 'Ambalaj atığı', note: 'Yıllık bazda' },
  { id: 's3', value: '100%', label: '3D Secure ödeme', note: 'Tüm işlemlerde' },
  { id: 's4', value: '72%', label: 'Karbon optimizasyonu', note: 'Lojistik' },
];

const DEFAULT_CERTS: CertificationLogo[] = [
  { src: '/certs/oeko-tex.svg', alt: 'OEKO-TEX' },
  { src: '/certs/bci.svg', alt: 'BCI Cotton' },
  { src: '/certs/gots.svg', alt: 'GOTS' },
  { src: '/certs/iso14001.svg', alt: 'ISO 14001' },
];
