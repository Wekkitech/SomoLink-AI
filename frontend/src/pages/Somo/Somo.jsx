import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Somo.module.css";
import { BackButton, LogoBlock } from "@/components";
import { SchoolIdForm } from "@/pages/Somo/components";

const Somo = () => {
  const navigate = useNavigate();

  return (
    <div className="page-somo">
      <div className={`page-content ${styles.wrapper}`}>
        <BackButton to="/" label="Back to Home" />
        <button
          className={styles.adminLogin}
          onClick={() => navigate("/somo/login")}
        >
          Admin Login
        </button>

        <LogoBlock
          theme="somo"
          title="Welcome to SomoLink"
          text="Free Education Access to all Students"
        />

        <SchoolIdForm />
      </div>{" "}
    </div>
  );
};

export default Somo;
