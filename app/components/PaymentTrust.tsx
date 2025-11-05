// components/PaymentTrust.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, RefreshCw, Truck, Headphones } from 'lucide-react';

type PaymentIcon = { src: string; alt: string; href?: string };

type TrustItem = {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
};

export default function PaymentTrust({
  title = 'Ödeme & Güven',
  paymentIcons = DEFAULT_PAYMENTS,
  trustItems = DEFAULT_TRUSTS,
  className = '',
}: {
  title?: string;
  paymentIcons?: PaymentIcon[];
  trustItems?: TrustItem[];
  className?: string;
}) {
  return (
    <section className={`bg-white ${className}`}>
      <div className="container mx-auto px-4 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="rounded-3xl border border-black/5 bg-white/80"
        >
          {/* Payments row */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 px-4 py-4 sm:px-6">
            <div className="text-sm text-neutral-500">Kabul Edilen Ödemeler</div>
            <ul className="flex flex-wrap items-center gap-3 sm:gap-4">
              {paymentIcons.map((p) => {
                const Logo = (
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={64}
                    height={32}
                    className="h-6 w-auto grayscale opacity-90 transition hover:opacity-100"
                  />
                );
                return (
                  <li key={p.alt} className="shrink-0">
                    {p.href ? (
                      <Link href={p.href} aria-label={p.alt} className="inline-flex items-center">
                        {Logo}
                      </Link>
                    ) : (
                      Logo
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Trust grid */}
          <div className="grid grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
            {trustItems.map((t) => (
              <div
                key={t.title}
                className="group flex items-start gap-3 rounded-2xl border border-transparent px-3 py-3 transition hover:border-black/10"
              >
                <div className="mt-0.5 rounded-xl border border-black/10 p-2">
                  <div className="text-neutral-900">{t.icon}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.title}</div>
                  {t.subtitle && <div className="text-xs text-neutral-500">{t.subtitle}</div>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---- defaults (swap with your own) ---- */
const DEFAULT_PAYMENTS: PaymentIcon[] = [
  { src: '/payments/visa.svg', alt: 'Visa' },
  { src: '/payments/Mastercard-logo.svg.png', alt: 'Mastercard' },
  { src: '/payments/american-express.svg', alt: 'American Express' },
  { src: '/payments/troy.svg', alt: 'Troy' },
  { src: '/payments/iyzico-monochrome.svg', alt: 'iyzico' },    // örnek sağlayıcı
  { src: '/payments/apple-pay-svgrepo-com.svg', alt: 'Apple Pay' },
  { src: '/payments/google-pay-primary-logo-logo.svg', alt: 'Google Pay' },
];

const DEFAULT_TRUSTS: TrustItem[] = [
  {
    title: 'Güvenli Ödeme',
    subtitle: '256-bit SSL & 3D Secure',
    icon: <Lock className="size-5" />,
  },
  {
    title: 'Kolay İade',
    subtitle: '30 gün içinde iade/değişim',
    icon: <RefreshCw className="size-5" />,
  },
  {
    title: 'Hızlı Kargo',
    subtitle: 'Aynı gün işlem',
    icon: <Truck className="size-5" />,
  },
  {
    title: 'Destek',
    subtitle: '7/24 müşteri hizmetleri',
    icon: <Headphones className="size-5" />,
  },
];
