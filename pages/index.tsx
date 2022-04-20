import type { NextPage } from 'next'
import Head from 'next/head'
import {css} from "../helpers/css";
import Button from "../components/Button/Button";

const Home: NextPage = () => {
  return (
    <div className={css("bg-white", "text-black", "grow", "flex", "flex-col", "p-3")}>
      <Head>
        <title>The Doge NFT</title>
        <meta name="description" content="The Doge NFT"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={css("grow", "font-bold", "grid", "grid-cols-12")}>
        <div className={css("flex", "flex-col", "justify-between", "col-span-3")}>
          <div className={css("flex", "items-center", "justify-center", "grow")}>
            <div className={css("text-4xl")}>
              <div className={css("mb-12")}>Doge</div>
              <div className={css("mb-12")}>The Doge NFT</div>
              <div className={css("mb-12")}>$DOG</div>
              <div className={css("mb-12")}>DAOge</div>
              <div>Bark Tank</div>
            </div>
          </div>
          <div className={css("flex", "flex-col", "items-start", "gap-4", "py-5")}>
            <Button>discord</Button>
            <Button>twitter</Button>
            <Button>docs</Button>
          </div>
        </div>
        <div className={css("flex", "justify-center")}>
          <div className={css("border-grey", "border-dashed", "col-span-1")} style={{width: "1px", borderWidth: "1px"}}/>
        </div>
        <div className={css("flex", "justify-center", "items-center", "col-span-8")}>
          this is doge content
        </div>
      </main>

      <footer className={css("grow-0", "flex", "justify-between", "mt-10")}>
        <div>pleasr logo</div>
        <div>more stuff here</div>
      </footer>
    </div>
  )
}

export default Home
