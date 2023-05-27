import React from "react";

import fontColorContrast from "font-color-contrast";
import { score } from "wcag-color";

import styles from "./styles.module.scss";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  color: string;
  name?: string;
}

const ColorBlock: React.FC<Props> = (props) => {
  const [fontColor, setFontColor] = React.useState("#000000");
  const [contrastScore, setContrastScore] = React.useState("");

  React.useEffect(() => {
    const fontColor = fontColorContrast(props.color);

    setFontColor(
      fontColor === "#000000"
        ? "var(--color-background-dark)"
        : "var(--color-accesebility)"
    );

    const contrastScore = score(fontColor, props.color);

    setContrastScore(contrastScore);

    console.log(contrastScore);
  }, [props.color]);

  return (
    <div
      className={`${styles.colorBlock} ${props.className}`}
      style={{ backgroundColor: props.color, ...props.style }}
    >
      <div className={styles.title}>
        <span
          className={styles.score}
          style={{
            color: fontColor
          }}
        >
          {contrastScore}
        </span>
        <span
          className={styles.number}
          style={{
            color: fontColor
          }}
        >
          {props.name}
        </span>
      </div>
    </div>
  );
};

ColorBlock.defaultProps = {
  color: "#000000",
  className: "",
  style: {}
};

export default ColorBlock;
