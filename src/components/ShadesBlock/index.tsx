import { useState, useEffect } from "react";
import ColorBlock from "../ColorBlock";
import styles from "./styles.module.scss";

import { RangeInput } from "@/components";
import { generateColorShades, interpolateTo100 } from "@/utils";

interface Props {
  steps: number;
  mainColor: string;
  direction: "lighten" | "darken";
}

const ShadesBlock: React.FC<Props> = (props) => {
  const [shades, setShades] = useState([] as string[]);
  const [shadeBrightness, setShadeBrightness] = useState(0);
  const [shadeSaturation, setShadeSaturation] = useState(0);
  const [shadeContrast, setShadeContrast] = useState(0);
  const [shadeTemperature, setShadeTemperature] = useState(0);

  const generateShadeIndexName = (index: number) => {
    const totalShades = props.steps * 2 + 1;

    if (props.direction === "lighten") {
      const shadeIndex = index + props.steps;
      const percentage = interpolateTo100(totalShades, shadeIndex);
      return `${percentage}`;
    } else {
      const shadeIndex = index + 1;
      const percentage = interpolateTo100(totalShades, shadeIndex);
      return `${percentage}`;
    }
  };

  useEffect(() => {
    setShades(
      generateColorShades({
        color: props.mainColor,
        steps: props.steps,
        direction: props.direction,
        shadeBrightness,
        shadeSaturation,
        shadeContrast,
        shadeTemperature
      }) as string[]
    );
  }, [
    props,
    shadeBrightness,
    shadeSaturation,
    shadeContrast,
    shadeTemperature
  ]);

  return (
    <section className={styles.shadesWrapper}>
      <section className={styles.shades}>
        {shades.map((shade, index) => (
          <ColorBlock
            key={index}
            color={shade}
            name={generateShadeIndexName(index)}
          />
        ))}
      </section>

      <section className={styles.controls}>
        <RangeInput
          id={`contrast-${props.direction}`}
          label="Contrast"
          className={styles.rangeInput}
          min={-1}
          max={1}
          step={0.1}
          value={shadeContrast}
          onChange={(e) => {
            setShadeContrast(Number(e.target.value));
          }}
        />
        <RangeInput
          id={`smoothness-${props.direction}`}
          label="Brightness"
          className={styles.rangeInput}
          min={-1}
          max={1}
          step={0.1}
          value={shadeBrightness}
          onChange={(e) => {
            setShadeBrightness(Number(e.target.value));
          }}
        />
        <RangeInput
          id={`saturation-${props.direction}`}
          label="Saturation"
          className={styles.rangeInput}
          min={-1}
          max={1}
          step={0.1}
          value={shadeSaturation}
          onChange={(e) => {
            setShadeSaturation(Number(e.target.value));
          }}
        />
        <RangeInput
          id={`temperature-${props.direction}`}
          label="Temperature"
          className={styles.rangeInput}
          min={-1}
          max={1}
          step={0.01}
          value={shadeTemperature}
          onChange={(e) => {
            setShadeTemperature(Number(e.target.value));
          }}
        />
      </section>
    </section>
  );
};

export default ShadesBlock;
