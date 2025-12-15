import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));

    // auto clear error for that field once user types
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function validateFields() {
    const newErr = {};

    if (!form.firstName.trim()) newErr.firstName = "First name is required";
    if (!form.lastName.trim()) newErr.lastName = "Last name is required";

    // Must be Kenyan format +2547XXXXXXXX
    if (!/^\+2547\d{8}$/.test(form.phone)) {
      newErr.phone = "Enter a valid phone like +2547XXXXXXXX";
    }

    const passErr = validatePassword(form.password);
    if (passErr) newErr.password = passErr;

    if (form.password !== form.confirm) {
      newErr.confirm = "Passwords do not match";
    }

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
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
        setTimeout(() => {
          setToast("");
          navigate("/jiji/login");
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
    <div className="page-jiji">
      <div className={`page-content ${styles.wrapper}`}>
        {toast === "success" && (
          <SuccessToast message="Account created! Please log in." />
        )}
        {toast === "error" && (
          <ErrorToast message="Signup failed. Check your details." />
        )}

        <BackButton to="/jiji" label="Back To Jiji" />

        <div className={styles.headerRow}>
          <LogoBlock
            theme="jiji"
            title="Jiji Internet"
            text={`Providing Reliable Community Internet`}
          />
          <button
            className={styles.topLink}
            onClick={() => navigate("/jiji/login")}
          >
            Login
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* First name */}
          <label className={styles.label}>First name</label>
          <input
            className={styles.input}
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
          />
          {errors.firstName && (
            <div className={styles.error}>{errors.firstName}</div>
          )}

          {/* Last name */}
          <label className={styles.label}>Last name</label>
          <input
            className={styles.input}
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
          />
          {errors.lastName && (
            <div className={styles.error}>{errors.lastName}</div>
          )}

          {/* Phone */}
          <label className={styles.label}>Phone number</label>
          <input
            className={styles.input}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+2547XXXXXXXX"
          />
          {errors.phone && <div className={styles.error}>{errors.phone}</div>}

          {/* Password */}
          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
          />
          <div className={styles.hint}>
            Minimum 8 chars, includes upper, lower, number and special
            character.
          </div>
          {errors.password && (
            <div className={styles.error}>{errors.password}</div>
          )}

          {/* Confirm password */}
          <label className={styles.label}>Confirm password</label>
          <input
            type="password"
            className={styles.input}
            value={form.confirm}
            onChange={(e) => update("confirm", e.target.value)}
          />
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
