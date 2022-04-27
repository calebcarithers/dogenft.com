import type { NextPage } from 'next'
import Head from 'next/head'
import {css} from "../helpers/css";
import Button from "../components/Button/Button";
import NavItem from "../components/NavItem/NavItem";
import {useCallback, useState} from "react";
import Image from "next/image"
import {vars} from "../environment/vars";
import HomeItems, {navItems} from "../components/Home/HomeItems";

const Home: NextPage = () => {
  const [fullSize, setFullSize] = useState(0)
  const [navSelection, setNavSelection] = useState("doge")

  const containerRef = useCallback<any>((node: HTMLDivElement) => {
    if (node) {
      setFullSize(node.clientHeight)
      window.addEventListener('resize', () => {
        setFullSize(node.clientHeight)
      })
    }
  }, [])

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
            <div className={css("text-4xl", "flex", "flex-col", "gap-10", "px-10")}>
              {navItems.map(item => {
                const isSelected = item.id === navSelection
                return <div key={item.id} className={css("relative", "inline-block", "max-w-max")}>
                  {isSelected && <div className={css("absolute", "text-2xl")} style={{top: "50%", left: -35, transform: "translateY(-50%)"}}>✨</div>}
                  <NavItem isSelected={isSelected} onClick={() => {
                    document.getElementById(item.id)?.scrollIntoView({behavior: "smooth"})
                    // setNavSelection(item.id)
                  }}>
                    {item.title}
                  </NavItem>
                  {isSelected && <div className={css("absolute", "text-2xl")} style={{top: "50%", right: -35, transform: "translateY(-50%)"}}>✨</div>}
                </div>
              })}
            </div>
          </div>
          <div className={css("flex", "flex-col", "items-start", "gap-4", "py-5")}>
            <Button onClick={() => {
              window.open(vars.NEXT_PUBLIC_DISCORD_LINK, '_blank')
            }}>discord</Button>
            <Button onClick={() => {
              window.open(vars.NEXT_PUBLIC_TWITTER_LINK, '_blank')
            }}>twitter</Button>
            <Button>docs</Button>
          </div>
        </div>
        <div className={css("flex", "justify-center")}>
          <div className={css("border-grey", "border-dashed", "col-span-1")} style={{width: "1px", borderWidth: "1px"}}/>
        </div>
        <div className={css("col-span-8", "text-4xl", "overflow-x-hidden", "text-center")} ref={containerRef}>
          <div style={{maxHeight: "300px"}}>
            <HomeItems height={fullSize} onIntersection={(id) => setNavSelection(id)}/>
          </div>
        </div>
      </main>

      <footer className={css("grow-0", "flex", "justify-between", "mt-10")}>
        <Image src={"/pleasrlogo.svg"} height={40} width={100}/>
        {/*<div>✨ pleasr ✨</div>*/}
        <div>more stuff here</div>
      </footer>
    </div>
  )
}

export default Home
