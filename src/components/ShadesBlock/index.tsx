import { useState, useEffect } from 'react'
import ColorBlock from '../ColorBlock'
import styles from './styles.module.scss'

import { generateColorShades } from '@/utils'

interface Props {
  color: string
  shadesAmount: number
}

const ShadesBlock: React.FC<Props> = (props) => {
  const [shades, setShades] = useState([] as string[])


  useEffect(() => {
    const shades = generateColorShades(props.color, props.shadesAmount, "lighten", -0.3)

    console.log(shades)
    setShades(shades)

  }, [props.color, props.shadesAmount])


  return (
    <section className={styles.shadesWrapper}>
      <section className={styles.shades}>
        {
          shades.map((shade, index) => (
            <ColorBlock key={index} color={shade} />
          ))
        }
      </section>
      <section className={styles.controls}>
      </section>
    </section>
  )
}

ShadesBlock.defaultProps = {
  color: '#000000',
}

export default ShadesBlock