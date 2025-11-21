import React from "react";
import { useNavigate } from "react-router-dom";
import { LogoBlock } from "@/components";
import {
  LanguageSelector,
  PortalButton,
  FooterLinks,
} from "@/pages/Splash/components";
import { portalButtons } from "@/pages/Splash/data/splash.config";
import styles from "./Splash.module.css";

const Splash = () => {
  const navigate = useNavigate();
  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.topBar}>
        <LanguageSelector />
      </div>

      <div className={styles.centerContent}>
        <LogoBlock text={`Connected learning and Community internet`} />
        <div className={styles.buttonGroup}>
          {portalButtons.map(({ bgColor, title, description, path }, index) => (
            <PortalButton
              key={index}
              bgColor={bgColor}
              title={title}
              description={description}
              onClick={() => navigate(path)}
            />
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <FooterLinks />
      </div>
    </div>
  );
};

export default Splash;
