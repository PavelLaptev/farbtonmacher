import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

import ColorBlock from "../ColorBlock";

import styles from "./styles.module.scss";

interface Props {
  className?: string;
  isOpen?: boolean;
  children?: React.ReactNode;
  backgroundColor?: string;
  onOutsideClick?: () => void;
}

const Modal: React.FC<Props> = (props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const [playCloseAnimation, setPlayCloseAnimation] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (props.isOpen) {
      setPlayCloseAnimation(false);
      setIsOpen(true);
    } else {
      setPlayCloseAnimation(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
  }, [props.isOpen]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      props.onOutsideClick && props.onOutsideClick();
    }
  };

  return isMounted && isOpen
    ? createPortal(
        <aside
          className={`${styles.wrap} ${isOpen ? styles.open : ""} ${
            playCloseAnimation ? styles.close : ""
          } ${props.className}`}
          onClick={handleOutsideClick}
        >
          <section
            className={styles.modal}
            style={{
              backgroundColor: props.backgroundColor
            }}
          >
            {props.children}
          </section>
        </aside>,
        document.body
      )
    : null;
};

Modal.defaultProps = {
  className: "",
  isOpen: false,
  backgroundColor: "none"
};

export default Modal;
