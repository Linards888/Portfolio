import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { LanguageProvider } from '@/context/LanguageContext';
import LangToggle from '@/components/LangToggle';
import MobileNav from '@/components/MobileNav';

export const metadata: Metadata = {
  title: 'Linards Balodis',
  description: 'Robotics, electronics and engineering portfolio.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lv">
      <body>
        <LanguageProvider>
          <header className="site-header">
            <div className="header-inner">
              <Link href="/" className="logo">LB.</Link>

              {/* desktop nav — hidden on mobile via CSS */}
              <nav className="main-nav">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/resume">Resume</Link>
                <Link href="/contact">Contact</Link>
              </nav>

              <LangToggle />

              {/* burger button + drawer — only visible on mobile */}
              <MobileNav />
            </div>
          </header>
          <main className="main-content">{children}</main>
          <footer className="site-footer">
            <Link href="/">← Home</Link>
            <span className="sep">·</span>
            <span>{new Date().getFullYear()} · Linards Balodis</span>
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
