// components/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  function onSubscribe(e: FormEvent) {
    e.preventDefault();
    // Presentation-only: no backend. You can wire this to your API later.
    setEmail('');
    // Optionally show a toast here.
  }

  return (
    <footer className="mt-20 border-t border-black/5 bg-white text-neutral-800">
      {/* Top */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + socials */}
          <div>
          <Link href="/" aria-label="Flow Fashion anasayfa" className="inline-flex items-center">
  <Image
    src="/logo.jpg"
    alt="Flow Fashion"
    width={600}
    height={160}
    priority
    className="h-20 sm:h-24 md:h-28 w-auto shrink-0" // 80px → 96px → 112px tall
  />
</Link>

            <p className="mt-4 max-w-sm text-sm text-neutral-600">
              Flow Fashion: sade, modern ve rahat tarz. Sunum amaçlı demo e-ticaret arayüzü.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <SocialLink href="#" label="Instagram">
                <Instagram className="size-5" />
              </SocialLink>
              <SocialLink href="#" label="Facebook">
                <Facebook className="size-5" />
              </SocialLink>
              <SocialLink href="#" label="YouTube">
                <Youtube className="size-5" />
              </SocialLink>
              <SocialLink href="#" label="Twitter">
                <Twitter className="size-5" />
              </SocialLink>
            </div>
          </div>

          {/* Shop */}
          <FooterCol title="Mağaza">
            <FooterItem href="#">Yeni Ürünler</FooterItem>
            <FooterItem href="#">Koleksiyonlar</FooterItem>
            <FooterItem href="#">Çok Satanlar</FooterItem>
            <FooterItem href="#">Kampanyalar</FooterItem>
          </FooterCol>

          {/* Help */}
          <FooterCol title="Yardım">
            <FooterItem href="#">Sık Sorulan Sorular</FooterItem>
            <FooterItem href="#">Kargo &amp; Teslimat</FooterItem>
            <FooterItem href="#">İade &amp; Değişim</FooterItem>
            <FooterItem href="#">Beden Rehberi</FooterItem>
          </FooterCol>

          {/* Newsletter */}
          <div>
            <h3 className="text-base font-semibold">Bülten</h3>
            <p className="mt-3 text-sm text-neutral-600">
              Yeni sezon, kampanyalar ve duyurular için e-posta bırakın.
            </p>
            <form onSubmit={onSubscribe} className="mt-4 flex gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                E-posta
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="ornek@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-neutral-300 px-4 py-2 text-sm outline-none transition focus:border-neutral-900"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full border border-neutral-900 px-4 py-2 text-sm font-medium transition hover:bg-neutral-900 hover:text-white"
              >
                Abone Ol
              </button>
            </form>
            <p className="mt-2 text-xs text-neutral-500">
              Abone olarak <Link href="#" className="underline hover:no-underline">Gizlilik Politikası</Link>’nı kabul etmiş olursunuz.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-black/5">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-neutral-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Flow Fashion — Sunum amaçlıdır.</p>
          <nav className="flex items-center gap-6">
            <Link href="#" className="hover:text-neutral-800">Gizlilik</Link>
            <Link href="#" className="hover:text-neutral-800">Şartlar</Link>
            <Link href="#" className="hover:text-neutral-800">İletişim</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-base font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-neutral-600 transition hover:text-neutral-900">
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex items-center justify-center rounded-full border border-black/10 p-2 transition hover:bg-black hover:text-white"
    >
      {children}
    </Link>
  );
}
