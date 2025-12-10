import React from "react";
import styles from "./Mpesa.module.css";

const Mpesa = ({ pkg, isActive, onSelect, phone, onFieldChange }) => {
  return (
    <section
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      onClick={onSelect}
    >
      <div className={styles.header}>
        <img src="/icons/mpesa.png" alt="M-PESA" />
        <div>
          <h3>M-PESA</h3>
          <p>
            Pay KES {pkg.price} for {pkg.title}
          </p>
        </div>
      </div>

      <div className={styles.fieldBlock}>
        <label htmlFor="mpesaPhone">Phone number</label>
        <input
          id="mpesaPhone"
          type="tel"
          placeholder="+2547XXXXXXXX"
          value={phone}
          onChange={(e) => onFieldChange("phone", e.target.value)}
        />
      </div>
    </section>
  );
};

export default Mpesa;
