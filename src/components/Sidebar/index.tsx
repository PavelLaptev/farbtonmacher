import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

interface Props {
  steps: number;
  onPlusClick: () => void;
  onMinusClick: () => void;
}

const GithubIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 0C4.475 0 0 4.58819 0 10.2529C0 14.7899 2.8625 18.6219 6.8375 19.9804C7.3375 20.0701 7.525 19.7625 7.525 19.4934C7.525 19.2499 7.5125 18.4425 7.5125 17.5838C5 18.058 4.35 16.9558 4.15 16.3791C4.0375 16.0843 3.55 15.1743 3.125 14.9308C2.775 14.7386 2.275 14.2644 3.1125 14.2516C3.9 14.2388 4.4625 14.9949 4.65 15.3025C5.55 16.8533 6.9875 16.4175 7.5625 16.1484C7.65 15.4819 7.9125 15.0334 8.2 14.777C5.975 14.5207 3.65 13.6364 3.65 9.71466C3.65 8.59965 4.0375 7.67689 4.675 6.95918C4.575 6.70286 4.225 5.65193 4.775 4.24215C4.775 4.24215 5.6125 3.97301 7.525 5.29308C8.325 5.06239 9.175 4.94704 10.025 4.94704C10.875 4.94704 11.725 5.06239 12.525 5.29308C14.4375 3.9602 15.275 4.24215 15.275 4.24215C15.825 5.65193 15.475 6.70286 15.375 6.95918C16.0125 7.67689 16.4 8.58684 16.4 9.71466C16.4 13.6492 14.0625 14.5207 11.8375 14.777C12.2 15.0975 12.5125 15.7126 12.5125 16.6738C12.5125 18.0452 12.5 19.1474 12.5 19.4934C12.5 19.7625 12.6875 20.0829 13.1875 19.9804C17.1375 18.6219 20 14.777 20 10.2529C20 4.58819 15.525 0 10 0Z"
      fill="var(--color-primary)"
    />
  </svg>
);

const TwitterIcon = () => (
  <svg
    width="20"
    height="16"
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 2.13004C19.263 2.43801 18.4723 2.6471 17.6428 2.74034C18.4902 2.26001 19.1407 1.49713 19.445 0.590163C18.6514 1.03659 17.7741 1.35869 16.8402 1.53387C16.0913 0.779469 15.0261 0.307617 13.8445 0.307617C11.5799 0.307617 9.74191 2.0481 9.74191 4.19262C9.74191 4.49777 9.77771 4.79444 9.84932 5.07699C6.43891 4.91594 3.41638 3.36759 1.39341 1.01681C1.04132 1.59037 0.838431 2.25718 0.838431 2.9692C0.838431 4.31694 1.56348 5.50646 2.66448 6.20152C1.99314 6.18174 1.36058 6.00656 0.805609 5.71554C0.805609 5.7325 0.805609 5.74662 0.805609 5.76358C0.805609 7.64533 2.2199 9.21628 4.09667 9.57229C3.75354 9.65988 3.38953 9.70791 3.01656 9.70791C2.75101 9.70791 2.49441 9.68248 2.24377 9.63728C2.76593 11.18 4.28166 12.3045 6.07489 12.3356C4.66955 13.3782 2.90318 13.9998 0.978666 13.9998C0.647471 13.9998 0.322244 13.98 0 13.9461C1.81411 15.048 3.97136 15.6922 6.28972 15.6922C13.8356 15.6922 17.9621 9.7729 17.9621 4.63904C17.9621 4.46952 17.9591 4.30281 17.9502 4.13611C18.7528 3.58797 19.448 2.90421 19.997 2.12439L20 2.13004Z"
      fill="var(--color-primary)"
    />
  </svg>
);

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

      <section className={styles.sidebarLinks}>
        <a
          href="https://github.com/PavelLaptev/shade-craft"
          target="_blank"
          rel="noreferrer"
          className={styles.socialLink}
        >
          <GithubIcon />
        </a>
        <a
          href="https://twitter.com/pawellaptew"
          target="_blank"
          rel="noreferrer"
          className={styles.socialLink}
        >
          <TwitterIcon />
        </a>
      </section>
    </aside>
  );
};

export default Sidebar;
