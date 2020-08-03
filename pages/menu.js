import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Menu() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bai Yok Modern Thai Cuisine</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Menu</h1>
      </main>
    </div>
  )
}