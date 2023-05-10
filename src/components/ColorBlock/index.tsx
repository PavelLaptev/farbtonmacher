import styles from './styles.module.scss'

interface Props {
  className?: string
  style?: React.CSSProperties
  color: string
  name?: string
}

const ColorBlock: React.FC<Props> = (props) => {
  return (
    <div className={`${styles.colorBlock} ${props.className}`} style={{ backgroundColor: props.color, ...props.style }}>
      <div className={styles.title}>
        <span className={styles.colorName}>{props.name}</span>
      </div>

    </div>
  )
}

ColorBlock.defaultProps = {
  color: '#000000',
  className: '',
  style: {}
}

export default ColorBlock