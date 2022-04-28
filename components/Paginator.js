import React from 'react'
import styles from '../styles/Paginator.module.scss'


export const Paginator = ({pages, currentPage, className, currentPageNumber, onNextClick, onPrevClick, isButtonPrevDisabled, isButtonNextDisabled, activePage}) => {
  return (
    <ul className={`${styles.paginator} ${className}`}>

        <li 
        className={`${styles.paginator__item} ${isButtonPrevDisabled}`} 
        onClick={() =>{onPrevClick()}}
        >
          <button className={styles.paginator__button}>«</button>
        </li>

        {pages.map((page) => {
            return (

                <li 
                className={`${styles.paginator__item} ${(currentPageNumber === page)? activePage : ''}`} 
                onClick={() =>{currentPage(page)}} key={page}
                >

                  <p>{page}</p>

                </li>
            );
        })}

        <li
        className={`${styles.paginator__item} ${isButtonNextDisabled}`}
        onClick={() =>{onNextClick()}}
        >
          <button className={styles.paginator__button}>»</button>
        </li>

    </ul>
  )
}
export default Paginator;