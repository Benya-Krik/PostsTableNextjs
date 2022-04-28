import Link from 'next/link'
import styles from '../styles/A.module.scss'

export const A = ({href, children, className}) => {
  return (
    <Link href={href}>
        <a className={`${styles.link} ${className}`}>{children}</a>
    </Link>
  )
}

export default A;