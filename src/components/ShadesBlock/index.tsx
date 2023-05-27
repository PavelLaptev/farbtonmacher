import { useState, useEffect } from "react";
import ColorBlock from "../ColorBlock";
import styles from "./styles.module.scss";

interface Props {
  shades: string[];
  names: string[];
}

const ShadesBlock: React.FC<Props> = (props) => {
  const [shades, setShades] = useState([] as string[]);
  const [names, setNames] = useState([] as string[]);

  useEffect(() => {
    setShades(props.shades);
    setNames(props.names);
  }, [props]);

  return (
    <section className={styles.shades}>
      {shades.map((shade, index) => (
        <ColorBlock key={index} color={shade} name={names[index]} />
      ))}
    </section>
  );
};

export default ShadesBlock;
