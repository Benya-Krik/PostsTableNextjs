import Image from 'next/image'
import styles from '../styles/Table.module.scss'
import A from './A'




export const Table = ({currentPageRows, sortData, searchText, className}) => {

    if (currentPageRows.length>0) {
        return (
            <table className={`${styles.table} ${className}`}>
                <thead className={styles.table__head}>
                    <tr>
                        <th className={styles.table__columns} onClick={() => {sortData('userId')}}>Author ids <Image src='/arrow.svg' className={styles.petya} width={12} height={12}></Image></th>
                        <th className={styles.table__columns} onClick={() => {sortData('id')}}>Post id <Image src='/arrow.svg' width={12} height={12}></Image></th>
                        <th className={styles.table__columns} onClick={() => {sortData('title')}}>Post title <Image src='/arrow.svg' width={12} height={12}></Image></th>
                        <th className={styles.table__columns} onClick={() => {sortData('body')}}>Post content <Image src='/arrow.svg' width={12} height={12}></Image></th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageRows.map(post =>
                        <tr className={styles.table__rows} key={post.id}>
                            <td className={styles.table__data}><A href={`/posts/${post.id}`}>#{post.userId}</A></td>
                            <td className={styles.table__data}><A href={`/posts/${post.id}`}>#{post.id}</A></td>
                            <td className={styles.table__data}><A href={`/posts/${post.id}`}>{post.title}</A></td>
                            <td className={styles.table__data}><A href={`/posts/${post.id}`}>{post.body}</A></td>
                        </tr>
                    )}
                </tbody>
            </table>
            )
    } else {
        return (
            <table className={`${styles.table} ${className}`}>
                <thead className={styles.table__head}>
                    <tr>
                        <th className={styles.table__columns} onClick={() => {sortData('userId')}}>Author ids <Image src='/angle-arrow-down_icon-icons.com_73683.svg' width={12} height={12}></Image></th>
                        <th className={styles.table__columns} onClick={() => {sortData('id')}}>Post id <Image src='/angle-arrow-down_icon-icons.com_73683.svg' width={12} height={12}></Image></th>
                        <th className={styles.table__columns} onClick={() => {sortData('title')}}>Post title <Image src='/angle-arrow-down_icon-icons.com_73683.svg' width={12} height={12}></Image></th>
                        <th className={styles.table__columns} onClick={() => {sortData('body')}}>Post content <Image src='/angle-arrow-down_icon-icons.com_73683.svg' width={12} height={12}></Image></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={4}><h2>По запросу {searchText} ничего не найдено.</h2></td>
                    </tr>
                </tbody>
            </table>
            )
    }
  
}

export default Table;
