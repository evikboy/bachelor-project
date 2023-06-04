import React from 'react'
import { truncateString } from '../../utils/truncateString'

import styles from './TagBlock.module.scss'

export const TagBlock = ({ name, description, questionCount }) => {

    return (
        <div className={`${styles.root} d-flex flex-column gap-3`}>
            <div className={`${styles.tag}`}>{name}</div>
            <div> {description ? truncateString(description, 200) : 'Опис тегу відсутній' }</div>
            <div className={`${styles.tag__footer}`}>{questionCount} Питань(ня)</div>
        </div>

    )
}