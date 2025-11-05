// components/ShowcaseSlider.tsx
'use client';

import { useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { motion, type Variants, type Transition } from 'framer-motion';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

type Slide = {
  id: string;
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  image?: string;
  bgColor?: string;
  accentColor?: string;
  style?: 'centerDark' | 'leftLight' | 'splitRight' | 'solid';
};

export default function ShowcaseSlider({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);

  // Swiper renkleri
  const swiperVars: CSSProperties = {
    ['--swiper-theme-color' as any]: '#ffffffff',
    ['--swiper-navigation-color' as any]: '#ffffffff',
    ['--swiper-pagination-color' as any]: '#ffffffff',
    ['--swiper-pagination-bullet-inactive-color' as any]: '#c7c7c7ff',
    ['--swiper-pagination-bullet-inactive-opacity' as any]: '0.3',
  };

  // Framer Motion easing (cubic-bezier). String 'easeOut' yerine bunu kullanıyoruz.
  const EASE_OUT: NonNullable<Transition['ease']> = [0.16, 1, 0.3, 1];

  const groupVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: EASE_OUT, staggerChildren: 0.08 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  };

  return (
    <section className="relative w-full">
      <Swiper
        style={swiperVars}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        speed={700}
        onSlideChange={(s) => setActive(s.realIndex)}
        pagination={{ clickable: true }}
        navigation
        effect="fade"
        className="h-[70vh] min-h-[520px] md:h-[100vh]"
      >
        {slides.map((s, idx) => (
          <SwiperSlide key={s.id}>
            <div className="relative h-full w-full overflow-hidden">
              {/* Tüm stiller için tam ekran arkaplan */}
              <BackgroundLayer slide={s} />

              {s.style === 'splitRight' ? (
                // Kompozisyon için sağa split; görsel zaten global BG
                <div className="relative z-10 grid h-full grid-cols-1 md:grid-cols-2">
                  <div className="order-2 md:order-1 flex items-center">
                    <motion.div
                      className="w-full px-6 md:px-10 lg:px-16 text-white"
                      initial="hidden"
                      animate={active === idx ? 'show' : 'hidden'}
                      variants={groupVariants}
                    >
                      {s.subtitle && (
                        <motion.p
                          variants={itemVariants}
                          className="mb-3 text-xs uppercase tracking-[0.2em] text-white/80"
                        >
                          {s.subtitle}
                        </motion.p>
                      )}
                      <motion.h2
                        variants={itemVariants}
                        className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] text-white"
                      >
                        {s.title}
                      </motion.h2>
                      {s.cta && (
                        <motion.div variants={itemVariants} className="mt-6">
                          <a
                            href={s.cta.href}
                            className="inline-flex items-center rounded-full border border-white/90 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/10 hover:text-white"
                          >
                            {s.cta.label}
                          </a>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                  {/* Masaüstünde görsel bölünmesini korumak için boş kolon */}
                  <div className="order-1 md:order-2" />
                </div>
              ) : (
                <div className="absolute inset-0 z-10">
                  <div
                    className={clsx(
                      'mx-auto h-full w-full',
                      s.style === 'centerDark'
                        ? 'flex items-center justify-center text-center'
                        : 'flex items-end'
                    )}
                  >
                    <div
                      className={clsx(
                        'w-full',
                        s.style === 'centerDark'
                          ? 'max-w-3xl px-6 md:px-8'
                          : 'px-6 pb-10 md:px-10 md:pb-14 lg:px-16 lg:pb-16'
                      )}
                    >
                      <motion.div
                        key={`${s.id}-${active === idx}`}
                        initial="hidden"
                        animate={active === idx ? 'show' : 'hidden'}
                        variants={groupVariants}
                        className="text-white"
                      >
                        {s.subtitle && (
                          <motion.p
                            variants={itemVariants}
                            className="mb-3 text-xs uppercase tracking-[0.2em] text-white/80"
                          >
                            {s.subtitle}
                          </motion.p>
                        )}
                        <motion.h2
                          variants={itemVariants}
                          className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] text-white"
                        >
                          {s.title}
                        </motion.h2>
                        {s.cta && (
                          <motion.div variants={itemVariants} className="mt-6">
                            <a
                              href={s.cta.href}
                              className="inline-flex items-center rounded-full px-5 py-2 text-sm font-medium transition border border-white/90 text-white hover:bg-white/10 hover:text-white"
                            >
                              {s.cta.label}
                            </a>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function BackgroundLayer({ slide }: { slide: Slide }) {
  const hasImage = Boolean(slide.image);

  return (
    <>
      {hasImage ? (
        <Image
          src={slide.image!}
          alt={slide.title}
          fill
          priority
          className="object-cover"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: slide.bgColor || '#111111' }}
        />
      )}

      {/* Global karartma: metnin tüm görsellerde okunması için */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Stil bazlı ekstra gradyanlar */}
      {slide.style === 'centerDark' && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_100%,rgba(0,0,0,0.45),transparent_60%)]" />
      )}

      {slide.style === 'leftLight' && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      )}

      {slide.style === 'splitRight' && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      )}
    </>
  );
}
