// components/ProductShowcase.tsx
'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Product = {
  id: string;
  title: string;
  price: number;
  compareAt?: number;
  image: string;    // e.g. '/products/p1.jpg'
  href?: string;
  badge?: string;   // e.g. 'Yeni', 'İndirim'
};

export default function ProductShowcase({
  title = 'Öne Çıkan Ürünler',
  seeAllHref = '#',
  products,
}: {
  title?: string;
  seeAllHref?: string;
  products: Product[];
}) {
  const swiperVars: CSSProperties = {
    // Make arrows & dots black
    '--swiper-theme-color': '#000',
    '--swiper-navigation-color': '#000',
    '--swiper-pagination-color': '#000',
    '--swiper-pagination-bullet-inactive-color': '#000',
    '--swiper-pagination-bullet-inactive-opacity': '0.25',
  } as CSSProperties;

  return (
    <section className="container mx-auto px-4 py-12 sm:py-16">
      <div className="mb-7 flex items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
        <Link
          href={seeAllHref}
          className="inline-flex items-center rounded-full border border-neutral-900 px-5 py-2 text-sm font-medium hover:bg-neutral-900 hover:text-white transition"
        >
          Tümünü Gör
        </Link>
      </div>

      <Swiper
        style={swiperVars}
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 2200, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loop
        speed={600}
        spaceBetween={16}
        slidesPerView={2.2}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 18 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 5, spaceBetween: 22 },
        }}
        navigation
        pagination={{ clickable: true }}
        className="!pb-10"
      >
        {products.map((p) => (
          <SwiperSlide key={p.id} className="h-auto">
            <ProductTile product={p} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function ProductTile({ product }: { product: Product }) {
  const price = product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
  const compare =
    product.compareAt &&
    product.compareAt.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });

  return (
    <article className="group rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5">
      <Link href={product.href ?? '#'} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            priority
          />
          {product.badge && (
            <span className="absolute left-2 top-2 rounded-full bg-black/80 px-2.5 py-1 text-xs font-medium text-white">
              {product.badge}
            </span>
          )}
        </div>
        <div className="p-3 sm:p-4">
          <h3 className="line-clamp-1 text-sm sm:text-base font-medium">{product.title}</h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-base sm:text-lg font-semibold">{price}</span>
            {compare && <span className="text-xs text-neutral-400 line-through">{compare}</span>}
          </div>
        </div>
      </Link>
    </article>
  );
}
