import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

import { RangeInput } from "@/components";
import { generateColorShades } from "@/utils";

interface Props {
  steps: number;
  mainColor: string;
  direction: "lighten" | "darken";
  shadeParams: {
    shadeBrightness: number;
    shadeSaturation: number;
    shadeTemperature: number;
  };
  onChange?: (props: {
    shades: string[];
    params: {
      shadeBrightness: number;
      shadeSaturation: number;
      shadeTemperature: number;
    };
  }) => void;
}

const ShadesBlock: React.FC<Props> = (props) => {
  const [shadeBrightness, setShadeBrightness] = useState(
    props.shadeParams.shadeBrightness
  );
  const [shadeSaturation, setShadeSaturation] = useState(
    props.shadeParams.shadeSaturation
  );
  const [shadeTemperature, setShadeTemperature] = useState(
    props.shadeParams.shadeTemperature
  );

  useEffect(() => {
    const shades = generateColorShades({
      color: props.mainColor,
      steps: props.steps,
      direction: props.direction,
      shadeBrightness,
      shadeSaturation,
      shadeTemperature
    }) as string[];

    props.onChange &&
      props.onChange({
        shades,
        params: {
          shadeBrightness,
          shadeSaturation,
          shadeTemperature
        }
      });
  }, [
    props.steps,
    props.direction,
    props.mainColor,
    shadeBrightness,
    shadeSaturation,
    shadeTemperature
  ]);

  return (
    <section className={styles.controls}>
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
        step={0.1}
        value={shadeTemperature}
        onChange={(e) => {
          setShadeTemperature(Number(e.target.value));
        }}
      />
    </section>
  );
};

export default ShadesBlock;
