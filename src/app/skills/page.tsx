'use client';
import styles from './skills.module.css';
import { useLang } from '@/context/LanguageContext';

const groups = [
  {
    lv: 'Mehānika un dizains', en: 'Mechanics & design',
    items: [
      { lv: '3D modelēšana Fusion 360', en: '3D modelling in Fusion 360' },
      { lv: 'Detaļu projektēšana robotikai', en: 'Part design for robotics' },
      { lv: 'Konstrukciju prototipēšana', en: 'Construction prototyping' },
      { lv: '3D printēšana', en: '3D printing' },
      { lv: 'CNC / G-code pamatu apguve', en: 'CNC / G-code fundamentals' },
    ],
  },
  {
    lv: 'Elektronika', en: 'Electronics',
    items: [
      { lv: 'Elektronikas pamati', en: 'Electronics basics' },
      { lv: 'Sensoru un motoru integrācija', en: 'Sensor and motor integration' },
      { lv: 'PCB dizaina apguve', en: 'PCB design learning' },
      { lv: 'Robota vadības sistēmas', en: 'Robot control systems' },
    ],
  },
  {
    lv: 'Programmēšana', en: 'Programming',
    items: [
      { lv: 'Robota vadības loģika', en: 'Robot control logic' },
      { lv: 'Mikrokontrolieru programmēšana', en: 'Microcontroller programming' },
      { lv: 'Tīmekļa izstrādes pamati', en: 'Web development basics' },
      { lv: 'GitHub', en: 'GitHub' },
    ],
  },
  {
    lv: 'Praktiskās prasmes', en: 'Practical skills',
    items: [
      { lv: 'Prototipēšana', en: 'Prototyping' },
      { lv: 'Testēšana sacensību apstākļos', en: 'Testing under competition conditions' },
      { lv: 'Kļūdu meklēšana un uzlabošana', en: 'Debugging and improvement' },
      { lv: 'Darbs ar tehnisko aprīkojumu', en: 'Working with technical equipment' },
    ],
  },
];

export default function Skills() {
  const { t } = useLang();
  return (
    <div>
      <h1 style={{ marginBottom: 8 }}>{t('Prasmes', 'Skills')}</h1>
      <p style={{ marginBottom: 48, maxWidth: 520, color: 'var(--text-muted)' }}>
        {t('Prasmes veidojas praktiskos projektos — būvējot, testējot un uzlabojot.', 'Skills are built through practical projects — building, testing and improving.')}
      </p>
      <div className={styles.grid}>
        {groups.map((g) => (
          <section key={g.lv} className={styles.group}>
            <h2 style={{ marginBottom: 16 }}>{t(g.lv, g.en)}</h2>
            <ul className={styles.list}>
              {g.items.map((item) => (
                <li key={item.lv} className={styles.item}>
                  <span className={styles.dash}>—</span> {t(item.lv, item.en)}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
