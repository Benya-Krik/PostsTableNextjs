import { useState } from "react";

export const SearchForm = ({onSearchSend, currentPage, children}) => {

    const [searchValue, setSearchValue] = useState('')

    return (
        <form>
            <input 
                type={'text'} 
                value={searchValue} 
                onChange={(e)=> {
                    setSearchValue(e.target.value);
                }}
            />

            
            <button onClick={(e)=>{
                e.preventDefault();
                onSearchSend(searchValue)
                currentPage(1)
                }}>{children}</button>
        </form>
    )
}
export default SearchForm;