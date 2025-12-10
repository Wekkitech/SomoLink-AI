import React from "react";
import styles from "./Visa.module.css";

const Visa = ({
  isActive,
  onSelect,
  cardNumber,
  nameOnCard,
  expiry,
  cvv,
  onFieldChange,
}) => {
  return (
    <section
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      onClick={onSelect}
    >
      <div className={styles.header}>
        <img src="/icons/visa.png" alt="Visa" />
        <div>
          <h3>VISA Card</h3>
          <p>Pay using your debit or credit card</p>
        </div>
      </div>

      <div className={styles.fieldBlock}>
        <label htmlFor="cardNumber">Card number</label>
        <input
          id="cardNumber"
          type="text"
          placeholder="XXXX XXXX XXXX XXXX"
          value={cardNumber}
          onChange={(e) => onFieldChange("cardNumber", e.target.value)}
        />
      </div>

      <div className={styles.fieldBlock}>
        <label htmlFor="nameOnCard">Name on card</label>
        <input
          id="nameOnCard"
          type="text"
          placeholder="As shown on card"
          value={nameOnCard}
          onChange={(e) => onFieldChange("nameOnCard", e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.fieldBlock}>
          <label htmlFor="expiry">Expiry</label>
          <input
            id="expiry"
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => onFieldChange("expiry", e.target.value)}
          />
        </div>
        <div className={styles.fieldBlock}>
          <label htmlFor="cvv">CVV</label>
          <input
            id="cvv"
            type="password"
            placeholder="123"
            value={cvv}
            onChange={(e) => onFieldChange("cvv", e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};

export default Visa;
