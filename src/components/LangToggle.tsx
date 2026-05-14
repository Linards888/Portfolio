'use client';

import { useLang } from '@/context/LanguageContext';
import styles from './LangToggle.module.css';

export default function LangToggle() {
  const { lang, toggle } = useLang();
  return (
    <button onClick={toggle} className={styles.btn} aria-label="Switch language">
      <span className={lang === 'lv' ? styles.active : styles.inactive}>LV</span>
      <span className={styles.sep}>/</span>
      <span className={lang === 'en' ? styles.active : styles.inactive}>EN</span>
    </button>
  );
}
