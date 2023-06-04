import React from 'react'
import { TagList } from '../Post/TagList'
import dateFormatter from '../../utils/dateFormatter'

import { Link } from 'react-router-dom'
import { BiUpvote } from 'react-icons/bi'
import { BiDownvote } from 'react-icons/bi'

import styles from './TablePost.module.scss'

export const TablePost = ({ id, title, votes, answersCount, views, tags, createdAt, user, voteType, targetType }) => {
    return (
        <div className={`${styles.root} `}>
            <div className={`${styles.table_post} d-flex flex-column gap-2`}>
                <div className='d-flex align-items-center gap-3' style={{fontSize: '13px', color: 'rgb(148, 148, 148)'}}>

                    {voteType && (
                        <div className='d-flex gap-2 align-items-center'> 
                            <span className={`${styles.typeTarget}`}>{targetType === 'Answer' ? 'A' : 'Q'}</span>
                            {voteType === 'Upvote' ? <BiUpvote color='#009cff' size={18}/> : <BiDownvote color='#ff7070' size={18}/>}
                        </div>   
                    )}


                    <div className='d-flex gap-2 align-items-center' style={{ borderBottom: '1px solid rgb(34, 142, 93)'}}> {votes !== undefined ? votes + ' голосів' : ''}</div>

                    <div className='d-flex gap-2 align-items-center' style={{ borderBottom: '1px solid rgb(34, 142, 93)'}}> {answersCount !== undefined ? answersCount + ' відповідей' : ''}</div>
                    <div className='d-flex gap-2 align-items-center' style={{ borderBottom: '1px solid rgb(34, 142, 93)'}}> {views !== undefined ? views + ' переглядів' : ''}</div>
                </div>

                <div>
                    <Link to={`/questions/${id}`}><h5>{title}</h5></Link>
                </div>

                <div className='d-flex align-items-center justify-content-between'>
                    <TagList tags={tags} />
                    <div className='d-flex align-items-end gap-2'>
                        <img src='/images/ds.jpg' style={{width: '30px', height: '30px', borderRadius: '5px'}} alt='avatar' />
                        <div style={{fontSize: '12px', color: 'rgb(148, 148, 148)'}}>{dateFormatter(createdAt)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}