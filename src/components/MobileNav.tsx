'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLang } from '@/context/LanguageContext';
import styles from './MobileNav.module.css';

const links = [
  { href: '/',         lv: 'Sākums',   en: 'Home'     },
  { href: '/about',    lv: 'Par mani', en: 'About'    },
  { href: '/projects', lv: 'Projekti', en: 'Projects' },
  { href: '/resume',   lv: 'CV',       en: 'Resume'   },
  { href: '/contact',  lv: 'Kontakti', en: 'Contact'  },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  // close on route change
  useEffect(() => { setOpen(false); }, [pathname]);
  // lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <button
        className={styles.burger}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span className={`${styles.bar} ${open ? styles.b1 : ''}`} />
        <span className={`${styles.bar} ${open ? styles.b2 : ''}`} />
        <span className={`${styles.bar} ${open ? styles.b3 : ''}`} />
      </button>

      {/* backdrop */}
      {open && <div className={styles.backdrop} onClick={() => setOpen(false)} />}

      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerInner}>
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.drawerLink} ${pathname === l.href ? styles.drawerActive : ''}`}
              style={{ animationDelay: open ? `${i * 45}ms` : '0ms' }}
              onClick={() => setOpen(false)}
            >
              <span className={styles.drawerIdx}>0{i + 1}</span>
              {t(l.lv, l.en)}
              <span className={styles.drawerArrow}>↗</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
