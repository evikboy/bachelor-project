import React from "react"
import { Post } from '../../components/Post'

import styles from './QuestionPage.module.scss'

export const QuestionPage = () => {

    return (
        <div className={`${styles.root}`}>
            <Post isQuestion />

            <h3 style={{ letterSpacing: "0.05em" }} className={`text-center`}>Відповіді</h3>

            <div className={`${styles.reply}`}>
                <input className="textCtrl w-100" />
                <div className={`${styles.send_message} d-flex gap-3 justify-content-end`}>
                    <button className={`btn-default ${styles["btn-cancel"]}`} >Відмінити</button>
                    <button className="btn-default icon-message d-flex align-items-center gap-2">Відправити</button>
                </div>
            </div>

            <Post isAnswer />
            <Post isComment />
        </div>
    )
}