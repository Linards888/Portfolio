'use client';
import styles from './contact.module.css';
import { useLang } from '@/context/LanguageContext';

const contacts = [
  { labelLV: 'E-pasts', labelEN: 'Email', value: 'contact@linardsb.xyz', href: 'mailto:contact@linardsb.xyz', external: false },
  { labelLV: 'LinkedIn', labelEN: 'LinkedIn', value: 'Linards Balodis', href: 'https://www.linkedin.com/in/linards-balodis-689b912bb/', external: true },
  { labelLV: 'GitHub', labelEN: 'GitHub', value: 'Linards888', href: 'https://github.com/Linards888', external: true },
];

export default function Contact() {
  const { t } = useLang();
  return (
    <div>
      <h1 style={{ marginBottom: 8 }}>{t('Kontakti', 'Contact')}</h1>
      <p style={{ marginBottom: 48, maxWidth: 480, color: 'var(--text-muted)' }}>
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
        {t('Parasti atbildu 1–2 dienu laikā.', 'Usually reply within 1–2 days.')}
      </p>
    </div>
  );
}
