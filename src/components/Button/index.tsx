import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

interface Props {
  label: string;
  baseColor: string;
  onClick: () => void;
}

const Button: React.FC<Props> = (props) => {
  return (
    <button
      className={styles.button}
      style={
        {
          "--base-color": props.baseColor,
          "--contrast-color":
            props.baseColor === "#000000" ? "#ffffff" : "#000000"
        } as any
      }
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};

Button.defaultProps = {
  label: "Button",
  baseColor: "var(--color-primary)"
};

export default Button;
