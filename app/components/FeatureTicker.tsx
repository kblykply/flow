// components/FeatureTicker.tsx
'use client';

import React from 'react';
import { type LucideIcon, Heart, Recycle, Leaf, Truck, Sparkles } from 'lucide-react';

type TickerItem = { label: string; icon: LucideIcon };

const DEFAULT_ITEMS: TickerItem[] = [
  { label: 'Özel Tasarımlar', icon: Heart },
  { label: 'Sürdürülebilir Moda', icon: Recycle },
  { label: 'Çevre Dostu', icon: Leaf },
  { label: 'Hızlı Teslimat', icon: Truck },
  { label: 'Premium Kalite', icon: Sparkles },
    { label: 'Özel Tasarımlar', icon: Heart },
  { label: 'Sürdürülebilir Moda', icon: Recycle },
  { label: 'Çevre Dostu', icon: Leaf },
  { label: 'Hızlı Teslimat', icon: Truck },
  { label: 'Premium Kalite', icon: Sparkles },

];

type Props = {
  items?: TickerItem[];
  duration?: number;      // seconds per full loop
  gap?: number | string;  // e.g. 24 or '2rem'
  className?: string;     // e.g. 'bg-white text-black'
  edgeFade?: boolean;
  fadeColor?: string;     // e.g. 'black' | '#fff'
  bottomAccent?: boolean;
};

export default function FeatureTicker({
  items = DEFAULT_ITEMS,
  duration = 28,
  gap = '2.5rem',
  className = '',
  edgeFade = true,
  fadeColor = 'black',
  bottomAccent = true,
}: Props) {
  const track = React.useMemo(() => [...items, ...items], [items]);

  const rootClass = [
    'relative w-full overflow-hidden bg-black text-white',
    bottomAccent ? 'border-b-2 border-orange-500' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={rootClass}
      style={{
        ['--ft-duration' as any]: `${duration}s`,
        ['--ft-gap' as any]: typeof gap === 'number' ? `${gap}px` : gap,
      }}
    >
      {edgeFade && (
        <>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-10"
            style={{ background: `linear-gradient(to right, ${fadeColor}, transparent)` }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-10"
            style={{ background: `linear-gradient(to left, ${fadeColor}, transparent)` }}
          />
        </>
      )}

      <div className="py-2 select-none">
        <div className="ft-track">
          {track.map(({ label, icon: Icon }, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 text-sm md:text-base opacity-90 flex-none"
            >
              <Icon className="h-4 w-4 md:h-5 md:w-5 shrink-0" />
              <span className="tracking-tight">{label}</span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ft-track {
          display: flex;
          width: max-content;
          min-width: 200%;          /* ensures the translateX(-50%) is seamless */
          gap: var(--ft-gap);
          will-change: transform;
          animation: ft-marquee var(--ft-duration) linear infinite;
        }
        .ft-track:hover {
          animation-play-state: paused;
        }
        @keyframes ft-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ft-track { animation: none !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
}
