'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'lv' | 'en';

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
  t: (lv: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'lv',
  toggle: () => {},
  t: (lv) => lv,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('lv');
  const toggle = () => setLang((l) => (l === 'lv' ? 'en' : 'lv'));
  const t = (lv: string, en: string) => (lang === 'lv' ? lv : en);

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
