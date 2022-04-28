import {css} from "../helpers/css";
import {PropsWithChildren, useContext, useState} from "react";
import Image from "next/image";
import Link, {LinkSize, LinkType} from "../components/Link/Link";
import {navItems} from "../components/Home/HomeItems";
import NavItem from "../components/NavItem/NavItem";
import Button from "../components/Button/Button";
import {vars} from "../environment/vars";
import React from "react"

const NavContext = React.createContext<any>("doge")
const NavProvider = NavContext.Provider
export const useNavContext = () => useContext(NavContext)

const HomeLayout: React.FC<PropsWithChildren<{}>> = ({children}) => {
  const [navSelection, setNavSelection] = useState("doge")
  return <div className={css("bg-white", "text-black", "grow", "flex", "flex-col", "p-4")}>
    <NavProvider value={[navSelection, setNavSelection]}>
      <main className={css("grow", "font-bold", "flex", "flex-col", "md:grid", "grid-cols-12")}>
        <Nav/>
        <Divider/>
        {children}
      </main>
    </NavProvider>
  </div>
}

const Nav = () => {
  const [selection] = useNavContext()
  return <div className={css("flex", "flex-col", "justify-between", "col-span-2", "sticky")}>
    <div className={css("flex", "items-center", "justify-center", "grow", "border-b-2", "md:border-b-0", "border-grey-400", "border-dashed")}>
      <div className={css("text-3xl", "flex", "md:flex-col", "gap-10", "px-10",)}>
        {navItems.map(item => {
          const isSelected = item.id === selection
          return <div key={item.id} className={css("relative", "md:inline-block", "max-w-max", "mb-3", "md:mb-0", {"hidden": !isSelected})}>
            {isSelected && <div className={css("absolute", "text-2xl")} style={{top: "50%", left: -35, transform: "translateY(-50%)"}}>✨</div>}
            <NavItem isSelected={isSelected} onClick={() => {
              document.getElementById(item.id)?.scrollIntoView({behavior: "smooth"})
              window.history.replaceState({ ...window.history.state, as: `/?wow=${item.id}`, url: `/?wow=${item.id}` }, '', `/?wow=${item.id}`);
            }}>
              {item.title}
            </NavItem>
            {isSelected && <div className={css("absolute", "text-2xl")} style={{top: "50%", right: -35, transform: "translateY(-50%)"}}>✨</div>}
          </div>
        })}
      </div>
    </div>
    <div className={css("hidden", "md:flex", "md:flex-col", "items-start", "gap-4", "py-5")}>
      <Button onClick={() => {
        window.open(vars.NEXT_PUBLIC_DISCORD_LINK, '_blank')
      }}>discord</Button>
      <Button onClick={() => {
        window.open(vars.NEXT_PUBLIC_TWITTER_LINK, '_blank')
      }}>twitter</Button>
      <Button>docs</Button>
    </div>
  </div>
}

const Divider = () => {
  return <div className={css("hidden", "md:flex", "justify-center")}>
    <div className={css("border-grey", "border-dashed", "col-span-1")} style={{width: "1px", borderWidth: "1px"}}/>
  </div>
}

export const Footer = () => {
  return <footer className={css("grow-0", "py-4", "block", "mt-16")}>
    <div className={css("flex")}>
      <Image alt={"pleasr logo"} src={"/pleasrlogo.svg"} height={51} width={127.5}/>
    </div>
    <div className={css("grid", "grid-cols-3", "gap-x-20")}>
      <FooterItem title={"Talk"} items={[
        {title: "Twitter", link: "https://twitter.com/ownthedoge"},
        {title: "Discord", link: "https://discord.com/invite/thedogenft"},
        {title: "Telegram", link: "https://t.me/ownthedoge"},
        {title: "Reddit", link: "https://www.reddit.com/r/ownthedoge/"},
        {title: "Youtube", link: "https://www.youtube.com/channel/UCSKWuhABdkFJ4UpjvlnOrNg"},
        {title: "Coingecko", link: "https://www.coingecko.com/en/coins/the-doge-nft"}
      ]}/>
      <FooterItem title={"Read"} items={[
        {title: "Whitepaper", link: "https://pleasr.mirror.xyz/7hpdJOWRzQx2pmCA16MDxN2FiA3eY6dwcrnEtXKnCJw"},
        {title: "What?", link: "https://www.coingecko.com/en/coins/the-doge-nft"},
        {title: "Blog", link: "https://medium.com/the-doge-times"}
      ]}/>
      <FooterItem title={"Do"} items={[
        {title: "Pixels", link: "https://pixels.thedao.ge/"},
        {title: "Fractional", link: "https://fractional.art/vaults/the-doge-nft"}
      ]}/>
    </div>
  </footer>
}

interface FooterItemProps {
  title: string;
  items: {title: string, link: string}[]
}

const FooterItem = ({title, items}: FooterItemProps) => {
  return <div className={css("text-left")}>
    <div className={css("font-bold", "border-b-2", "border-dashed", "border-gray-200", "mb-2", "text-gray-600", "inline-block", "text-sm")}>{title}</div>
    <div className={css("grid", "grid-rows-2", "grid-flow-col", "gap-x-4")}>
      {items.map(item => <Link size={LinkSize.xs} type={LinkType.Grey} isExternal href={item.link}>{item.title}</Link> )}
    </div>
  </div>
}


export default HomeLayout
