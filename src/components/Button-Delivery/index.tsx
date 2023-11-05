import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { SupportBot } from '../../features'
import styles from './Button-Delivery.module.scss'
import { useState } from 'react'

const ButtonDelivery = () => {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Link to='/products' className={`${styles.btn_delivery}`}>
        <img src='/button_delivery.png' className={`${styles.btn_delivery_img}`} alt='' />
      </Link>
      <Button className={`${styles.btn_bot} right-8 bottom-28`} onClick={showDrawer}>
        <img
          src='https://i.pinimg.com/originals/df/ea/dd/dfeaddf703acf71277dbb1d6d81479b0.gif'
          className={`${styles.btn_delivery_img} object-cover h-full w-full rounded-full`}
          alt=''
        />
      </Button>
      <SupportBot open={open} onClose={onClose} />
    </div>
  )
}

export default ButtonDelivery
