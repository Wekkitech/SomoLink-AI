import React from "react";
import styles from "./LogoBlock.module.css";

const LogoBlock = ({ text, title, theme }) => {
  return (
    <div className={styles.wrapper}>
      <img src="/logo/logo.png" alt="Logo" className={styles.logo} />

      {title && <h1 className={`${styles.title} ${styles[theme]}`}>{title}</h1>}

      {text && <p className={styles.tagline}>{text}</p>}
    </div>
  );
};

export default LogoBlock;
