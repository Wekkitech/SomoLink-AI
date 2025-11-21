import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./SuccessToast.module.css";
import "../shared/Toast.css";

const SuccessToast = ({ message = "Access Granted" }) => {
  return (
    <div className={`toast ${styles.toast}`}>
      <FaCheckCircle className={styles.icon} />
      <p>{message}</p>
    </div>
  );
};

export default SuccessToast;
