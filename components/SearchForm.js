import { useState } from "react";
import { useEffect } from "react";
import styles from '../styles/SearchForm.module.scss'

export const SearchForm = ({className, onSearchSend, currentPage, placeholder}) => {

    const [searchValue, setSearchValue] = useState('')

    useEffect(()=>{
      onSearchSend(searchValue) 
    });

    return (
        <form className={className}>
            <input
                className={styles.SearchForm__input}
                type={'text'}
                placeholder={placeholder} 
                value={searchValue} 
                onChange={(e)=> {
                    setSearchValue(e.target.value);
                    onSearchSend(searchValue)
                    currentPage(1)
                }}
            />
        </form>
    )
}
export default SearchForm;