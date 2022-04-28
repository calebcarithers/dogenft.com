import {css} from "../helpers/css";
import {PropsWithChildren} from "react";
import Image from "next/image";
import Link, {LinkSize, LinkType} from "../components/Link/Link";

const AppLayout: React.FC<PropsWithChildren<{}>> = ({children}) => {
  return <div className={css("bg-white", "text-black", "grow", "flex", "flex-col", "p-4")}>
    {children}
    <footer className={css("grow-0", "flex", "justify-between", "py-4")}>
      <Image alt={"pleasr logo"} src={"/pleasrlogo.svg"} height={40} width={100}/>
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
  </div>
}

interface FooterItemProps {
  title: string;
  items: {title: string, link: string}[]
}

const FooterItem = ({title, items}: FooterItemProps) => {
  return <div>
    <div className={css("font-bold", "border-b-2", "border-dashed", "border-gray-200", "mb-2", "text-gray-600", "inline-block", "text-sm")}>{title}</div>
    <div className={css("grid", "grid-rows-2", "grid-flow-col", "gap-x-4")}>
      {items.map(item => <Link size={LinkSize.xs} type={LinkType.Grey} isExternal href={item.link}>{item.title}</Link> )}
    </div>
  </div>
}


export default AppLayout
