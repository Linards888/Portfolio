import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { LanguageProvider } from '@/context/LanguageContext';
import LangToggle from '@/components/LangToggle';

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
              <nav className="main-nav">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/skills">Skills</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/achievements">Achievements</Link>
                <Link href="/contact">Contact</Link>
              </nav>
              <LangToggle />
            </div>
          </header>
          <main className="main-content">{children}</main>
          <footer className="site-footer">
            <Link href="/">← Home</Link>
            {new Date().getFullYear()} · Linards Balodis
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
