import React, { useState } from "react";
import ColorBlock from "../ColorBlock";
import styles from "./styles.module.scss";

interface Props {
  color: string;
  shadesAmount: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShadesBlock: React.FC<Props> = (props) => {
  const [mainColor, setMainColor] = useState(props.color);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // apply after 500ms

    setMainColor(e.target.value);
    props.onChange(e);
  };

  return (
    <section
      className={styles.wrapper}
      style={{
        width: `${100 / (props.shadesAmount * 2)}%`
      }}
    >
      <ColorBlock className={styles.mainColor} color={mainColor} name="50" />
      <section className={styles.controls}>
        <label htmlFor="main-color-input" className={styles.colorControl}>
          <span className={styles.hexCode}>{mainColor.toUpperCase()}</span>
          <div
            className={styles.colorPreview}
            style={{
              backgroundColor: mainColor
            }}
          />
          <input
            id="main-color-input"
            type="color"
            value={mainColor}
            onChange={onChange}
          />
        </label>
      </section>
    </section>
  );
};

ShadesBlock.defaultProps = {
  color: "#000000"
};

export default ShadesBlock;
