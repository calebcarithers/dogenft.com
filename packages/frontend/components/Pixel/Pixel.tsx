import {css} from "../../helpers/css";
import React from "react";

export enum PixelSize {
    sm = "sm",
    md = "md",
    lg = "lg",
}

interface PixelProps {
    color: string;
    id: number;
    x: number;
    y: number;
    size?: PixelSize;
    onClick?: Function;
}

const pixelSizes = {
    [PixelSize.sm]: 100,
    [PixelSize.md]: 100,
    [PixelSize.lg]: 220,
}

const Pixel: React.FC<PixelProps> = ({color, id, x, y, size = PixelSize.sm, onClick}) => {
    return <div className={css("inline-block", "relative", "z-10")}>
        <div
            onClick={() => {
                onClick ? onClick(id) : window.open(`https://pixels.ownthedoge.com/px/${id}`, "_blank")
            }}
            className={css("cursor-pointer", "active:translate-x-1", "active:translate-y-1", "relative")}>
            <div style={{height: pixelSizes[size], width: pixelSizes[size], borderWidth: "1px", background: color}}
                 className={css("border-black")}/>
            <div style={{
                width: pixelSizes[size],
                borderLeft: "1px",
                borderRight: "1px",
                borderBottom: "1px",
                borderStyle: "solid"
            }}
                 className={css("text-left", "pl-2", "font-PressStart", "py-1", "bg-pixels-yellow-100", {
                     "text-xxs": size === PixelSize.sm,
                     "text-base": size === PixelSize.md || size === PixelSize.lg,
                 })}>
                ({x},{y})
            </div>
        </div>
        <div className={css("absolute", "bg-black", "w-full", "h-full")} style={{top: 5, right: -5, zIndex: -1}}/>
    </div>
}

export default Pixel;
