import React from "react";
import styles from "./Manual.module.css";

const Manual = ({ isActive, onSelect }) => {
  return (
    <section
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      onClick={onSelect}
    >
      <div className={styles.header}>
        <span className={styles.iconBox}>📞</span>
        <div>
          <h3>Manual payment</h3>
          <p>Dial the code provided by your carrier</p>
        </div>
      </div>

      <div className={styles.instructions}>
        Dial <strong>1859#</strong> and follow the prompts with your carrier.
      </div>

      <div className={styles.actionsRow}>
        <button type="button" className={styles.secondaryBtn}>
          Copy
        </button>
        <button type="button" className={styles.primaryBtn}>
          Dial now
        </button>
      </div>
    </section>
  );
};

export default Manual;
