import React from "react";

import Modal from "../Modal";
import fontColorContrast from "font-color-contrast";
import { score } from "wcag-color";

import styles from "./styles.module.scss";
import { init } from "next/dist/compiled/@vercel/og/satori";

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
      <div className={styles.modalSectionContent}>
        <span>{props.label}</span>
        <h3>{props.value}</h3>
      </div>
      <button
        className={styles.modalSectionButton}
        onClick={props.button.onClick}
      >
        {props.button.label}
      </button>
    </section>
  );
};

const ColorBlock: React.FC<Props> = (props) => {
  const [initialFontColor, setInitialFontColor] = React.useState("#000000");
  const [fontColor, setFontColor] = React.useState("var(--color-accesebility)");
  const [contrastScore, setContrastScore] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);

  React.useEffect(() => {
    const fontColor = fontColorContrast(props.color);

    setInitialFontColor(fontColor);
    setFontColor(
      fontColor === "#000000"
        ? "var(--color-background-dark)"
        : "var(--color-accesebility)"
    );

    const contrastScore = score(fontColor, props.color);

    setContrastScore(contrastScore);
  }, [props.color]);

  React.useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsCopied(false);
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [isCopied]);

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
        <div
          className={styles.modalContent}
          style={
            {
              "--base-color": initialFontColor,
              "--contrast-color":
                initialFontColor === "#000000" ? "#ffffff" : "#000000"
            } as React.CSSProperties
          }
        >
          <ModalSection
            label="WCAG level"
            value={contrastScore}
            button={{
              label: "Check",
              onClick: () => {
                window.open(
                  `https://webaim.org/resources/contrastchecker/?fcolor=${initialFontColor.replace(
                    "#",
                    ""
                  )}&bcolor=${props.color.replace("#", "")}`
                );
              }
            }}
          />
          <hr className={styles.modalSectionHR} />
          <ModalSection
            label="Hex code"
            value={props.color}
            button={{
              label: isCopied ? "Copied!" : "Copy",
              onClick: () => {
                navigator.clipboard.writeText(props.color);
                setIsCopied(true);
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
        <div className={styles.description}>
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
