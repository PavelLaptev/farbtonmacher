import styles from './styles.module.scss'

interface Props {
  className?: string
  style?: React.CSSProperties
  color: string
}

const ColorBlock: React.FC<Props> = (props) => {
  return (
    <div className={`${styles.colorBlock} ${props.className}`} style={{ backgroundColor: props.color, ...props.style }} />
  )
}

ColorBlock.defaultProps = {
  color: '#000000',
  className: '',
  style: {}
}

export default ColorBlock