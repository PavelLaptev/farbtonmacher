import React from "react";
import styles from "./styles.module.scss";

const LoadSpinner: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.color1} />
      <div className={styles.color2} />
      <div className={styles.color3} />
    </div>
  );
};

export default LoadSpinner;
