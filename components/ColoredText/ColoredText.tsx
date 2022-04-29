import React, {PropsWithChildren} from "react";
import {objectKeys} from "../../helpers/arrays";
const tailwindconfig = require("../../tailwind.config")

const dogeColors = tailwindconfig.theme.extend.colors.doge
const dogeColorNames = objectKeys(dogeColors)

interface ColoredTextProps {
    children: string;
}

const ColoredText: React.FC<PropsWithChildren<ColoredTextProps>> = ({children}) => {
    return <div>
        {[...children].map((char, index) => {
            const colorName = dogeColorNames[Math.floor(Math.random() * dogeColorNames.length)]
            const color = dogeColors[colorName]
            return <span
                key={`nav-item-selection-${char}-${index}`}
                style={{color: color}}>
          {char}
        </span>
        })}
    </div>
}

export default ColoredText
