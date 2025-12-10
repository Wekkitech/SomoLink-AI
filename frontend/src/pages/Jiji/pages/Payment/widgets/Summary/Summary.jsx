import React from "react";
import styles from "./Summary.module.css";

const Summary = ({
  pkg,
  paymentOptions,
  methods,
  activeMethod,
  onMethodDotClick,
  onCancel,
  onPay,
}) => {
  const featured =
    paymentOptions?.filter((opt) => opt.id === "mpesa" || opt.id === "visa") ||
    [];

  const iconsToShow =
    featured.length > 0 ? featured : paymentOptions?.slice(0, 2) || [];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h1 className={styles.title}>{pkg.title}</h1>
        <span className={styles.subtitle}>Purchase summary</span>
      </div>

      <div className={styles.summaryList}>
        <div className={styles.row}>
          <span>Plan name :</span>
          <span className={styles.strong}>{pkg.title}</span>
        </div>
        <div className={styles.row}>
          <span>Amount :</span>
          <span className={styles.strong}>Kes {pkg.price}</span>
        </div>
        <div className={styles.row}>
          <span>Quota type :</span>
          <span className={styles.strong}>{pkg.quota}</span>
        </div>
        <div className={styles.row}>
          <span>Validity :</span>
          <span className={styles.strong}>{pkg.duration}</span>
        </div>
        <div className={styles.row}>
          <span>Payment methods :</span>
          <span className={styles.icons}>
            {iconsToShow.map((opt) => (
              <img key={opt.id} src={opt.icon} alt={opt.label} />
            ))}
          </span>
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.chooseLabel}>Choose payment option</span>

        <div className={styles.dotsRow}>
          {methods.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-label={m.label}
              className={`${styles.dot} ${
                activeMethod === m.id ? styles.dotActive : ""
              }`}
              onClick={() => onMethodDotClick(m.id)}
            />
          ))}
        </div>

        <div className={styles.actionsRow}>
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className={styles.payBtn} onClick={onPay}>
            Pay now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
