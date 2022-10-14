import NextLink from "next/link"
import {css} from "../../helpers/css";
import React from "react";
import {GoLinkExternal} from "react-icons/go";

interface LinkProps {
    isExternal?: boolean;
    href: string;
    children?: any;
    type?: LinkType;
    size?: LinkSize;
    bold?: boolean;
    showExternalIcon?: boolean;
    onClick?: () => void;
    block?: boolean;
}

const Link: React.FC<LinkProps> = ({
                                       isExternal,
                                       href,
                                       children,
                                       type = LinkType.Primary,
                                       size = LinkSize.sm,
                                       bold = false,
                                       showExternalIcon,
                                       onClick,
                                       block = false
                                   }: LinkProps) => {
    const styles = css(linkTypeStyles[type], linkSizeStyles[size])
    const conditionalStyles = css({"font-bold": bold, "flex": block, "inline-flex": !block})

    return <>
        {isExternal ? <a
                href={href}
                className={css(styles, "items-center", conditionalStyles)}
                target={isExternal ? "_blank" : "_self"}
                rel={"noreferrer"}
                onClick={onClick}
            >
                {children && children}
                {showExternalIcon && <GoLinkExternal size={15} className={css("ml-2")}/>}
            </a>
            : <NextLink href={href}>
                <a className={css(styles, conditionalStyles)} onClick={onClick}>
                    {children && children}
                </a>
            </NextLink>}
    </>
}

export enum LinkType {
    Primary = "primary",
    Secondary = "secondary",
    Grey = "grey",
    Black = "black",
    White = "white"
}

export enum LinkSize {
    xs = "xs",
    sm = "sm",
    lg = "lg",
    xl = "xl"
}

const baseLinkStyles = css("hover:underline", "hover:cursor-pointer")

const linkTypeStyles = {
    [LinkType.Primary]: css("text-cyan-400", "underline", "hover:text-cyan-500", baseLinkStyles),
    [LinkType.Secondary]: css("text-pixels-yellow-500", baseLinkStyles),
    [LinkType.Grey]: css("text-gray-600", "hover:text-cyan-400", baseLinkStyles),
    [LinkType.Black]: css("text-black", "hover:text-yellow-400"),
    [LinkType.White]: css("text-white", "hover:text-gray-800")
}

const linkSizeStyles = {
    [LinkSize.xs]: css("text-sm"),
    [LinkSize.sm]: css("text-md"),
    [LinkSize.lg]: css("text-lg"),
    [LinkSize.xl]: css("text-2xl")
}


export default Link
