import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      tagline: "Connected Learning & Community Internet",
      somoButton: "Somo",
      somoDesc: "Free Educational Access",
      jijiButton: "Jiji",
      jijiDesc: "Pay-as-you-go Internet",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
    },
  },
  sw: {
    translation: {
      tagline: "Kujifunza kwa Pamoja na Intaneti ya Jamii",
      somoButton: "Somo",
      somoDesc: "Ufikiaji wa Elimu Bila Malipo",
      jijiButton: "Jiji",
      jijiDesc: "Intaneti ya Kulipia Kadri Unavyotumia",
      terms: "Masharti ya Huduma",
      privacy: "Sera ya Faragha",
    },
  },
  // add more languages here
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
