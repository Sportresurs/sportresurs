import React from "react";
import classNames from 'classnames'
import styles from './styles.module.scss'

export default function Button({children,variant, className, ...rest}){
    const combineClassName = classNames(styles.button,styles[`button-${variant}`],className)
    return(
        <button className={combineClassName} {...rest}>{children}</button>
    )
}