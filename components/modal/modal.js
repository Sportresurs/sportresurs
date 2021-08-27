import React, {useEffect} from 'react'
import styles from './modal.module.scss'
import classNames from "classnames"

const ESC_KEYCODE = 27
const Modal = ({children, visible, onClose}) => {
  useEffect(() => {
    const handleWindowKeydown = (e) => {
      if (e.keyCode === ESC_KEYCODE){
        handleClose()
      }
    }
    window.addEventListener('keydown', handleWindowKeydown)
    return () => window.removeEventListener('keydown', handleWindowKeydown)
  },[visible])

  const wrapperClasses = classNames(styles.modal,
    {
      [styles.active]: visible
    }
  )

  const handleContentClick = (e) => {
    e.stopPropagation()
  }
  const handleClose = () => {
    onClose()
  }
  return (
    visible ?
      <div className = {wrapperClasses}>
        <div className = {styles.modal_content} onClick = {handleContentClick}>
          <button className = {styles.btn_close} onClick = {handleClose}>X</button>
          {children}
        </div>
      </div>
      : null
  )
}

export default Modal;