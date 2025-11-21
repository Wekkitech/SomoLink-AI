import { useState } from "react";
import SuccessToast from "../SuccessToast/SuccessToast";
import ErrorToast from "../ErrorToast/ErrorToast";
import styles from "./SchoolIdForm.module.css";
import { FaGraduationCap } from "react-icons/fa";

const SchoolIdForm = () => {
  const [schoolId, setSchoolId] = useState("");
  const [toastType, setToastType] = useState("");

  const handleConnect = () => {
    if (!schoolId.trim() || isNaN(schoolId)) {
      setToastType("error");
      setTimeout(() => setToastType(""), 2000);
      return;
    }

    setToastType("success");
    setSchoolId("");
    setTimeout(() => setToastType(""), 2000);
  };

  return (
    <div className={styles.wrapper}>
      {toastType === "success" && <SuccessToast message="Access Granted" />}
      {toastType === "error" && <ErrorToast message="Invalid School ID" />}

      <label className={styles.label}>Please enter your School ID</label>

      <div className={styles.inputWrapper}>
        <FaGraduationCap  className={styles.iconArea} />
        <div className={styles.divider}></div>

        <input
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
          placeholder="School ID"
          className={styles.input}
        />
      </div>

      <button className={styles.connectBtn} onClick={handleConnect}>
        Connect
      </button>
    </div>
  );
};

export default SchoolIdForm;
