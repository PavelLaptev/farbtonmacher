import styles from './styles.module.scss'

interface Props {
  color: string
}

const ColorBlock: React.FC<Props> = (props) => {
  return (
    <div className={styles.colorBlock} style={{ backgroundColor: props.color }}></div>
  )
}

ColorBlock.defaultProps = {
  color: '#000000'
}

export default ColorBlock