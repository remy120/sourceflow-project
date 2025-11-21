'use client';

import { IntlProvider } from 'react-intl';
import { useState, ReactNode } from 'react';
import enMessages from '@/src/locales/en.json';

const messages: Record<string, Record<string, string>> = {
  en: enMessages,
};

export default function IntlProviderWrapper({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<string>('en');

  return (
    <IntlProvider locale={locale} messages={messages[locale]} defaultLocale="en">
      {children}
    </IntlProvider>
  );
}

export function useLocale() {
  const [locale, setLocale] = useState<string>('en');
  return { locale, setLocale };
}
