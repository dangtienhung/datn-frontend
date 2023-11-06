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
    <div className=''>
      <div className=''>
        <Button className={`${styles.btn_bot}`} onClick={showDrawer}>
          <img
            src='https://media4.giphy.com/media/h59kTCNfi8IJnteCfI/giphy.gif?cid=6c09b952xmtkbm0w0xsd0zzhbl9nb5c6wq5i4r926dc8utgr&ep=v1_gifs_search&rid=giphy.gif&ct=g'
            className={`${styles.btn_delivery_img} object-cover h-full w-full rounded-full`}
            alt=''
          />
          <SupportBot open={open} onClose={onClose} />
        </Button>
      </div>
      <Link to='/products' className={`${styles.btn_delivery}`}>
        <img src='/button_delivery.png' className={`${styles.btn_delivery_img}`} alt='' />
      </Link>
    </div>
  )
}

export default ButtonDelivery
