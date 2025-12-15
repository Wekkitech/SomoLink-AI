import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./JijiSignup.module.css";
import { BackButton, LogoBlock } from "@/components";
import { SuccessToast, ErrorToast } from "@/pages/Somo/components";
import { validatePassword } from "@/helpers/password";
import * as jijiApi from "@/api/jiji/jiji";

const JijiSignup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateFields = () => {
    const e = {};

    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";

    if (!/^\+2547\d{8}$/.test(form.phone)) {
      e.phone = "Enter a valid phone like +2547XXXXXXXX";
    }

    const passErr = validatePassword(form.password);
    if (passErr) e.password = passErr;

    if (form.password !== form.confirm) {
      e.confirm = "Passwords do not match";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    try {
      const res = await jijiApi.signup({
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        password: form.password,
      });

      if (res?.ok) {
        setToast("success");
        setTimeout(() => navigate("/jiji/login"), 900);
      } else {
        setToast("error");
      }
    } catch {
      setToast("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-jiji">
      <div className={`page-content ${styles.wrapper}`}>
        {toast === "success" && (
          <SuccessToast message="Account created successfully" />
        )}
        {toast === "error" && (
          <ErrorToast message="Signup failed. Check your details." />
        )}

        <BackButton to="/jiji" label="Back To Jiji" />

        <div className={styles.headerRow}>
          <LogoBlock
            theme="jiji"
            title="Jiji Internet"
            text="Providing Reliable Community Internet"
          />
          <button
            className={styles.topLink}
            onClick={() => navigate("/jiji/login")}
          >
            Login
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>First name</label>
          <input
            className={styles.input}
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
          />
          {errors.firstName && (
            <div className={styles.error}>{errors.firstName}</div>
          )}

          <label className={styles.label}>Last name</label>
          <input
            className={styles.input}
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
          />
          {errors.lastName && (
            <div className={styles.error}>{errors.lastName}</div>
          )}

          <label className={styles.label}>Phone number</label>
          <input
            className={styles.input}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+2547XXXXXXXX"
          />
          {errors.phone && <div className={styles.error}>{errors.phone}</div>}

          <label className={styles.label}>Password</label>
          <div className={styles.passwordRow}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.input}
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
            />
            <button
              type="button"
              className={styles.eye}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>

          <ul className={styles.passwordRules}>
            <li>At least 8 characters</li>
            <li>One uppercase letter</li>
            <li>One lowercase letter</li>
            <li>One number</li>
            <li>One special character</li>
          </ul>

          {errors.password && (
            <div className={styles.error}>{errors.password}</div>
          )}

          <label className={styles.label}>Confirm password</label>
          <div className={styles.passwordRow}>
            <input
              type={showConfirm ? "text" : "password"}
              className={styles.input}
              value={form.confirm}
              onChange={(e) => update("confirm", e.target.value)}
            />
            <button
              type="button"
              className={styles.eye}
              onClick={() => setShowConfirm((v) => !v)}
            >
              {showConfirm ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>

          {errors.confirm && (
            <div className={styles.error}>{errors.confirm}</div>
          )}

          <button className={styles.primary} type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JijiSignup;
