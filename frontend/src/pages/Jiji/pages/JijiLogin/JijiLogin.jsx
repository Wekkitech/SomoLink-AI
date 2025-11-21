import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSms, FaPhone } from "react-icons/fa";
import styles from "./JijiLogin.module.css";
import { LogoBlock } from "@/components";
import { SuccessToast, ErrorToast } from "@/pages/Somo/components";
import * as jijiApi from "@/api/jiji/jiji";

const JijiLogin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!phone || !password) {
      setToast("error");
      setTimeout(() => setToast(""), 2200);
      return;
    }
    setLoading(true);
    try {
      const res = await jijiApi.loginWithPassword({ phone, password });
      if (res?.ok) {
        setToast("success");
        setTimeout(() => {
          setToast("");
          navigate("/jiji");
        }, 900);
      } else {
        setToast("error");
        setTimeout(() => setToast(""), 2200);
      }
    } catch (err) {
      setToast("error");
      setTimeout(() => setToast(""), 2200);
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async () => {
    if (!phone) {
      setToast("error");
      setTimeout(() => setToast(""), 2200);
      return;
    }
    setLoading(true);
    try {
      const res = await jijiApi.requestOtp({ phone });
      if (res?.ok) {
        setOtpMode(true);
        setToast("success");
        setTimeout(() => setToast(""), 1400);
      } else {
        setToast("error");
        setTimeout(() => setToast(""), 2200);
      }
    } catch (err) {
      setToast("error");
      setTimeout(() => setToast(""), 2200);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    if (!phone || !otp) {
      setToast("error");
      setTimeout(() => setToast(""), 2200);
      return;
    }
    setLoading(true);
    try {
      const res = await jijiApi.loginWithOtp({ phone, code: otp });
      if (res?.ok) {
        setToast("success");
        setTimeout(() => {
          setToast("");
          navigate("/jiji");
        }, 900);
      } else {
        setToast("error");
        setTimeout(() => setToast(""), 2200);
      }
    } catch (err) {
      setToast("error");
      setTimeout(() => setToast(""), 2200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {toast === "success" && <SuccessToast message="Success" />}
      {toast === "error" && <ErrorToast message="Please check input" />}

      <div className={styles.headerRow}>
        <LogoBlock text="Jiji Internet" />
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
          <div className={styles.inputRow}>
            <FaPhone className={styles.fieldIcon} />
            <input
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+2547XXXXXXXX"
            />
          </div>

          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <div className={styles.row}>
            <button type="submit" className={styles.primary} disabled={loading}>
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
              onClick={handleSendCode}
            >
              <FaSms /> Login with one-time code
            </button>
          </div>
        </form>
      )}

      {otpMode && (
        <form className={styles.form} onSubmit={handleOtpLogin}>
          <label className={styles.label}>Phone number</label>
          <div className={styles.inputRow}>
            <FaPhone className={styles.fieldIcon} />
            <input
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+2547XXXXXXXX"
            />
          </div>

          <label className={styles.label}>Enter code</label>
          <input
            className={styles.input}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="123456"
          />

          <div className={styles.row}>
            <button type="submit" className={styles.primary} disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </button>
            <button
              type="button"
              className={styles.link}
              onClick={() => {
                setOtpMode(false);
                setOtp("");
              }}
            >
              Use password instead
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default JijiLogin;
