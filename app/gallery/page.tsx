// app/gallery/page.tsx
import { Metadata } from 'next';
import Header from '@/components/Header';
import GalleryHero from '@/app/sections/GalleryHero';
import GalleryGrid from '@/app/sections/GalleryGrid';

export const metadata: Metadata = {
  title: 'Gallery | Gentech Guard',
  description: 'Explore our premium automotive protection installations, products, and events.',
};

export default function GalleryPage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden" style={{ background: '#000', color: '#fff' }}>
      <Header />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black pointer-events-none" />
      <GalleryHero />
      <GalleryGrid />
    </main>
  );
}