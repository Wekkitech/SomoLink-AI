import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSms, FaPhone } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./JijiLogin.module.css";
import { BackButton, LogoBlock } from "@/components";
import { SuccessToast, ErrorToast } from "@/pages/Somo/components";
import * as jijiApi from "@/api/jiji/jiji";

const JijiLogin = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [errors, setErrors] = useState({});

  const updatePhone = (value) => {
    setPhone(value);
    setErrors((p) => ({ ...p, phone: "" }));
  };

  const updatePassword = (value) => {
    setPassword(value);
    setErrors((p) => ({ ...p, password: "" }));
  };

  const updateOtp = (value) => {
    setOtp(value);
    setErrors((p) => ({ ...p, otp: "" }));
  };

  const validatePasswordLogin = () => {
    const e = {};
    if (!/^\+2547\d{8}$/.test(phone)) e.phone = "Enter +2547XXXXXXXX";
    if (!password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePasswordLogin = async (ev) => {
    ev.preventDefault();
    if (!validatePasswordLogin()) return;

    setLoading(true);
    try {
      const res = await jijiApi.loginWithPassword({ phone, password });
      if (res?.ok) {
        setToast("success");
        setToastMsg("Logged in successfully");
        setTimeout(() => navigate("/jiji/active"), 900);
      } else {
        setToast("error");
        setToastMsg("Incorrect phone or password");
      }
    } catch {
      setToast("error");
      setToastMsg("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-jiji">
      <div className={`page-content ${styles.wrapper}`}>
        {toast === "success" && <SuccessToast message={toastMsg} />}
        {toast === "error" && <ErrorToast message={toastMsg} />}

        <BackButton to="/jiji" label="Back To Jiji" />

        <div className={styles.headerRow}>
          <LogoBlock
            theme="jiji"
            title="Jiji Internet"
            text="Providing Reliable Community Internet"
          />
          <button
            className={styles.topLink}
            onClick={() => navigate("/jiji/signup")}
          >
            Sign Up
          </button>
        </div>

        {!otpMode && (
          <form className={styles.form} onSubmit={handlePasswordLogin}>
            <label className={styles.label}>Phone number</label>
            <input
              className={styles.input}
              value={phone}
              onChange={(e) => updatePhone(e.target.value)}
              placeholder="+2547XXXXXXXX"
            />
            {errors.phone && <div className={styles.error}>{errors.phone}</div>}

            <label className={styles.label}>Password</label>

            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                className={styles.input}
                value={password}
                onChange={(e) => updatePassword(e.target.value)}
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

            {errors.password && (
              <div className={styles.error}>{errors.password}</div>
            )}

            <div className={styles.row}>
              <button
                type="submit"
                className={styles.primary}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <button
                type="button"
                className={styles.link}
                onClick={() => navigate("/jiji/forgot")}
              >
                Forgot password?
              </button>
            </div>

            <div className={styles.orRow}>
              <span className={styles.orText}>Or</span>
              <button
                type="button"
                className={styles.ghost}
                onClick={() => setOtpMode(true)}
              >
                <FaSms /> Login with one time code
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default JijiLogin;
