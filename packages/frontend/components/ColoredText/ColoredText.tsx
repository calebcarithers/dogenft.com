import React, {PropsWithChildren} from "react";
import {objectKeys} from "../../helpers/arrays";
import tailwindconfig from "../../tailwind.config"
import {css} from "../../helpers/css";

const dogeColors = tailwindconfig.theme.extend.colors.doge
const dogeColorNames = objectKeys(dogeColors)

interface ColoredTextProps {
    children: string;
    bold?: boolean
}

const ColoredText: React.FC<PropsWithChildren<ColoredTextProps>> = ({children, bold}) => {
    return <div>
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
    </div>
}

export default ColoredText
