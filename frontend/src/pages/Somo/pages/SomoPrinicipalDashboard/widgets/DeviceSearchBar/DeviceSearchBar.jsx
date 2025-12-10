import React from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./DeviceSearchBar.module.css";

const DeviceSearchBar = ({ value, onChange, onFilterClick }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBox}>
        <FaSearch className={styles.icon} />
        <input
          className={styles.input}
          placeholder="Search device..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <button className={styles.filterBtn} onClick={onFilterClick}>
        Filter by
      </button>
    </div>
  );
};

export default DeviceSearchBar;
