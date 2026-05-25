'use client';
import Image from 'next/image';
import styles from './contact.module.css';
import { useLang } from '@/context/LanguageContext';

const contacts = [
  { labelLV: 'E-pasts', labelEN: 'Email', value: 'Linardsbalodis2009@gmail.com', href: 'Linardsbalodis2009@gmail.com', external: false },
  { labelLV: 'LinkedIn', labelEN: 'LinkedIn', value: 'Linards Balodis', href: 'https://www.linkedin.com/in/linards-balodis-689b912bb/', external: true },
  { labelLV: 'GitHub', labelEN: 'GitHub', value: 'Linards888', href: 'https://github.com/Linards888', external: true },
];

export default function Contact() {
  const { t } = useLang();
  return (
    <div>
      {/* ── Hero ── */}
      <div className={styles.hero}>
        <Image
          src="/contact.jpg"
          alt="Linards Balodis"
          fill
          className={styles.heroBg}
          priority
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroSub}>
            {t('Inženierijas Portfolio', 'Engineering Portfolio')}
          </p>
          <h1 className={styles.heroName} style={{ marginBottom: 80 }}>{t('Kontakti', 'Contact')}</h1>
        </div>
      </div> 


      <p style={{maxWidth: 500, color: 'var(--text-muted)', textAlign: 'center', margin: '32px auto 32px auto'}}>
        {t('Ja vēlaties uzzināt vairāk par maniem projektiem, sadarbības iespējām vai sacensībām — rakstiet!', 'If you want to learn more about my projects, collaboration opportunities or competitions — get in touch!')}
      </p>
      <ul className={styles.list}>
        {contacts.map((c) => (
          <li key={c.labelLV} className={styles.item}>
            <a href={c.href} target={c.external ? '_blank' : undefined} rel={c.external ? 'noopener noreferrer' : undefined} className={styles.link}>
              <span className={styles.label}>{t(c.labelLV, c.labelEN)}</span>
              <span className={styles.value}>{c.value}</span>
              <span className={styles.arrow}>↗</span>
            </a>
          </li>
        ))}
      </ul>
      <p style={{ marginTop: 40, fontSize: 13, color: 'var(--text-dim)' }}>
        {t('Parasti meiģinu atbildēt 1 dienas laikā.', 'Usually try to reply within 1 day.')}
      </p>
    </div>
  );
}
