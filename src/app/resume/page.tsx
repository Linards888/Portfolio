'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './resume.module.css';
import { useLang } from '@/context/LanguageContext';

export default function Resume() {
  const { t } = useLang();
  const [lang, setLang] = useState<'lv' | 'en'>('lv');

  const isLV = lang === 'lv';

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>{t('Resume', 'Resume')}</h1>

      {/* Language toggle */}
      <div className={styles.toggle}>
        <button
          className={`${styles.toggleBtn} ${isLV ? styles.active : ''}`}
          onClick={() => setLang('lv')}
        >
          Latviešu
        </button>
        <button
          className={`${styles.toggleBtn} ${!isLV ? styles.active : ''}`}
          onClick={() => setLang('en')}
        >
          English
        </button>
      </div>

      {/* Download button */}
      <a
        href={isLV ? '/Linards_Balodis_CV_LV.pdf' : '/Linards_Balodis_CV_ENG.pdf'}
        download={isLV ? 'Linards_Balodis_CV_LV.pdf' : 'Linards_Balodis_CV_ENG.pdf'}
        className={styles.downloadBtn}
      >
        ↓ {t('Lejupielādēt CV', 'Download Resume')} ({isLV ? 'LV' : 'EN'})
      </a>

      {/* CV image */}
      <div className={styles.imageWrap}>
        <Image
          key={lang}
          src={isLV ? '/cv_lv.png' : '/cv_en.png'}
          alt="Linards Balodis CV"
          width={1240}
          height={1754}
          className={styles.cvImage}
          priority
        />
      </div>

      <Link href="/" className={styles.back}>← {t('Atpakaļ', 'Back home')}</Link>
    </div>
  );
}
