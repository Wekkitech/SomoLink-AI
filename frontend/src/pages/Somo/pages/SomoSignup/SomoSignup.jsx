import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SomoSignup.module.css";
import { validatePassword } from "@/helpers/password";

const SomoSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    schoolName: "",
    schoolId: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [sendingOtp, setSendingOtp] = useState(false);

  function update(key, val) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const passError = validatePassword(form.password);
    if (passError) {
      setErrors({ password: passError });
      return;
    }
    if (form.password !== form.confirm) {
      setErrors({ confirm: "Passwords do not match" });
      return;
    }

    setSendingOtp(true);
    // call backend to create account or send OTP: await api.somo.signup(form)
    setTimeout(() => {
      setSendingOtp(false);
      navigate("/somo/login");
    }, 1000);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <h2>Create Admin Account</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@school.org"
        />

        <label className={styles.label}>School name</label>
        <input
          className={styles.input}
          value={form.schoolName}
          onChange={(e) => update("schoolName", e.target.value)}
        />

        <label className={styles.label}>School ID</label>
        <input
          className={styles.input}
          value={form.schoolId}
          onChange={(e) => update("schoolId", e.target.value)}
        />

        <label className={styles.label}>Password</label>
        <input
          type="password"
          className={styles.input}
          value={form.password}
          onChange={(e) => update("password", e.target.value)}
        />
        <div className={styles.hint}>
          Password must be 8+ chars, include uppercase, lowercase, number and
          special char.
        </div>

        <label className={styles.label}>Confirm password</label>
        <input
          type="password"
          className={styles.input}
          value={form.confirm}
          onChange={(e) => update("confirm", e.target.value)}
        />

        <button className={styles.primary} type="submit" disabled={sendingOtp}>
          {sendingOtp ? "Sending OTP..." : "Create account"}
        </button>
      </form>
    </div>
  );
};

export default SomoSignup;
