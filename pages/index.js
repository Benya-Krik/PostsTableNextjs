import MainContainer from '../components/MainContainer'
import styles from '../styles/Home.module.scss'
import mainStyles from '../styles/MainContainer.module.scss'


export default function Home() {
  return (
    <MainContainer title='Homepage'>
      <section className={`${styles.home} ${mainStyles.container}`}>
        <h1 className={styles.home__title}>Hello world!</h1>
        <p className={styles.home__item}>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
        </section>
    </MainContainer>
  )
}
