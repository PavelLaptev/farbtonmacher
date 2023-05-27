import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

interface Props {
  steps: number;
  onPlusClick: () => void;
  onMinusClick: () => void;
}

const Sidebar: React.FC<Props> = (props) => {
  const [isMinusDisabled, setIsMinusDisabled] = useState(false);
  const [isPlusDisabled, setIsPlusDisabled] = useState(false);

  useEffect(() => {
    if (props.steps < 4) {
      setIsMinusDisabled(true);
    } else {
      setIsMinusDisabled(false);
    }

    if (props.steps > 7) {
      setIsPlusDisabled(true);
    } else {
      setIsPlusDisabled(false);
    }
  }, [props.steps]);

  return (
    <aside className={styles.sidebar}>
      <section className={styles.sidebarControls}>
        <button
          className={styles.plusButton}
          onClick={props.onPlusClick}
          disabled={isPlusDisabled}
        />
        <button
          className={styles.minusButton}
          onClick={props.onMinusClick}
          disabled={isMinusDisabled}
        />
      </section>

      <section className={styles.sidebarLinks}></section>
    </aside>
  );
};

export default Sidebar;
