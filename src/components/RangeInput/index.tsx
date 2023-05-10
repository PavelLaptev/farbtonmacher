import { useState, useEffect } from 'react'
import styles from './styles.module.scss'


interface Props {
  className?: string
  style?: React.CSSProperties
  id: string
}



const RangeInput: React.FC<Props> = (props) => {

  return (
    <label htmlFor={props.id} className={`${styles.wrapper}`}>
      <input id={props.id} type="range" min="1" max="10" className={styles.rangeInput} />
    </label>
  )
}

export default RangeInput