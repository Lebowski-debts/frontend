import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';

import enTranslation from '@public/locales/en/translation.json';
import ruTranslation from '@public/locales/ru/translation.json';

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'],
    resources: {
      en: {
        translation: enTranslation,
      },
      ru: {
        translation: ruTranslation,
      },
    },
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
