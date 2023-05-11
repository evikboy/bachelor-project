import React from "react"

import styles from './Post.module.scss'

export const VoteButtons = ({ children }) => {
    return (
        <div className="d-flex gap-1">
            <button className={`${styles["btn-vote"]} ${styles.up} btn-default icon-up d-flex align-items-center gap-2`}><span className="position-relative">Голос · 1.6K</span></button>
            <button className={`${styles["btn-vote"]} ${styles.down} btn-default icon-down d-flex align-items-center`}></button>
        </div>
    )
}



