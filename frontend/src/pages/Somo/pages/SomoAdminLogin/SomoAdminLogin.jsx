import React, { useState } from "react";
import { SuccessToast, ErrorToast } from "@/pages/Somo/components";
import { useNavigate } from "react-router-dom";
import { LogoBlock } from "@/components";
import styles from "./SomoAdminLogin.module.css";

const SomoAdminLogin = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    if (!schoolId || !password) {
      setToast("error");
      setTimeout(() => setToast(""), 2600);
      return;
    }
    // call your API: await api.somo.login({schoolId, password})
    setToast("success");
    setTimeout(() => {
      setToast("");
      navigate("/somo/dashboard"); // change to real path
    }, 1200);
  }

  return (
    <div className="page-somo">
      <div className={`page-content ${styles.wrapper}`}>
        {" "}
        {toast === "success" && <SuccessToast message="Welcome" />}
        {toast === "error" && <ErrorToast message="Please fill all fields" />}
        <div className={styles.headerRow}>
          <LogoBlock
            theme="somo"
            title={`Welcome to SomoLink`}
            text="Free Education Access to all Students"
          />
          {/* <button
          className={styles.topLink}
          onClick={() => navigate("/somo/signup")}
        >
          Sign Up
        </button> */}
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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="Password"
          />

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
