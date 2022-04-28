import MainContainer from '../../components/MainContainer'
import styles from '../../styles/Posts.module.scss'
import paginatorStyles from '../../styles/Paginator.module.scss'
import mainStyles from '../../styles/MainContainer.module.scss'
import { useState, useEffect } from 'react'
import Paginator from '../../components/Paginator'
import SearchForm from '../../components/SearchForm'
import Table from '../../components/Table'


export const Posts = ({posts}) => {

    const [postsData, setPostData] = useState(posts);
    const [directionSort, setDirectionSort] = useState(true);
    const limitCountPage = 10;
    const [totalCountRow, setTotalCountRow] = useState(0);
    const [totalCountPage, setTotalCountPage] = useState(0);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [isButtonPrevDisabled, setButtonPrevDisabled] = useState()
    const [isButtonNextDisabled, setButtonNextDisabled] = useState()
    const [activePage, setActivePage] = useState()
    const [searchText, setSearchText] = useState('')

    const onSearchSend = (text) => {
        setSearchText(text)
    }

    const getFiltredData = () => {
        if (!searchText) {
            return postsData
        } else {
            return postsData.filter(
                post => {
                    return (post.body.toString().toLowerCase().includes(searchText.toLowerCase())
                    || post.userId.toString().toLowerCase().includes(searchText.toLowerCase())
                    || post.id.toString().toLowerCase().includes(searchText.toLowerCase())
                    || post.title.toString().toLowerCase().includes(searchText.toLowerCase())
                    )
                }
            )
        }   
        
    }

    const filtredData = getFiltredData();

    const lastPageRow = currentPageNumber * limitCountPage;
    const firstPageRow = lastPageRow - limitCountPage;
    const currentPageRows = filtredData.slice(firstPageRow, lastPageRow);

    const currentPage = (page) => {
        setCurrentPageNumber(page)
        setActivePage(paginatorStyles.active)

        if (page < 2) {
            setButtonPrevDisabled(paginatorStyles.disabled)
            setButtonNextDisabled()
        } else if (page === totalCountPage){
            setButtonNextDisabled(paginatorStyles.disabled)
            setButtonPrevDisabled()
        } else {
            setButtonPrevDisabled()
            setButtonNextDisabled()
        }

    }

    useEffect(() => {

        setTotalCountRow(filtredData.length)
        const getTotalCountPage = Math.ceil(totalCountRow/limitCountPage)
        setTotalCountPage(getTotalCountPage)

        if (currentPageNumber == totalCountPage){
            setButtonNextDisabled(paginatorStyles.disabled)
        } else {
            setButtonNextDisabled()
        }

        if (currentPageRows<1) {
            setButtonNextDisabled(paginatorStyles.disabled)
        }
    });

    useEffect(()=> {
        currentPage(currentPageNumber)
    },[currentPageNumber])

    let pages = []
    for (let i = 1; i <= totalCountPage; i++) {
        pages.push(i)
    }
    const onPrevClick = () => {
        if (currentPageNumber ==2){
            setButtonPrevDisabled(paginatorStyles.disabled)
            setCurrentPageNumber(currentPageNumber - 1)
        } else {
            setCurrentPageNumber(currentPageNumber - 1)
            setButtonNextDisabled()
        }
    }

    const onNextClick = () => {
        if (currentPageNumber == totalCountPage){
            setButtonNextDisabled(paginatorStyles.disabled)
        } else {
            setCurrentPageNumber(currentPageNumber + 1)
            setButtonPrevDisabled()
        }
    }

    

    const sortData = (field) => {
        const copyPosts = postsData.concat();

        if (directionSort) {
            const sortPosts = copyPosts.sort((a, b) => {return a[field] > b[field] ? 1 : -1})
            setPostData(sortPosts)
        } else {
            const sortPosts = copyPosts.reverse((a, b) => {return a[field] > b[field] ? 1 : -1})
            setPostData(sortPosts)
        }
        setDirectionSort(!directionSort)
    }

  return (
    <MainContainer title='Posts'>

        <section className={`${styles.posts} ${mainStyles.container}`}>

            <h1 className={styles.posts__title}>Posts page</h1>

            <SearchForm className={styles.posts__form} 
                placeholder={'Search in all columns'} 
                currentPage={currentPage} 
                onSearchSend={onSearchSend}
            >
            </SearchForm>

            <Table className={styles.posts__table}
                searchText={searchText} 
                currentPageRows={currentPageRows} 
                sortData={sortData}
            >
            </Table>

            <Paginator className={styles.posts__paginator}
                currentPageNumber={currentPageNumber}
                activePage={activePage}
                isButtonNextDisabled={isButtonNextDisabled} 
                isButtonPrevDisabled={isButtonPrevDisabled} 
                onNextClick={onNextClick} onPrevClick={onPrevClick} 
                pages={pages} currentPage={currentPage}
            >
            </Paginator>
        </section>

    </MainContainer>  
  )
}

export default Posts;

export async function getStaticProps(context) {
    const response = await fetch ('https://jsonplaceholder.typicode.com/posts')
    const posts = await response.json()
    return {
        props: {posts}
    }
}
