import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import styles from "./ErrorToast.module.css";
import "../shared/Toast.css";
const ErrorToast = ({ message = "Invalid School ID" }) => {
  return (
    <div className={`toast ${styles.toast}`}>
      <FaTimesCircle className={styles.icon} />
      <p>{message}</p>
    </div>
  );
};

export default ErrorToast;
