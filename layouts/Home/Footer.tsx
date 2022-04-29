import {css} from "../../helpers/css";
import Image from "next/image";
import Link, {LinkSize, LinkType} from "../../components/Link/Link";
import React from "react";

export const Footer = () => {
    return <footer className={css("grow-0", "py-4", "block", "mt-16")}>
        <div className={css("flex")}>
            <Image alt={"pleasr logo"} src={"/pleasrlogo.svg"} height={51} width={127.5}/>
        </div>
        <div className={css("grid", "grid-cols-1", "sm:grid-cols-3", "gap-x-20", "gap-y-8", "sm:gap-y-0")}>
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
        <div className={css("font-bold", "border-b-2", "border-dashed", "border-gray-200", "mb-2", "text-gray-600",
            "inline-block", "text-sm", "font-bold")}>
            {title}
        </div>
        <div className={css("grid", "grid-rows-2", "grid-flow-col", "gap-x-2", "font-normal")}>
            {items.map(item => <Link size={LinkSize.xs} type={LinkType.Grey} isExternal href={item.link}>{item.title}</Link> )}
        </div>
    </div>
}