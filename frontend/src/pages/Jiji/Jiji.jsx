import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Jiji.module.css";
import { LogoBlock } from "@/components";
import { FaCoins } from "react-icons/fa";

const packages = [
  {
    id: "p1",
    title: "Daily 2GB",
    price: 50,
    desc: "Valid for 1 day",
  },
  {
    id: "p2",
    title: "Hourly 200MB",
    price: 10,
    desc: "Valid for 1 hour",
  },
  {
    id: "p3",
    title: "Weekly 10GB",
    price: 400,
    desc: "Valid for 7 days",
  },
];

const Jiji = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <LogoBlock text="Jiji Internet" />
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
  );
};

export default Jiji;
