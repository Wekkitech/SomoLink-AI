import React from "react";
import styles from "./Voucher.module.css";

const Voucher = ({
  isActive,
  onSelect,
  voucherCode,
  voucherPin,
  onFieldChange,
}) => {
  return (
    <section
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      onClick={onSelect}
    >
      <div className={styles.header}>
        <span className={styles.iconBox}>🏷️</span>
        <div>
          <h3>Voucher</h3>
          <p>Redeem your voucher code</p>
        </div>
      </div>

      <div className={styles.fieldBlock}>
        <label htmlFor="voucherCode">Voucher code</label>
        <input
          id="voucherCode"
          type="text"
          placeholder="Enter voucher code"
          value={voucherCode}
          onChange={(e) => onFieldChange("voucherCode", e.target.value)}
        />
      </div>

      <div className={styles.fieldBlock}>
        <label htmlFor="voucherPin">
          Voucher PIN <span className={styles.optional}>(optional)</span>
        </label>
        <input
          id="voucherPin"
          type="password"
          placeholder="PIN (if required)"
          value={voucherPin}
          onChange={(e) => onFieldChange("voucherPin", e.target.value)}
        />
      </div>

      <div className={styles.actionRow}>
        <button type="button" className={styles.validateBtn}>
          Validate
        </button>
      </div>
    </section>
  );
};

export default Voucher;
