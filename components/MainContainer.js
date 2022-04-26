import Head from 'next/head'
import Image from 'next/image'
import A from './A'
import styles from '../styles/MainContainer.module.scss'

export const MainContainer = ({children, title, keywords}) => {
  return (
    <>
        <Head>
            <title>{title}</title>
            <meta keywords={keywords} name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <header className={styles.header}>
            <nav>
                <ul className={styles.header__nav}>
                    <li className={styles.header__item}><A href='/'>Home</A></li>
                    <li className={styles.header__item}><A href='/posts'>Posts</A></li>
                    <li className={styles.header__item}><A href='/faq'>FAQ</A></li>
                </ul>
            </nav>
        </header>

        <main>
            {children}
        </main>
    </>
  )
}

export default MainContainer;