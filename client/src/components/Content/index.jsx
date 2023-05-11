import React from "react"

import styles from './Content.module.scss'

export const Content = ({ children, isAuthPage  }) => {
    return (
        <div className= {`${styles.root} ${isAuthPage ? styles["no-sidebar"] : ''} d-flex justify-content-between h-100`}>
            <div className={`${styles.content__main} d-flex flex-column mx-auto`}>
                {children}
            </div>
        </div>
    )
}