import MainContainer from "../../components/MainContainer";
import { useRouter } from "next/router";

export default function ({post}) {
    const query = useRouter()

    return (
        <MainContainer>
            <h1>Post <span>{post.id}</span></h1>
            <p>Posts author id: <span>{post.userId}</span></p>
            <p>Posts title: <span>{post.title}</span></p>
            <p>Posts content: <span>{post.body}</span></p>

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