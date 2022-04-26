import MainContainer from '../../components/MainContainer'
import styles from '../../styles/Posts.module.scss'
import butstyles from '../../styles/Paginator.module.scss'

import mainStyles from '../../styles/MainContainer.module.scss'

import A from '../../components/A'
import { useState, useEffect } from 'react'
import Paginator from '../../components/Paginator'
import SearchForm from '../../components/SearchForm'
import Image from 'next/image'


export const Posts = ({posts}) => {

    const [postsData, setPostData] = useState(posts);
    const [directionSort, setDirectionSort] = useState(true);
    const limitCountPage = 10;
    const [totalCountRow, setTotalCountRow] = useState(0);
    const [totalCountPage, setTotalCountPage] = useState(0);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [isButtonDisabled, setButtonDisabled] = useState(butstyles.disabled)
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
    }

    useEffect(() => {



        setTotalCountRow(filtredData.length)
        const getTotalCountPage = Math.ceil(totalCountRow/limitCountPage)
        setTotalCountPage(getTotalCountPage)
    });

    let pages = []
    for (let i = 1; i <= totalCountPage; i++) {
        pages.push(i)
    }
    const onPrevClick = () => {
        if (currentPageNumber< 2) {
            return
        }
        setCurrentPageNumber(currentPageNumber - 1)
    }

    const onNextClick = () => {
        if (currentPageNumber > totalCountPage-1) {
            return
        }
        setCurrentPageNumber(currentPageNumber + 1)
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

            <h1 className={styles.posts__title}>Posts</h1>

            <SearchForm currentPage={currentPage} onSearchSend={onSearchSend}>Search</SearchForm>

            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr className={styles.table__rows}>
                        <th onClick={() => {sortData('userId')}}>Author ids <Image src='/angle-arrow-down_icon-icons.com_73683.svg' width={12} height={12}></Image></th>
                        <th onClick={() => {sortData('id')}}>Post id <Image src='/angle-arrow-down_icon-icons.com_73683.svg' width={12} height={12}></Image></th>
                        <th onClick={() => {sortData('title')}}>Post title <Image src='/angle-arrow-down_icon-icons.com_73683.svg' width={12} height={12}></Image></th>
                        <th onClick={() => {sortData('body')}}>Post content <Image src='/angle-arrow-down_icon-icons.com_73683.svg' width={12} height={12}></Image></th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageRows.map(post =>
                        <tr key={post.id}>
                            <td><A href={`/posts/${post.id}`}>#{post.userId}</A></td>
                            <td><A href={`/posts/${post.id}`}>#{post.id}</A></td>
                            <td><A href={`/posts/${post.id}`}>{post.title}</A></td>
                            <td><A href={`/posts/${post.id}`}>{post.body}</A></td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Paginator isButtonDisabled={isButtonDisabled} onNextClick={onNextClick} onPrevClick={onPrevClick} pages={pages} currentPage={currentPage}></Paginator>
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
