'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { useLang } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLang();
  return (
    <div className={styles.page}>
      <div className={styles.coverWrap}>
        <Image src="/Linards1.jpg" alt="Linards Balodis" width={900} height={400} className={styles.cover} priority />
      </div>
      <p className={styles.location}>Rīga, Latvija</p>
      <h1>Linards Balodis</h1>
      <p className={styles.tagline}>
        {t(
          'Robotika, elektronika un inženierija — skolēns, kas būvē reālus projektus.',
          'Robotics, electronics and engineering — a student building real projects.'
        )}
      </p>
      <div className={styles.highlight}>🏆 {t('RoboChallenge 2025 — Top 16 Eiropā', 'RoboChallenge 2025 — Top 16 in Europe')}</div>
      <nav className={styles.pageNav}>
        <Link href="/about">{t('Par mani', 'About me')} ↗</Link>
        <Link href="/projects">{t('Projekti & Sasniegumi', 'Projects & Achievements')} ↗</Link>
        <Link href="/skills">{t('Prasmes', 'Skills')} ↗</Link>
        <Link href="/contact">{t('Kontakti', 'Contact')} ↗</Link>
      </nav>
    </div>
  );
}
