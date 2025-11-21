import React from "react";
import styles from "./PortalButton.module.css";

const PortalButton = ({ bgColor, title, description, onClick }) => {
  return (
    <button
      className={styles.button}
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      <h2>{title}</h2>
      <p>{description}</p>
    </button>
  );
};

export default PortalButton;
