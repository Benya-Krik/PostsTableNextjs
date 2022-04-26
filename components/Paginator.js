import React from 'react'
import styles from '../styles/Paginator.module.scss'
import A from './A'


export const Paginator = ({pages, currentPage, onNextClick, onPrevClick, isButtonDisabled}) => {
  return (
    <ul className={styles.paginator}>
        <li className={`${styles.paginator__item} ${isButtonDisabled}`} onClick={() =>{onPrevClick()}}><A href="#">«</A></li>
        {pages.map((page) => {
            return (
                <li className={`${styles.paginator__item}`} onClick={() =>{currentPage(page)}} key={page}><A href="#">{page}</A></li>
            );
        })}
        <li className={`${styles.paginator__item} ${isButtonDisabled}`} onClick={() =>{onNextClick()}}><A href="#">»</A></li>
    </ul>
  )
}
export default Paginator;