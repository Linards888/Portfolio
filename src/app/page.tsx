'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { useLang } from '@/context/LanguageContext';

const PROJECTS_PREVIEW = [
  {
    id: 'antweight',
    titleLv: 'Antweight sacensību robots',
    titleEn: 'Antweight combat robot',
    descLv: 'Top 16 Eiropā · RoboChallenge 2025',
    descEn: 'Top 16 in Europe · RoboChallenge 2025',
    emoji: '🏆',
  },
  {
    id: 'folkrace',
    titleLv: 'Robotu Folkrace',
    titleEn: 'Robot Folkrace',
    descLv: 'Latvijas robotikas sacensības',
    descEn: 'Latvian robotics competitions',
    emoji: '🤖',
  },
  {
    id: 'LATA',
    titleLv: 'LATA hakatons 2023',
    titleEn: 'DIY driving simulator',
    descLv: 'atvērto datu hakatons un ideju ģenerators 2023',
    descEn: 'open data hackathon and idea generator 2023',
    emoji: '💡',
  },
  {
    id: 'simulator',
    titleLv: 'DIY braukšanas simulators',
    titleEn: 'DIY driving simulator',
    descLv: 'Stūris, pedāļi, FPV VR vadība',
    descEn: 'Steering wheel, pedals, FPV VR control',
    emoji: '🎮',
  },
  {
    id: 'cnc',
    titleLv: 'CNC frēzēšana & G-code',
    titleEn: 'CNC milling & G-code',
    descLv: 'Materiālu apstrāde un CAM programmēšana',
    descEn: 'Material machining and CAM programming',
    emoji: '⚙️',
  },
  {
    id: 'portfolio',
    titleLv: 'Portfolio mājaslapa',
    titleEn: 'Portfolio website',
    descLv: 'Next.js · linardsb.xyz',
    descEn: 'Next.js · linardsb.xyz',
    emoji: '🌐',
  },
];

export default function Home() {
  const { t } = useLang();
  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <Image
          src="/Linards1.png"
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
          <h1 className={styles.heroName}>Linards Balodis</h1>
          <p className={styles.heroLocation}>Rīga, Latvija</p>
        </div>
      </div>

      {/* ── Rest of page ── */}
      <div className={styles.content}>
        <p className={styles.tagline}>
          {t(
            'Robotika, elektronika un inženierija — skolēns, kas būvē reālus projektus.',
            'Robotics, electronics and engineering — a student building real projects.'
          )}
        </p>
        <div className={styles.highlight}>
          🏆 {t('RoboChallenge 2025 — Top 16 Eiropā', 'RoboChallenge 2025 — Top 16 in Europe')}
        </div>

        {/* Projects Preview */}
        <section className={styles.projectsPreview}>
          <h2 className={styles.previewHeading}>
            {t('Projekti & Sasniegumi', 'Projects & Achievements')}
          </h2>
          <div className={styles.previewGrid}>
            {PROJECTS_PREVIEW.map((project) => (
              <Link
                href={`/projects#${project.id}`}
                key={project.id}
                className={styles.previewCard}
              >
                <span className={styles.previewEmoji}>{project.emoji}</span>
                <h3 className={styles.previewTitle}>{t(project.titleLv, project.titleEn)}</h3>
                <p className={styles.previewDesc}>{t(project.descLv, project.descEn)}</p>
                <span className={styles.previewArrow}>↗</span>
              </Link>
            ))}
          </div>
          <Link href="/projects" className={styles.previewSeeAll}>
            {t('Skatīt visus projektus', 'See all projects')} →
          </Link>
        </section>

        <Link href="/resume" className={styles.resumeBtn}>
          {t('Resume', 'Resume')}
        </Link>

        <nav className={styles.pageNav}>
          <Link href="/about">{t('Par mani', 'About me')} ↗</Link>
          <Link href="/projects">{t('Projekti & Sasniegumi', 'Projects & Achievements')} ↗</Link>
          <Link href="/skills">{t('Prasmes', 'Skills')} ↗</Link>
          <Link href="/contact">{t('Kontakti', 'Contact')} ↗</Link>
        </nav>
      </div>
    </div>
  );
}
