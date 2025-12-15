import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";

const BackButton = ({ to = "/", label = "Back" }) => {
  const navigate = useNavigate();

  return (
    <button className={styles.backBtn} onClick={() => navigate(to)}>
      ← {label}
    </button>
  );
};

export default BackButton;
