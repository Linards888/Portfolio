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
      <div className={styles.hero}>
        <Image
          src="/milling.jpg"
          alt="Linards Balodis"
          fill
          className={styles.heroBg}
          priority
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroName} style={{ marginBottom: 100 }} >{t('Resume', 'Resume')}</h1>
        </div>
      </div>

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

      {/* Download buttons — both languages always available */}
      <div className={styles.downloads}>
        {(['LV', 'EN'] as const).map((code) => (
          <a
            key={code}
            href={`/Linards_Balodis_CV_${code}.pdf`}
            download
            className={styles.downloadBtn}
          >
            ↓ {t('Lejupielādēt CV', 'Download Resume')} ({code})
          </a>
        ))}
      </div>

      {/* CV image */}
      <div className={styles.imageWrap}>
        <Image
          key={lang}
          src={isLV ? '/cv_lv.png' : '/cv_en.png'}
          alt="Linards Balodis CV"
          width={2040}
          height={2640}
          className={styles.cvImage}
          priority
        />
      </div>

      <Link href="/" className={styles.back}>← {t('Atpakaļ', 'Back home')}</Link>
    </div>
  );
}
