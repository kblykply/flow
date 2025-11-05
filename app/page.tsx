// app/page.tsx
import ShowcaseSlider from './components/ShowcaseSlider';
import FeatureTicker from './components/FeatureTicker';
import ProductShowcase from './components/ProductShowcase';

import CollectionsShowcaseFull, { type CollectionItem } from './components/CollectionsShowcaseFull';
import NewArrivals, { type NewProduct } from './components/NewArrivals';
import LimitedOffer from './components/LimitedOffer';
import PaymentTrust from './components/PaymentTrust';
import ShippingReturns from './components/ShippingReturns';

const offerEnds = new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(); // 36 saat sonra
const SLIDES = [
  {
    id: 's1',
    title: 'Flow Premium — Günün Her Anı İçin',
    subtitle: 'Yeni Sezon',
    cta: { label: 'Koleksiyonu Keşfet', href: '#' },
    image: '/flow/product-1.jpg',
    style: 'centerDark',
  },
  {
    id: 's2',
    title: 'Doğal Dokular, Minimal Silüetler',
    subtitle: 'Sade & Modern',
    cta: { label: 'Yeni Ürünler', href: '#' },
    image: '/flow/product-2.jpg',
    style: 'leftLight',
  },
  {
    id: 's3',
    title: 'Rahatlık — Şıklık Dengesi',
    subtitle: 'Basic Koleksiyon',
    cta: { label: 'Çok Satanlar', href: '#' },
    image: '/flow/product-3.jpg',
    style: 'splitRight',
  },
  {
    id: 's4',
    title: 'Yaz Kampanyası: 4 AL 3 ÖDE',
    subtitle: 'Sınırlı Süre',
    cta: { label: 'Kampanyayı İncele', href: '#' },
    bgColor: '#F7F7F7',
    accentColor: '#111111',
    style: 'solid',
        image: '/flow/product-4.jpg',

  },
];
const COLLECTIONS: CollectionItem[] = [
  {
    id: 'co1',
    title: 'Elbiseler',
    subtitle: 'Yeni Sezon',
    blurb: 'Doğal dokular, minimal silüetler.',
    href: '/koleksiyon/elbiseler',
    image: '/elbiseler.jpg',
    count: 128,
    lightText: true,
  },
  {
    id: 'co2',
    title: 'Basic',
    subtitle: 'Her Gün',
    blurb: 'Rahatlık ve şıklık dengesi.',
    href: '/koleksiyon/basic',
    image: '/basic.jpg',
    count: 64,
    lightText: true,
  },
  {
    id: 'co3',
    title: 'Günlük',
    subtitle: 'Konfor',
    blurb: 'Günün her anına uygun.',
    href: '/koleksiyon/gunluk',
    image: '/günlük.jpg',
    count: 72,
    lightText: true,
  },
  {
    id: 'co4',
    title: 'Premium',
    subtitle: 'Flow Premium',
    blurb: 'Zamansız çizgiler, seçkin kumaşlar.',
    href: '/koleksiyon/premium',
    image: '/premium.jpg',
    count: 24,
    lightText: true,
  },
];



export const PRODUCTS = [
  { id: '1', title: 'Çiçek Desenli Triko Hırka — Kahverengi', price: 1299.9, image: '/products/1.jpg', badge: 'Yeni' },
  { id: '2', title: 'Basic Uzun Kollu Tişört — Beyaz',        price: 399.9,  image: '/products/2.jpg', badge: 'Yeni' },
  { id: '3', title: 'Green Bay Packers Kapüşonlu Sweatshirt — Yeşil', price: 1799.9, image: '/products/3.jpg', badge: 'Yeni' },
  { id: '4', title: 'BROOKLYN Baskılı Kapüşonlu Sweatshirt — Siyah',  price: 899.9,  image: '/products/4.jpg', badge: 'Yeni' },
  { id: '5', title: 'Kontrast Şeritli Beyzbol Ceket — Beyaz',         price: 1499.9, image: '/products/5.jpg', badge: 'Yeni' },
  { id: '6', title: 'Futbol Forma — Sarı/Yeşil',                       price: 699.9,  image: '/products/6.jpg', badge: 'Yeni' },
  { id: '7', title: 'Leopar Desenli Gömlek — Kahverengi',              price: 749.9,  image: '/products/7.jpg', badge: 'Yeni' },
  { id: '8', title: 'Hız Kurutucu Spor Tişört — Kırmızı',              price: 349.9,  image: '/products/8.jpg', badge: 'Yeni' },
];


const NEW_PRODUCTS: NewProduct[] = [
  { id: '1', title: 'Çiçek Desenli Triko Hırka — Kahverengi',         price: 1299.9, images: ['/products/1.jpg'] },
  { id: '2', title: 'Basic Uzun Kollu Tişört — Beyaz',                 price: 399.9,  images: ['/products/2.jpg'] },
  { id: '3', title: 'Green Bay Packers Kapüşonlu Sweatshirt — Yeşil',  price: 1799.9, images: ['/products/3.jpg'] },
  { id: '4', title: 'BROOKLYN Baskılı Kapüşonlu Sweatshirt — Siyah',   price: 899.9,  images: ['/products/4.jpg'] },
  { id: '5', title: 'Kontrast Şeritli Beyzbol Ceket — Beyaz',          price: 1499.9, images: ['/products/5.jpg'] },
  { id: '6', title: 'Futbol Forma — Sarı/Yeşil',                        price: 699.9,  images: ['/products/6.jpg'] },
  { id: '7', title: 'Leopar Desenli Gömlek — Kahverengi',               price: 749.9,  images: ['/products/7.jpg'] },
  { id: '8', title: 'Hız Kurutucu Spor Tişört — Kırmızı',               price: 349.9,  images: ['/products/8.jpg'] },
];



export default function Page() {
  return (
    <>
      <ShowcaseSlider slides={SLIDES} />
      <FeatureTicker className="bg-black text-white" fadeColor="black" />
      <ProductShowcase title="Flow Premium Seçkisi" seeAllHref="#" products={PRODUCTS} />


            <CollectionsShowcaseFull items={COLLECTIONS} />


             <NewArrivals
        title="Yeni Gelenler"
        description="Sezonun en yeni parçalarıyla gardırobunu güncelle."
        seeAllHref="/yeni"
        products={NEW_PRODUCTS}

      />


       <LimitedOffer
        product={{
          ...PRODUCTS[3],         // örnek: BROOKLYN sweatshirt
          href: `/urun/${PRODUCTS[3].id}`,
        }}
        endsAt={offerEnds}
        // startsAt={new Date().toISOString()} // isterseniz ilerleme çubuğu için açın
      />


      <PaymentTrust />

       <ShippingReturns
        freeShippingThreshold={750}
        standardDeliveryDays={[1, 3]}
        expressDeliveryDays={[0, 1]}
        returnsWindowDays={30}
        supportHref="/iletisim"
        policyHref="/kargo-iade"
      />
    </>
  );
}
