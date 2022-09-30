import {css} from "../../helpers/css";
import Image from "next/image";
import Link, {LinkSize, LinkType} from "../Link/Link";
import React from "react";
import {actionLinks, tradeLinks, readLinks, socialLinks} from "./Links";
import {useRouter} from "next/router";

export const Footer = () => {
    const router = useRouter()
    const isFraction = router.pathname === "/fraction"
    return <footer className={css("grow-0", "py-4", "block", "mt-16")}>
        <div className={css("flex")}>
            <Image alt={"pleasr logo"} src={isFraction ? "/images/pleasrwhite.svg" : "/images/pleasrlogo.svg"} height={51} width={127.5}/>
        </div>
        <div className={css("grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-2", "xl:grid-cols-4", "gap-x-10", "gap-y-8", "xl:gap-y-0")}>
            <FooterItem title={"Talk"} items={socialLinks}/>
            <FooterItem title={"Read"} items={readLinks}/>
            <FooterItem title={"Do"} items={actionLinks}/>
            <FooterItem title={"Acquire"} items={tradeLinks}/>
        </div>
    </footer>
}

interface FooterItemProps {
    title: string;
    items: {title: string, link: string}[]
}


const FooterItem = ({title, items}: FooterItemProps) => {
    const router = useRouter()
    console.log('debug:: router', router)

    const isFractionPage = router.pathname === "/fraction"
    const classNames = isFractionPage ? css("border-white", "text-white") : css("border-pixels-yellow-200", "text-gray-600")

    return <div className={css("text-left")}>
        <div className={css("font-bold", "border-b-2", "border-dashed", "mb-2",
            "inline-block", "text-sm", "font-bold", classNames)}>
            {title}
        </div>
        <div className={css("grid", "grid-rows-3", "grid-flow-col", "gap-x-2", "font-normal")}>
            {items.map(item => <Link key={item.link} size={LinkSize.xs} type={isFractionPage ? LinkType.White : LinkType.Grey} isExternal href={item.link}>{item.title}</Link> )}
        </div>
    </div>
}
