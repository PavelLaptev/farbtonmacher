import React, { useState } from 'react'
import ColorBlock from '../ColorBlock'
import styles from './styles.module.scss'

interface Props {
  color: string
  shadesAmount: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PickerIcon = () => (
  <svg className={styles.pickerIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M14.0135 14.5065L15.7706 16.2636C16.7313 14.5898 16.8676 13.5883 16.2634 11.8281L20.2061 7.88543C21.2948 6.7967 21.2948 5.03151 20.2061 3.94277C19.1174 2.85404 17.3522 2.85404 16.2634 3.94277L12.3208 7.88543C10.6116 7.60294 9.64032 7.73585 7.88528 8.37826L9.64228 10.1353L3.73107 16.0465L3.52531 17.1069C3.12036 19.194 4.95477 21.0284 7.04182 20.6234L8.10228 20.4177L14.0135 14.5065ZM5.57792 17.028L10.3494 12.2565L11.8922 13.7993L7.1207 18.5708L6.66086 18.66C5.96518 18.795 5.35371 18.1836 5.48869 17.4879L5.57792 17.028Z" />
  </svg>
)


const ShadesBlock: React.FC<Props> = (props) => {
  const [mainColor, setMainColor] = useState(props.color)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // apply after 500ms

    setMainColor(e.target.value)
    props.onChange(e)
  }

  return (
    <section className={styles.wrapper} style={{
      width: `${100 / (props.shadesAmount * 2)}%`,
    }}>
      <ColorBlock className={styles.mainColor} color={mainColor} name='50' />
      <section className={styles.controls}>
        <label htmlFor="main-color-input" className={styles.colorControl}>
          <span className={styles.hexCode}>{mainColor.toUpperCase()}</span>
          <PickerIcon />
          <input id="main-color-input" type="color" value={mainColor} onChange={onChange} />
        </label>

      </section>
    </section>
  )
}

ShadesBlock.defaultProps = {
  color: '#000000',
}

export default ShadesBlock