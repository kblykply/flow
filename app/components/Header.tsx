// components/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu, X, Search, User, ShoppingBag, ChevronDown } from 'lucide-react';

export default function Header({
  cartCount = 0,
  brand = 'Flow Fashion',
   logoTop = '/2.png',          // shown at page top (transparent header)
  logoScrolled = '/1.png', // shown when scrolled (white header)
}: {
  cartCount?: number;
  brand?: string;
    logoTop?: string;
  logoScrolled?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24); // small threshold to avoid flicker
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const headerBg = scrolled ? 'bg-white border-b border-black/5 backdrop-blur' : 'bg-transparent';
  const headerText = scrolled ? 'text-black' : 'text-white';
  const hoverBg = scrolled ? 'hover:bg-black/5' : 'hover:bg-white/10';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[120] w-full transition-colors duration-300 ${headerBg} ${headerText}`}
    >
      {/* Top campaign bar (desktop) */}
      <div className={`hidden md:block text-[12px] leading-none transition-colors duration-300 ${
        scrolled ? 'bg-white text-black' : 'bg-black text-white'
      }`}>
        <div className="container mx-auto flex h-9 items-center justify-between px-4">
          <div className="flex items-center gap-6 opacity-90">
            <a href="#" className="hover:opacity-80">Mağazalarımız</a>
            <a href="#" className="hover:opacity-80">30 Gün İade & Değişim</a>
            <a href="#" className="hover:opacity-80">Ücretsiz Kargo</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="opacity-80">TR</span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container mx-auto flex h-[64px] items-center justify-between px-4 md:h-[72px]">
        {/* Left: mobile burger + logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className={`md:hidden -ml-2 rounded p-2 ${hoverBg}`}
            aria-label="Menüyü aç"
            aria-expanded={open ? 'true' : 'false'}
            aria-controls="mobile-drawer"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </button>

          <Link href="/" className="flex items-center gap-3" aria-label={`${brand} anasayfa`}>
            <Image
              src={scrolled ? logoScrolled : logoTop}
              alt={brand}
              width={280}
              height={64}
              priority
              className="h-20 md:h-18 w-auto shrink-0 transition-opacity duration-300"
            />
            <span className="sr-only">{brand}</span>
          </Link>
        </div>

        {/* Center nav (desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-[14px]">
          <Link href="#" className="flex items-center gap-1 hover:opacity-70">
            Tüm Kategoriler <ChevronDown className="size-4 opacity-50" />
          </Link>
          <Link href="#" className="hover:opacity-70">Koleksiyonlar</Link>
          <Link href="#" className="hover:opacity-70">Yeni Ürünler</Link>
          <Link href="#" className="hover:opacity-70">Çok Satanlar</Link>
          <Link href="#" className="hover:opacity-70">İletişim</Link>
          <Link href="#" className="hover:opacity-70">Flow Premium</Link>
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-1 md:gap-2">
          <button type="button" aria-label="Ara" className={`rounded p-2 ${hoverBg}`}>
            <Search className="size-5" />
          </button>
          <button type="button" aria-label="Hesabım" className={`hidden sm:inline-flex rounded p-2 ${hoverBg}`}>
            <User className="size-5" />
          </button>
          <button type="button" aria-label="Sepet" className={`relative rounded p-2 ${hoverBg}`}>
            <ShoppingBag className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex min-w-[18px] items-center justify-center rounded-full bg-black px-1.5 text-[10px] font-semibold leading-5 text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer wrapper */}
      <div
        className={`fixed inset-0 z-[130] ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={open ? 'false' : 'true'}
      >
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />
        {/* panel */}
        <aside
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-drawer-title"
          className={`absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white text-black shadow-xl transition-transform ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-[64px] items-center justify-between border-b px-4">
            <span id="mobile-drawer-title" className="text-lg font-semibold">Menü</span>
            <button
              type="button"
              aria-label="Kapat"
              className="rounded p-2 hover:bg-black/5"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </button>
          </div>
          <nav className="p-2">
            <MobileLink href="#" label="Tüm Kategoriler" />
            <MobileLink href="#" label="Koleksiyonlar" />
            <MobileLink href="#" label="Yeni Ürünler" />
            <MobileLink href="#" label="Çok Satanlar" />
            <MobileLink href="#" label="İletişim" />
            <MobileLink href="#" label="Flow Premium" />
          </nav>
        </aside>
      </div>
    </header>
  );
}

function MobileLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="block rounded-lg px-4 py-3 text-[15px] hover:bg-black/5">
      {label}
    </Link>
  );
}
