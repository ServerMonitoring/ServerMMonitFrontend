import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import ruTranslation from './locales/ru/translation.json';
import store from './state/store';

i18n.use(initReactI18next).init({
  lng: store.getState().language.currentLanguage, // Язык по умолчанию — русский
  fallbackLng: 'ru', // Резервный язык — русский
  interpolation: {
    escapeValue: false, // React уже делает экранирование
  },
  resources:{
    en: {
        translation: enTranslation,
      },
      ru: {
        translation: ruTranslation,
      },
  }
});

// Слушаем изменения в Redux
store.subscribe(() => {
    const currentLanguage = store.getState().language.currentLanguage;
    if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  });
export default i18n;