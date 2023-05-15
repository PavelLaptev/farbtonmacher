import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  label: string;
  id: string;
  max: number;
  min: number;
  value: number;
  step: number;
  hueMode?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RangeInput: React.FC<Props> = (props) => {
  const [rangeInputValue, setRangeInputValue] = useState(props.value as number);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeInputValue(Number(e.target.value));
    props.onChange(e);
  };

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // restrict by min and max
    if (Number(e.target.value) < props.min) {
      setRangeInputValue(props.min);
      props.onChange(e);
      return;
    }

    if (Number(e.target.value) > props.max) {
      setRangeInputValue(props.max);
      props.onChange(e);
      return;
    }

    // maximum 1 decimal places
    if (e.target.value.includes(".")) {
      const decimalPlaces = e.target.value.split(".")[1].length;
      if (decimalPlaces > 1) {
        return;
      }
    }

    setRangeInputValue(Number(e.target.value));
    props.onChange(e);
  };

  useEffect(() => {
    setRangeInputValue(props.value);
  }, [props.value]);

  return (
    <section className={`${styles.wrapper} ${props.className}`}>
      <div className={styles.manualInputWrapper}>
        <span className={styles.label}>{props.label}</span>
        <input
          type="number"
          min={props.min}
          max={props.max}
          className={styles.manualInput}
          value={rangeInputValue}
          onChange={handleManualInput}
        />
      </div>
      <label htmlFor={props.id} className={styles.rangeWrapper}>
        <div className={styles.track}>
          <div
            className={styles.progress}
            style={{
              width: `${
                ((rangeInputValue - props.min) / (props.max - props.min)) * 100
              }%`
            }}
          />
        </div>

        <input
          id={props.id}
          type="range"
          min={props.min}
          max={props.max}
          step={props.step}
          className={styles.rangeInput}
          value={rangeInputValue}
          onChange={handleChange}
        />
      </label>
    </section>
  );
};

export default RangeInput;
