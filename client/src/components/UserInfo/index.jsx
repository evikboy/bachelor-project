import React from "react"
import { Link } from "react-router-dom"

import styles from './UserInfo.module.scss'

export const UserInfo = () => {
    return (
        <div className={`${styles.root} d-flex gap-2 align-items-center`}>
            <Link><img src="/images/ds.jpg" className={`${styles.avatar} rounded-circle`} alt="avatar"/></Link>
            <div className={`${styles.user_details} d-flex flex-column`}>
                <span className={`${styles.user_name}`}><Link>@Yaroslav</Link></span>
                <span className={`${styles.additional}`}>12 November 2020 19:35</span>
            </div>
        </div>
    )
}