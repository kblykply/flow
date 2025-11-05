// components/ShippingReturns.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import {
  Truck,
  Package,
  RefreshCw,
  ShieldCheck,
  Headphones,
  Clock,
} from 'lucide-react';

type Carrier = { src: string; alt: string; href?: string };

export default function ShippingReturns({
  title = 'Kargo & İade Bilgileri',
  subtitle = 'Hızlı teslimat, kolay iade ve güvenli alışveriş.',
  freeShippingThreshold = 750,            // TRY
  standardDeliveryDays = [1, 3],         // [min,max] business days
  expressDeliveryDays = [0, 1],          // same/next day
  returnsWindowDays = 30,
  exchangeAllowed = true,
  supportHref = '#',
  policyHref = '#',
  carriers = DEFAULT_CARRIERS,
  className = '',
}: {
  title?: string;
  subtitle?: string;
  freeShippingThreshold?: number;
  standardDeliveryDays?: [number, number];
  expressDeliveryDays?: [number, number];
  returnsWindowDays?: number;
  exchangeAllowed?: boolean;
  supportHref?: string;
  policyHref?: string;
  carriers?: Carrier[];
  className?: string;
}) {
  const fmtTRY = (v: number) =>
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(v);

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
          <div className="flex flex-wrap items-center gap-2">
            <Badge> {fmtTRY(freeShippingThreshold)} üzeri Ücretsiz Kargo </Badge>
            <Badge> {returnsWindowDays} Gün İçinde Kolay İade </Badge>
            {exchangeAllowed && <Badge> Değişim Desteği </Badge>}
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            icon={<Truck className="size-5" />}
            title="Standart Teslimat"
            subtitle={`${standardDeliveryDays[0]}–${standardDeliveryDays[1]} iş günü`}
            note="Siparişler aynı gün kargoya hazırlanır."
          />
          <InfoCard
            icon={<Clock className="size-5" />}
            title="Hızlı Teslimat"
            subtitle={
              expressDeliveryDays[0] === 0
                ? 'Aynı/Ertesi Gün'
                : `${expressDeliveryDays[0]}–${expressDeliveryDays[1]} gün`
            }
            note="Seçili illerde geçerlidir."
          />
          <InfoCard
            icon={<RefreshCw className="size-5" />}
            title="İade & Değişim"
            subtitle={`${returnsWindowDays} gün içinde kolay iade`}
            note={
              exchangeAllowed
                ? 'Beden/renk değişimi desteklenir.'
                : 'Değişim desteklenmiyor.'
            }
            href={policyHref}
            cta="Politikayı Gör"
          />
          <InfoCard
            icon={<ShieldCheck className="size-5" />}
            title="Güvenli Alışveriş"
            subtitle="256-bit SSL & 3D Secure"
            note="Ödemeleriniz güvende."
          />
        </div>

        {/* Carriers row */}
        {carriers?.length > 0 && (
          <div className="mt-8 rounded-2xl border border-black/5 bg-white/80 p-4 sm:p-5">
            <div className="mb-3 text-sm text-neutral-500">Anlaşmalı Kargolar</div>
            <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
              {carriers.map((c) => {
                const Logo = (
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
        )}

        {/* Help strip */}
        <div className="mt-8 flex flex-col items-start justify-between gap-3 rounded-2xl border border-black/5 bg-white/80 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
          <div className="flex items-center gap-3">
            <Headphones className="size-5 text-neutral-900" />
            <p className="text-sm text-neutral-700">
              Sorularınız mı var? <span className="font-medium">7/24 destek</span> ekibimiz yardımcı olur.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={supportHref}
              className="inline-flex items-center rounded-full border border-neutral-900 px-5 py-2 text-sm font-medium transition hover:bg-neutral-900 hover:text-white"
            >
              Destek ile İletişime Geç
            </Link>
            <Link
              href={policyHref}
              className="inline-flex items-center rounded-full border border-black/10 px-5 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
            >
              Kargo & İade Politikası
            </Link>
          </div>
        </div>

        {/* FAQs (native details for a11y) */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Faq
            q="İadem ne kadar sürede sonuçlanır?"
            a="Ürün depomuza ulaştıktan sonra 2–5 iş günü içinde inceleme tamamlanır ve iadeniz ödeme yönteminize göre işleme alınır."
          />
          <Faq
            q="Hangi günler kargo çıkışı yapıyorsunuz?"
            a="Hafta içi her gün ve cumartesi öğlene kadar kargo çıkışı yapılır. Resmi tatillerde işlem yapılmaz."
          />
          <Faq
            q="Kargom hasarlı gelirse ne yapmalıyım?"
            a="Teslim alırken tutanak tutturun ve bizimle iletişime geçin. Ücretsiz değişim/iade sürecini başlatırız."
          />
          <Faq
            q="Adrese teslim dışında seçenek var mı?"
            a="Seçili bölgelerde kargo şubesinden teslim ve teslimat randevusu seçenekleri mevcuttur."
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- subcomponents ---------- */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-medium text-neutral-700">
      {children}
    </span>
  );
}

function InfoCard({
  icon,
  title,
  subtitle,
  note,
  href,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  note?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white/80 p-4 sm:p-5 transition hover:-translate-y-0.5">
      <div className="mb-3 inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-2.5 py-1.5 text-sm font-medium text-neutral-900">
        {icon}
        <span>{title}</span>
      </div>
      <div className="text-base font-semibold text-neutral-900">{subtitle}</div>
      {note && <div className="mt-1 text-sm text-neutral-600">{note}</div>}
      {href && cta && (
        <div className="mt-3">
          <Link
            href={href}
            className="inline-flex items-center rounded-full border border-neutral-900 px-4 py-1.5 text-sm font-medium transition hover:bg-neutral-900 hover:text-white"
          >
            {cta}
          </Link>
        </div>
      )}
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-2xl border border-black/5 bg-white/80 p-4 sm:p-5 open:bg-white">
      <summary className="cursor-pointer list-none">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-neutral-900">{q}</span>
          <span className="text-neutral-400 transition group-open:rotate-180">▾</span>
        </div>
      </summary>
      <p className="mt-3 text-sm text-neutral-600">{a}</p>
    </details>
  );
}

/* ---------- defaults ---------- */

const DEFAULT_CARRIERS: Carrier[] = [
  { src: '/carriers/yurtici-kargo-seeklogo.png', alt: 'Yurtiçi Kargo' },
  { src: '/carriers/aras.png', alt: 'Aras Kargo' },
  { src: '/carriers/mng-kargo-seeklogo.png', alt: 'MNG Kargo' },
  { src: '/carriers/getfile.png', alt: 'PTT Kargo' },
];
