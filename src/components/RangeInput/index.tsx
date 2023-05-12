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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RangeInput: React.FC<Props> = (props) => {
  const [value, setValue] = useState(props.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    props.onChange(e);
  };

  return (
    <section className={`${styles.wrapper} ${props.className}`}>
      <div className={styles.manualInputWrapper}>
        <span className={styles.label}>{props.label}</span>
        <input
          type="number"
          className={styles.manualInput}
          value={value}
          onChange={(e) => {
            setValue(Number(e.target.value));
            props.onChange(e);
          }}
        />
      </div>
      <label htmlFor={props.id} className={styles.rangeWrapper}>
        <div className={styles.track}>
          <div
            className={styles.progress}
            style={{
              width: `${((value - props.min) / (props.max - props.min)) * 100}%`
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
          value={value}
          onChange={handleChange}
        />
      </label>
    </section>
  );
};

export default RangeInput;
