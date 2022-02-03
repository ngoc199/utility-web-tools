import React from 'react';
import styles from '../styles/Home.module.css'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  tooltip?: string
  href?: string
}

const Button: React.FC<Props> = ({ tooltip, href, children, ...rest }) => {

  const [openTooltip, setOpenTooltip] = React.useState<boolean>(false)

  const toggleTooltip = () => {
    setOpenTooltip(true)
    setTimeout(() => {
      setOpenTooltip(false)
    }, 3000)
  }

  const getTooltipStatus = () => {
    return !openTooltip ? styles['tooltip'] : `${styles['tooltip']} ${styles['tooltip--active']}`
  }

  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    rest.onClick && rest.onClick(evt)
    toggleTooltip()
  }

  return !href && (<button {...rest} onClick={handleClick} className={`${styles.btn} ${styles['btn-primary']}`}>
    {children}
    {tooltip &&
      <span className={getTooltipStatus()}>{tooltip}</span>
    }
  </button>) || <a href={href} className={`${styles.btn} ${styles['btn-primary']}`} target='_blank'>{children}</a>
};

export default Button;
