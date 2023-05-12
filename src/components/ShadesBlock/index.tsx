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

  const generateShadeIndexName = (index: number) => {
    const totalShades = props.steps * 2 + 1;

    if (props.direction === "lighten") {
      const shadeIndex = index + props.steps + 1;
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
        direction: props.direction
      }) as string[]
    );
  }, [props]);

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
          id={`curve-${props.direction}`}
          label="Curve"
          className={styles.rangeInput}
          min={0}
          max={34}
          step={1}
          value={0}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
      </section>
    </section>
  );
};

export default ShadesBlock;
