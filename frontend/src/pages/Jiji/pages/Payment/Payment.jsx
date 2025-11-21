import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCoins } from "react-icons/fa";
import styles from "./Payment.module.css";
import { SuccessToast } from "@/pages/Somo/components";

const PACKAGES = {
  p1: { title: "Daily 2GB", duration: "1 day", price: 50, quota: "Data-Based" },
  p2: {
    title: "Hourly 200MB",
    duration: "1 hour",
    price: 10,
    quota: "Data-Based",
  },
  p3: {
    title: "Weekly 10GB",
    duration: "7 days",
    price: 400,
    quota: "Data-Based",
  },
};

const paymentOptions = [
  { id: "mpesa", label: "M-Pesa", icon: "/icons/mpesa.png" },
  { id: "visa", label: "VISA", icon: "/icons/visa.png" },
  { id: "voucher", label: "Voucher", icon: "/icons/voucher.png" },
];

const Payment = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [paid, setPaid] = useState(false);
  const [modal, setModal] = useState({ open: false, method: "" });
  const [formData, setFormData] = useState({});

  const pkg = PACKAGES[packageId];

  const openModal = (method) => {
    setFormData({});
    setModal({ open: true, method });
  };

  const closeModal = () => setModal({ open: false, method: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePay = () => {
    const { method } = modal;
    if (method === "mpesa") {
      if (!formData.number || !formData.pin)
        return alert("Please fill all fields");
    } else if (method === "visa") {
      if (!formData.card || !formData.cvv)
        return alert("Please fill all fields");
    } else if (method === "voucher") {
      if (!formData.code) return alert("Please enter voucher code");
    }

    setModal({ open: false, method: "" });

    setTimeout(() => {
      setPaid(true);
      setTimeout(() => navigate("/jiji"), 1500);
    }, 1000);
  };

  const renderModalContent = () => {
    const { method } = modal;
    if (!method) return null;

    return (
      <div className={styles.modalContent}>
        <h3>{method.toUpperCase()} Payment</h3>
        {method === "mpesa" && (
          <>
            <input
              type="text"
              placeholder="M-Pesa Number"
              name="number"
              value={formData.number || ""}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="M-Pesa PIN"
              name="pin"
              value={formData.pin || ""}
              onChange={handleChange}
            />
          </>
        )}
        {method === "visa" && (
          <>
            <input
              type="text"
              placeholder="Card Number"
              name="card"
              value={formData.card || ""}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="CVV"
              name="cvv"
              value={formData.cvv || ""}
              onChange={handleChange}
            />
          </>
        )}
        {method === "voucher" && (
          <input
            type="text"
            placeholder="Voucher Code"
            name="code"
            value={formData.code || ""}
            onChange={handleChange}
          />
        )}
        <div className={styles.modalBtns}>
          <button onClick={handlePay}>Pay</button>
          <button onClick={closeModal} className={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      {/* Purchase Summary Card */}
      <div className={styles.card}>
        <h2>{pkg.title} - Purchase Summary</h2>
        <div className={styles.summaryRow}>
          <span className={styles.label}>Plan Name:</span>
          <span>{pkg.title}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.label}>Amount:</span>
          <span>KES {pkg.price}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.label}>Quota Type:</span>
          <span>{pkg.quota}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.label}>Validity:</span>
          <span>{pkg.duration}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.label}>Payment Methods:</span>
        </div>

        {/* Payment Options Slide */}
        <div className={styles.payScroll}>
          {paymentOptions.map((opt) => (
            <div
              key={opt.id}
              className={styles.payOption}
              onClick={() => openModal(opt.id)}
            >
              <img src={opt.icon} alt={opt.label} />
              <span>{opt.label}</span>
            </div>
          ))}
        </div>
      </div>

      {modal.open && (
        <div className={styles.modalOverlay}>{renderModalContent()}</div>
      )}

      {paid && <SuccessToast message="Payment successful" />}
    </div>
  );
};

export default Payment;
