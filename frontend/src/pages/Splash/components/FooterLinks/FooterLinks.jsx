import React, { useState } from "react";
import styles from "./FooterLinks.module.css";

const FooterLinks = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer className={styles.footer}>
      <hr />
      <p>
        By using our site or subscribing to our internet services, you agree to
        our{" "}
        <span className={styles.link} onClick={() => setShowTerms(true)}>
          Terms of Service
        </span>{" "}
        and{" "}
        <span className={styles.link} onClick={() => setShowPrivacy(true)}>
          Privacy Policy
        </span>
        .
      </p>

      {showTerms && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Terms of Service</h3>
            <p>
              {/* Insert your full terms text here */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
              malesuada.
            </p>
            <div className={styles.modalBtns}>
              <button onClick={() => setShowTerms(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showPrivacy && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Privacy Policy</h3>
            <p>
              {/* Insert your full privacy policy text here */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
              malesuada.
            </p>
            <div className={styles.modalBtns}>
              <button onClick={() => setShowPrivacy(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default FooterLinks;
