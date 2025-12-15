import React, { useState } from "react";
import { SuccessToast, ErrorToast } from "@/pages/Somo/components";
import { useNavigate } from "react-router-dom";
import { BackButton, LogoBlock } from "@/components";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./SomoAdminLogin.module.css";

const SomoAdminLogin = () => {
  const navigate = useNavigate();

  const [schoolId, setSchoolId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    if (!schoolId || !password) {
      setToast("error");
      setTimeout(() => setToast(""), 2600);
      return;
    }

    setToast("success");
    setTimeout(() => {
      setToast("");
      navigate("/somo/dashboard");
    }, 1200);
  }

  return (
    <div className="page-somo">
      <div className={`page-content ${styles.wrapper}`}>
        {toast === "success" && <SuccessToast message="Welcome" />}
        {toast === "error" && <ErrorToast message="Please fill all fields" />}

        <BackButton to="/somo" label="Back To Somo" />

        <div className={styles.headerRow}>
          <LogoBlock
            theme="somo"
            title="Welcome to SomoLink"
            text="Free Education Access to all Students"
          />
        </div>

        <form className={styles.form} onSubmit={handleLogin}>
          <label className={styles.label}>School ID</label>
          <input
            value={schoolId}
            onChange={(e) => setSchoolId(e.target.value)}
            className={styles.input}
            placeholder="School ID"
          />

          <label className={styles.label}>Password</label>

          <div className={styles.inputWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Password"
            />

            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPassword((v) => !v)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>

          <div className={styles.row}>
            <button type="submit" className={styles.primary}>
              Login
            </button>

            <button
              type="button"
              className={styles.link}
              onClick={() => navigate("/somo/forgot")}
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SomoAdminLogin;
