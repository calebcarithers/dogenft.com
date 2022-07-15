import {vars} from "../environment/vars";

export const pageView = (url: string) => {
    if (window !== undefined) {
        //@ts-ignore
        window.gtag("config", vars.NEXT_PUBLIC_GA_ID, {
            page_path: url
        })
    }
}

export const event = ({action, params}: { action: any, params: any }) => {
    if (window !== undefined) {
        console.log("debug:: fire event", action, params)
        //@ts-ignore
        window.gtag("event", action, params)
    }
}

