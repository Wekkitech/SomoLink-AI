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
  const [toastMsg, setToastMsg] = useState("");
  const [errors, setErrors] = useState({});

  // clear per field error when user types
  const updatePhone = (value) => {
    setPhone(value);
    setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const updatePassword = (value) => {
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  const updateOtp = (value) => {
    setOtp(value);
    setErrors((prev) => ({ ...prev, otp: "" }));
  };

  const validatePasswordLogin = () => {
    const newErr = {};

    if (!phone.trim()) {
      newErr.phone = "Phone number is required";
    } else if (!/^\+2547\d{8}$/.test(phone.trim())) {
      newErr.phone = "Enter a valid phone like +2547XXXXXXXX";
    }

    if (!password.trim()) {
      newErr.password = "Password is required";
    }

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const validateOtpLogin = () => {
    const newErr = {};

    if (!phone.trim()) {
      newErr.phone = "Phone number is required";
    } else if (!/^\+2547\d{8}$/.test(phone.trim())) {
      newErr.phone = "Enter a valid phone like +2547XXXXXXXX";
    }

    if (!otp.trim()) {
      newErr.otp = "Code is required";
    }

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();

    if (!validatePasswordLogin()) return;

    setLoading(true);
    try {
      const res = await jijiApi.loginWithPassword({ phone, password });

      if (res?.ok) {
        setToast("success");
        setToastMsg("Logged in successfully");
        setTimeout(() => {
          setToast("");
          setToastMsg("");
          navigate("/jiji/active"); // after login → active session
        }, 900);
      } else {
        setToast("error");
        setToastMsg(
          res?.status === 401
            ? "Incorrect phone or password"
            : "Unable to log in. Please try again."
        );
        setTimeout(() => {
          setToast("");
          setToastMsg("");
        }, 2200);
      }
    } catch (err) {
      setToast("error");
      setToastMsg("Network error. Please try again.");
      setTimeout(() => {
        setToast("");
        setToastMsg("");
      }, 2200);
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async () => {
    // reuse phone validation but not password
    const newErr = {};
    if (!phone.trim()) {
      newErr.phone = "Phone number is required";
    } else if (!/^\+2547\d{8}$/.test(phone.trim())) {
      newErr.phone = "Enter a valid phone like +2547XXXXXXXX";
    }
    setErrors(newErr);
    if (Object.keys(newErr).length > 0) return;

    setLoading(true);
    try {
      const res = await jijiApi.requestOtp({ phone });
      if (res?.ok) {
        setOtpMode(true);
        setToast("success");
        setToastMsg("Code sent to your phone");
        setTimeout(() => {
          setToast("");
          setToastMsg("");
        }, 1400);
      } else {
        setToast("error");
        setToastMsg("Could not send code. Try again.");
        setTimeout(() => {
          setToast("");
          setToastMsg("");
        }, 2200);
      }
    } catch (err) {
      setToast("error");
      setToastMsg("Network error. Please try again.");
      setTimeout(() => {
        setToast("");
        setToastMsg("");
      }, 2200);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();

    if (!validateOtpLogin()) return;

    setLoading(true);
    try {
      const res = await jijiApi.loginWithOtp({ phone, code: otp });
      if (res?.ok) {
        setToast("success");
        setToastMsg("Logged in successfully");
        setTimeout(() => {
          setToast("");
          setToastMsg("");
          navigate("/jiji/active"); // OTP login → active session
        }, 900);
      } else {
        setToast("error");
        setToastMsg(
          res?.status === 401
            ? "Incorrect code"
            : "Unable to verify code. Try again."
        );
        setTimeout(() => {
          setToast("");
          setToastMsg("");
        }, 2200);
      }
    } catch (err) {
      setToast("error");
      setToastMsg("Network error. Please try again.");
      setTimeout(() => {
        setToast("");
        setToastMsg("");
      }, 2200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-jiji">
      <div className={`page-content ${styles.wrapper}`}>
        {toast === "success" && (
          <SuccessToast message={toastMsg || "Success"} />
        )}
        {toast === "error" && (
          <ErrorToast message={toastMsg || "Please check input"} />
        )}

        <div className={styles.headerRow}>
          <LogoBlock
            theme={`jiji`}
            title="Jiji Internet"
            text={`Providing Reliable Community Internet`}
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
            <div className={styles.inputRow}>
              <input
                className={styles.input}
                value={phone}
                onChange={(e) => updatePhone(e.target.value)}
                placeholder="+2547XXXXXXXX"
              />
            </div>
            {errors.phone && <div className={styles.error}>{errors.phone}</div>}

            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => updatePassword(e.target.value)}
              placeholder="Password"
            />
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
                onChange={(e) => updatePhone(e.target.value)}
                placeholder="+2547XXXXXXXX"
              />
            </div>
            {errors.phone && <div className={styles.error}>{errors.phone}</div>}

            <label className={styles.label}>Enter code</label>
            <input
              className={styles.input}
              value={otp}
              onChange={(e) => updateOtp(e.target.value)}
              placeholder="123456"
            />
            {errors.otp && <div className={styles.error}>{errors.otp}</div>}

            <div className={styles.row}>
              <button
                type="submit"
                className={styles.primary}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
              <button
                type="button"
                className={styles.link}
                onClick={() => {
                  setOtpMode(false);
                  setOtp("");
                  setErrors({});
                }}
              >
                Use password instead
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default JijiLogin;
