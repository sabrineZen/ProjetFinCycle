import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      translation: {
        welcome: "Bougigo",
        hello: "Bonjour",
      },
    },
    en: {
      translation: {
        welcome: "hey",
        hello: "Hello",
      },
    },
  },
  lng: "fr", 
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;