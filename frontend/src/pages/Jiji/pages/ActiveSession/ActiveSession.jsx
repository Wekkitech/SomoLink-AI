import React from "react";
import { useNavigate } from "react-router-dom";
import { LogoBlock } from "@/components";
import styles from "./ActiveSession.module.css";
import UsageSummaryCard from "@/pages/Jiji/pages/ActiveSession/widgets/UsageSummaryCard";

const ActiveSession = () => {
  const navigate = useNavigate();

  const session = {
    planName: "Hourly Pass",
    usedPercent: 75,
    timeRemaining: "1 hr 30 min",
    dataRemaining: "2.4 GB",
    statusText: "You are Online !",
  };

  return (
    <div className="page-jiji">
      <div className={`page-content ${styles.wrapper}`}>
        <header className={styles.headerRow}>
          <LogoBlock
            theme="jiji"
            title="Jiji Internet"
            text={`Providing Reliable Community Internet`}
          />
          <button
            type="button"
            className={styles.logoutBtn}
            onClick={() => navigate("/jiji/login")}
          >
            Logout
          </button>
        </header>

        <p className={styles.status}>{session.statusText}</p>

        <UsageSummaryCard session={session} />

        <button
          type="button"
          className={styles.buyMoreBtn}
          onClick={() => navigate("/jiji")}
        >
          Buy More
        </button>
      </div>
    </div>
  );
};

export default ActiveSession;
