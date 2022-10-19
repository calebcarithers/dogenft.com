import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Button from '../components/Button/Button'
import ColoredText from '../components/ColoredText/ColoredText'
import { css } from '../helpers/css'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Own The Doge DSL</title>
        <meta name="description" content="Own The Doge DSL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={css("bg-pixels-yellow-100", "flex", "flex-col", "items-center")}>
        <div className={css("font-bold", "text-3xl", "mb-4")}>
          <ColoredText>Own The Doge DSL</ColoredText>
        </div>
        <div className={css("max-w-xl", "w-full", "border-2", "border-pixels-yellow-200", "border-dashed", "p-3")}>
          <Button>test this out!</Button>
        </div>
      </main>
    </div>
  )
}

export default Home
