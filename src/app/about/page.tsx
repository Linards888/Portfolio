'use client';
import Image from 'next/image';
import styles from './about.module.css';
import { useLang } from '@/context/LanguageContext';

export default function About() {
  const { t } = useLang();
  return (
    <div>
      <h1 style={{ marginBottom: 24,  marginTop: 82 }}>{t('Par mani', 'About me')}</h1>
      <div className={styles.twoCol}>
        <div className={styles.textBlock}>
          <p>{t('Es esmu Linards Balodis. Mani interesē inženierzinātnes — īpaši robotika, elektronika, programmēšana un mehānisko konstrukciju izstrāde.', 'I am Linards Balodis. I am interested in engineering — especially robotics, electronics, programming and mechanical design.')}</p>
          <p style={{ marginTop: 14 }}>{t('Man patīk ne tikai izdomāt idejas, bet arī tās praktiski uzbūvēt: no pirmās skices un 3D modeļa līdz detaļu izgatavošanai, elektronikas savienošanai, programmēšanai un testēšanai reālos apstākļos.', 'I enjoy not just coming up with ideas but actually building them: from the first sketch and 3D model to fabricating parts, wiring electronics, programming and testing under real conditions.')}</p>
          <p style={{ marginTop: 14 }}>{t('Robotikā mani īpaši piesaista tas, ka vienā projektā jāsavieno vairākas prasmes: mehānika, elektronika, sensori, vadības loģika un praktiska problēmu risināšana.', 'What I love about robotics is that a single project requires combining many skills: mechanics, electronics, sensors, control logic and practical problem-solving.')}</p>
          <p style={{ marginTop: 14 }}>{t('Pašlaik apgūstu PCB dizainu, CNC frēzēšanu un robotu vadības sistēmas.', 'Currently learning PCB design, CNC milling and robot control systems.')}</p>
        </div>
        <Image src="/Linards2.jpg" alt="Linards Balodis" width={260} height={320} className={styles.photo} />
      </div>
      <div className="divider" />
      <h2 style={{ marginBottom: 20 }}>{t('Darbnīca', 'Workshop')}</h2>
      <div className={styles.gallery}>
        {[
          { src: '/img1.png', lv: 'Antweight robots — Top 16 Eiropā, RoboChallenge 2025.', en: 'Antweight robot — Top 16 in Europe, RoboChallenge 2025.' },
          { src: '/folkrace.png', lv: 'Robotu Folkrace — mehānika, elektronika un programmēšana.', en: 'Robot Folkrace — mechanics, electronics and programming.' },
          { src: '/img2.jpg', lv: 'DIY braukšanas simulators ar vadības elektroniku.', en: 'DIY driving simulator with control electronics.' },
          { src: '/LATA_preview.jpg', lv: 'LATA hakatons un ideju ģenerators.', en: 'LATA hackathon and idea generator.' },
        ].map((item) => (
          <figure key={item.src} className={styles.figure}>
            <Image src={item.src} alt={t(item.lv, item.en)} width={500} height={320} className={styles.galleryImg} />
            <figcaption className={styles.caption}>{t(item.lv, item.en)}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
