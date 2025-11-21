import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSelector.module.css";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <select
        onChange={handleChange}
        value={i18n.language}
        className={styles.select}
      >
        <option value="en">English</option>
        <option value="sw">Swahili</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
