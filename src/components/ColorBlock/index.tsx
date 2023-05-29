import React from "react";

import Modal from "../Modal";
import fontColorContrast from "font-color-contrast";
import { score } from "wcag-color";

import styles from "./styles.module.scss";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  color: string;
  name?: string;
}

interface ModalSectionrops {
  label: string;
  value: string;
  button: {
    label: string;
    onClick: () => void;
  };
}

const ModalSection: React.FC<ModalSectionrops> = (props) => {
  return (
    <section className={styles.modalSection}>
      <div className={styles.content}>
        <span>{props.label}</span>
        <h3>{props.value}</h3>
      </div>
      <button className={styles.button} onClick={props.button.onClick}>
        {props.button.label}
      </button>
    </section>
  );
};

const ColorBlock: React.FC<Props> = (props) => {
  const [fontColor, setFontColor] = React.useState("var(--color-accesebility)");
  const [contrastScore, setContrastScore] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    const fontColor = fontColorContrast(props.color);

    setFontColor(
      fontColor === "#000000"
        ? "var(--color-background-dark)"
        : "var(--color-accesebility)"
    );

    const contrastScore = score(fontColor, props.color);

    setContrastScore(contrastScore);
  }, [props.color]);

  const handleColorClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Modal
        backgroundColor={props.color}
        isOpen={isModalOpen}
        onOutsideClick={() => setIsModalOpen(false)}
      >
        <div>
          <ModalSection
            label="WCAG level"
            value={contrastScore}
            button={{
              label: "Check",
              onClick: () => {
                window.open(
                  `https://contrast-ratio.com/#${fontColor.slice(
                    1
                  )}-on-${props.color.slice(1)}`
                );
              }
            }}
          />
        </div>
      </Modal>
      <div
        className={`${styles.colorBlock} ${props.className}`}
        style={{ backgroundColor: props.color, ...props.style }}
        onClick={handleColorClick}
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
    </>
  );
};

ColorBlock.defaultProps = {
  color: "#000000",
  className: "",
  style: {}
};

export default ColorBlock;
