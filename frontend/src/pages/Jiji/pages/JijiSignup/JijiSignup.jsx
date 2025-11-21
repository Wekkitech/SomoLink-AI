import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./JijiSignup.module.css";
import { LogoBlock } from "@/components";
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

  function update(k, v) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const passErr = validatePassword(form.password);
    if (passErr) {
      setErrors({ password: passErr });
      return;
    }
    if (form.password !== form.confirm) {
      setErrors({ confirm: "Passwords do not match" });
      return;
    }
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
  }

  return (
    <div className={styles.wrapper}>
      {toast === "success" && <SuccessToast message="Account created" />}
      {toast === "error" && <ErrorToast message="Failed to create account" />}

      <div className={styles.headerRow}>
        <LogoBlock text="Jiji Internet" />
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>First name</label>
        <input
          className={styles.input}
          value={form.firstName}
          onChange={(e) => update("firstName", e.target.value)}
        />

        <label className={styles.label}>Last name</label>
        <input
          className={styles.input}
          value={form.lastName}
          onChange={(e) => update("lastName", e.target.value)}
        />

        <label className={styles.label}>Phone number</label>
        <input
          className={styles.input}
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="+2547..."
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

        <button className={styles.primary} type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
    </div>
  );
};

export default JijiSignup;
