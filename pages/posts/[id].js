import MainContainer from "../../components/MainContainer";
import MainStyles from '../../styles/MainContainer.module.scss'
import styles from '../../styles/PostPage.module.scss'
import A from "../../components/A";
import { useRouter } from "next/router";
// eslint-disable-next-line import/no-anonymous-default-export
export default function Post ({post}) {

    const {query} = useRouter()

    return (
        <MainContainer title={`Post number ${query.id}`}>
            <section className={`${MainStyles.container} ${styles.post}`}>

                <h1 className={styles.post__title}>Post number <span>{post.id}</span></h1>

                <div className={styles.post__item}>
                    <p>Posts author id: <span>{post.userId}</span></p>
                    <p>Posts title: <span>{post.title}</span></p>
                    <p>Posts content: <span>{post.body}</span></p>
                </div>

                <A href={'/posts'} className={styles.post__button}>Back to all posts</A>
            </section>

        </MainContainer>
    );
}
export async function getServerSideProps({params}) {
    const response = await fetch (`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    const post = await response.json()
    return {
        props: {post}
    }
}