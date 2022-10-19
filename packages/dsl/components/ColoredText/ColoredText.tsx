import React, {PropsWithChildren} from "react";
import {objectKeys} from "../../helpers/arrays";
import {css} from "../../helpers/css";

const tailwindconfig = require("../../tailwind.config.cjs")

const dogeColors = tailwindconfig.theme.extend.colors.doge
const dogeColorNames = objectKeys(dogeColors)

interface ColoredTextProps {
  children: string;
  bold?: boolean;
  className?: string;
}

const ColoredText: React.FC<PropsWithChildren<ColoredTextProps>> = ({children, className, bold}) => {
  return <span className={css(className)}>
    {[...children].map((char, index) => {
      const colorName = dogeColorNames[Math.floor(Math.random() * dogeColorNames.length)]
      const color = dogeColors[colorName]
      return <span
        className={css({
          "font-bold": bold
        })}
        key={`nav-item-selection-${char}-${index}`}
        style={{color: color}}>
          {char}
        </span>
    })}
  </span>
}

export default ColoredText
