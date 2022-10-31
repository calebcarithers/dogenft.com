import type { NextPage } from 'next'
import Head from 'next/head'
import BottomSheetDemo from '../components/BottomSheet/BottomSheet.demo'
import ColoredText from '../components/ColoredText/ColoredText'
import ToastDemo from '../components/Toast/Toast.demo'
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

      <main className={css("bg-pixels-yellow-100", "flex", "flex-col", "items-center", "gap-6")}>
        <div className={css("font-bold", "text-3xl", "mb-4")}>
          <ColoredText>Own The Doge DSL</ColoredText>
        </div>
        <ToastDemo/>
        <BottomSheetDemo/>
      </main>
    </div>
  )
}

export default Home
