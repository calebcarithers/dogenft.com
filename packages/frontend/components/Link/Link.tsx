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
  showExternalIcon?: boolean
}

const Link: React.FC<LinkProps> = ({isExternal, href, children, type = LinkType.Primary, size = LinkSize.sm, bold = false, showExternalIcon}: LinkProps) => {
  const styles = css(linkTypeStyles[type], linkSizeStyles[size])

  return <>
    {isExternal ? <a
      href={href}
      className={css(styles, "inline-flex", "items-center", {"font-bold": bold})}
      target={isExternal ? "_blank" : "_self"}
      rel={"noreferrer"}
    >
      {children && children}
      {showExternalIcon && <GoLinkExternal size={15} className={css("ml-2")}/>}
    </a>
    : <NextLink href={href}>
        <a className={css(styles, "inline-block", {"font-bold": bold})}>
          {children && children}
        </a>
      </NextLink>}
  </>
}

export enum LinkType {
  Primary = "primary",
  Secondary = "secondary",
  Grey = "grey",
  Black = "black"
}

export enum LinkSize {
  xs= "xs",
  sm = "sm",
  lg = "lg",
  xl = "xl"
}

const baseLinkStyles = css("hover:underline", "hover:cursor-pointer")

const linkTypeStyles = {
  [LinkType.Primary]: css("text-cyan-400", "underline", "hover:text-cyan-500", baseLinkStyles),
  [LinkType.Secondary]: css("text-pixels-yellow-400", "font-bold", baseLinkStyles),
  [LinkType.Grey]: css("text-gray-600", "hover:text-cyan-400", baseLinkStyles),
  [LinkType.Black]: css("text-black", "hover:text-yellow-400")
}

const linkSizeStyles = {
  [LinkSize.xs]: css("text-sm"),
  [LinkSize.sm]: css("text-md"),
  [LinkSize.lg]: css("text-lg"),
  [LinkSize.xl]: css("text-2xl")
}


export default Link
