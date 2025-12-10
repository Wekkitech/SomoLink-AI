import React from "react";
import styles from "./UsageSummaryCard.module.css";

const UsageSummaryCard = ({ session }) => {
  const { planName, usedPercent, timeRemaining, dataRemaining } = session;

  return (
    <div className={styles.card}>
      <p className={styles.subtitle}>
        Your {planName} is {usedPercent}% used
      </p>

      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{ width: `${usedPercent}%` }}
        />
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Time remaining</span>
          <span className={styles.statValue}>{timeRemaining}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Data remaining</span>
          <span className={styles.statValue}>{dataRemaining}</span>
        </div>
      </div>
    </div>
  );
};

export default UsageSummaryCard;
