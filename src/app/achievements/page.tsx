'use client';
import styles from './achievements.module.css';
import { useLang } from '@/context/LanguageContext';

const items = [
  { lv: 'RoboChallenge 2025 — Top 16 Eiropā', en: 'RoboChallenge 2025 — Top 16 in Europe', subLV: 'Antweight kategorija · Starptautiskās sacensības', subEN: 'Antweight class · International competition', highlight: true },
  { lv: 'LATA 2023 — 3.Vieta', en: 'LATA 2023 — 3.Place', subLV: 'Ideju Ģenerators - hakatons', subEN: 'Idea Generator - hackathon', highlight: true }
];

export default function Achievements() {
  const { t } = useLang();
  return (
    <div>
      <h1 style={{ marginBottom: 8 }}>{t('Sasniegumi', 'Achievements')}</h1>
      <p style={{ marginBottom: 48, maxWidth: 520, color: 'var(--text-muted)' }}>
        {t('Rezultāti, kas iegūti praksē — sacensībās, projektos un patstāvīgā mācīšanā.', 'Results earned in practice — competitions, projects and self-directed learning.')}
      </p>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.lv} className={`${styles.item} ${item.highlight ? styles.highlight : ''}`}>
            <div className={styles.title}>{t(item.lv, item.en)}</div>
            <div className={styles.sub}>{t(item.subLV, item.subEN)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
