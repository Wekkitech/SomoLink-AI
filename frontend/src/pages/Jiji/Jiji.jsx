import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Jiji.module.css";
import { FaCoins } from "react-icons/fa";
import { PAYMENT_PACKAGES } from "@/pages/Jiji/pages/Payment/data/payment.config";
import { BackButton, LogoBlock } from "@/components";

// turn the object into an array: [{id: 'p1', ...}, ...]

const packages = Object.entries(PAYMENT_PACKAGES).map(([id, pkg]) => ({
  id,
  ...pkg,
}));

const Jiji = () => {
  const navigate = useNavigate();

  return (
    <div className="page-jiji">
      <div className={`page-content ${styles.wrapper}`}>
        <BackButton to="/" label="Back to Home" />
        <div className={styles.headerRow}>
          <LogoBlock
            theme="jiji"
            title="Jiji Internet"
            text={`Providing Reliable Community Internet`}
          />
          <button
            className={styles.topLink}
            onClick={() => navigate("/jiji/login")}
          >
            Login
          </button>
        </div>
        <div className={styles.grid}>
          {packages.map((p) => (
            <div
              key={p.id}
              className={styles.card}
              onClick={() => navigate(`/jiji/payment/${p.id}`)}
            >
              <h3 className={styles.title}>{p.title}</h3>

              <div className={styles.priceRow}>
                <FaCoins className={styles.coin} />
                <span className={styles.price}>KES {p.price}</span>
              </div>

              <p className={styles.desc}>{p.desc}</p>

              <div className={styles.payIconsRow}>
                <img src="/icons/mpesa.png" alt="" />
                <img src="/icons/visa.png" alt="" />
                <img src="/icons/voucher.png" alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jiji;
