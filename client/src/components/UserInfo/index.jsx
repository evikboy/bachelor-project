import React from "react"
import { Link } from "react-router-dom"

import styles from './UserInfo.module.scss'

export const UserInfo = ({username, additionalText , avatarUrl}) => {
    return (
        <div className={`${styles.root} d-flex gap-2 align-items-center`}>
            <Link><img src="/images/ds.jpg" className={`${styles.avatar} rounded-circle`} alt="avatar"/></Link>
            <div className={`${styles.user_details} d-flex flex-column`}>
                <span className={`${styles.user_name}`}><Link>@{username}</Link></span>
                <span className={`${styles.additional}`}>{additionalText}</span>
            </div>
        </div>
    )
}