import {css} from "../../helpers/css";
import {PropsWithChildren, useContext, useState} from "react";
import React from "react"
import Nav, {NavProvider} from "./Nav";
import { motion } from "framer-motion";
import Button from "../../components/Button/Button";

const HomeLayout: React.FC<PropsWithChildren<{}>> = ({children}) => {
    const [navSelection, setNavSelection] = useState("doge")
    return <div className={css("text-black", "grow", "flex", "flex-col", "px-4", "md:py-4", "py-0")}>
        <NavProvider value={[navSelection, setNavSelection]}>
            <main className={css("grow", "flex", "flex-col", "md:grid", "grid-cols-12", "z-10", "relative")}>
                <Nav/>
                <Divider/>
                {children}
            </main>
        </NavProvider>
    </div>
}

const Divider = () => {
    return <div className={css("hidden", "md:flex", "justify-center")}>
        <div className={css("border-pixels-yellow-200", "border-dashed", "col-span-1")} style={{width: "1px", borderWidth: "1px"}}/>
    </div>
}

export const Background = () => {
    return <div className={css("hidden", "md:flex", "absolute", "w-full", "h-full", "left-0", "top-0", "justify-between", "flex-col")} style={{zIndex: -1}}>
        <MovingText className={css("text-meme-red")}>very dog</MovingText>
        <MovingText className={css("text-meme-green")}>wow</MovingText>
        <MovingText className={css("text-meme-yellow")}>so scare</MovingText>
        <MovingText className={css("text-meme-green")}>much rare</MovingText>
        <MovingText className={css("text-meme-red")}>what r you doing</MovingText>
        <MovingText className={css("text-meme-green")}>many pixel</MovingText>
        <MovingText className={css("text-meme-green")}>very fractional</MovingText>
    </div>
}

const MovingText: React.FC<PropsWithChildren<{className?: string, children: string}>> = ({children, className}) => {
    const [delay] = useState(Math.random() * 150)
    return <motion.div
        className={css("flex", "text-2xl", "z-0", "font-bold", "opacity-70", className)}
        animate={{
            x: ["100%", "-100%"],
            padding: "3px 0px"
        }}
        transition={{
            x: {duration: 60 * 2, repeat: Infinity, ease: "linear", repeatType: "loop"},
            delay
        }}>
        {children}
    </motion.div>
}


export default HomeLayout;
