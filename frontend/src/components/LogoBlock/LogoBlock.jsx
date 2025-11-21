import React from "react";
import styles from "./LogoBlock.module.css";

const LogoBlock = ({ text, title }) => {
  return (
    <div className={styles.wrapper}>
      <img src="/logo/logo.png" alt="SomoLink Logo" className={styles.logo} />
      <h3>{title}</h3>
      <p className={styles.tagline}>{text}</p>
    </div>
  );
};

export default LogoBlock;
