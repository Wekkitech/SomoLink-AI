import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCoins } from "react-icons/fa";
import styles from "./Payment.module.css";
import { SuccessToast } from "@/pages/Somo/components";
import { PAYMENT_PACKAGES, PAYMENT_OPTIONS } from "./data/payment.config";
import {
  Summary,
  Visa,
  Mpesa,
  Manual,
  Voucher,
} from "@/pages/Jiji/pages/Payment/widgets";

const METHODS = [
  { id: "mpesa", label: "M-PESA" },
  { id: "voucher", label: "Voucher" },
  { id: "manual", label: "Manual payment" },
  { id: "visa", label: "VISA Card" },
];

const Payment = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();

  const [paid, setPaid] = useState(false);
  const [activeMethod, setActiveMethod] = useState("mpesa");
  const [formData, setFormData] = useState({
    phone: "",
    cardNumber: "",
    nameOnCard: "",
    expiry: "",
    cvv: "",
    voucherCode: "",
    voucherPin: "",
  });

  const widgetsContainerRef = useRef(null);
  const widgetRefs = useRef({});

  const pkg = PAYMENT_PACKAGES[packageId];

  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    navigate("/jiji");
  };

  const handlePay = () => {
    if (!pkg) return;

    if (activeMethod === "mpesa") {
      if (!formData.phone) {
        alert("Please enter the M-Pesa phone number.");
        return;
      }
      alert(
        `Simulating STK push:\n\nKES ${pkg.price} will be charged to ${formData.phone}.`
      );
    }

    if (activeMethod === "visa") {
      if (
        !formData.cardNumber ||
        !formData.nameOnCard ||
        !formData.expiry ||
        !formData.cvv
      ) {
        alert("Please fill in all card details.");
        return;
      }
    }

    if (activeMethod === "voucher") {
      if (!formData.voucherCode) {
        alert("Please enter the voucher code.");
        return;
      }
    }

    setPaid(true);
    setTimeout(() => navigate("/jiji/active"), 1500);
  };

  const currentIndex = METHODS.findIndex((m) => m.id === activeMethod) ?? 0;
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < METHODS.length - 1;

  const goPrev = () => {
    if (!canGoPrev) return;
    const prevMethod = METHODS[currentIndex - 1].id;
    setActiveMethod(prevMethod);
  };

  const goNext = () => {
    if (!canGoNext) return;
    const nextMethod = METHODS[currentIndex + 1].id;
    setActiveMethod(nextMethod);
  };

  useEffect(() => {
    const el = widgetRefs.current[activeMethod];
    if (el && widgetsContainerRef.current) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeMethod]);

  if (!pkg) {
    return (
      <div className="page-jiji">
        <div className="page-content">
          <p>Package not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-jiji">
      <div className={`page-content ${styles.wrapper}`}>
        <button
          className={styles.backBtn}
          type="button"
          onClick={() => navigate("/jiji")}
        >
          ← Back to packages
        </button>

        <Summary
          pkg={pkg}
          paymentOptions={PAYMENT_OPTIONS}
          methods={METHODS}
          activeMethod={activeMethod}
          onMethodDotClick={setActiveMethod}
          onCancel={handleCancel}
          onPay={handlePay}
        />

        <div className={styles.widgetsSlider}>
          <button
            type="button"
            className={`${styles.navArrow} ${styles.leftArrow}`}
            onClick={goPrev}
            disabled={!canGoPrev}
            aria-label="Previous payment option"
          >
            ‹
          </button>

          <div className={styles.widgetsRow} ref={widgetsContainerRef}>
            <div
              className={styles.widgetItem}
              ref={(el) => (widgetRefs.current.mpesa = el)}
            >
              <Mpesa
                pkg={pkg}
                isActive={activeMethod === "mpesa"}
                onSelect={() => setActiveMethod("mpesa")}
                phone={formData.phone}
                onFieldChange={handleFieldChange}
              />
            </div>

            <div
              className={styles.widgetItem}
              ref={(el) => (widgetRefs.current.voucher = el)}
            >
              <Voucher
                isActive={activeMethod === "voucher"}
                onSelect={() => setActiveMethod("voucher")}
                voucherCode={formData.voucherCode}
                voucherPin={formData.voucherPin}
                onFieldChange={handleFieldChange}
              />
            </div>

            <div
              className={styles.widgetItem}
              ref={(el) => (widgetRefs.current.manual = el)}
            >
              <Manual
                isActive={activeMethod === "manual"}
                onSelect={() => setActiveMethod("manual")}
              />
            </div>

            <div
              className={styles.widgetItem}
              ref={(el) => (widgetRefs.current.visa = el)}
            >
              <Visa
                isActive={activeMethod === "visa"}
                onSelect={() => setActiveMethod("visa")}
                cardNumber={formData.cardNumber}
                nameOnCard={formData.nameOnCard}
                expiry={formData.expiry}
                cvv={formData.cvv}
                onFieldChange={handleFieldChange}
              />
            </div>
          </div>

          <button
            type="button"
            className={`${styles.navArrow} ${styles.rightArrow}`}
            onClick={goNext}
            disabled={!canGoNext}
            aria-label="Next payment option"
          >
            ›
          </button>
        </div>

        {paid && <SuccessToast message="Payment successful" />}
      </div>
    </div>
  );
};

export default Payment;
