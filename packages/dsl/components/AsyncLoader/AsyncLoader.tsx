import { PropsWithChildren, ReactNode } from "react";
import { css } from "../../helpers/css";

interface AsyncLoaderProps {
    isLoading: boolean;
    hasData?: boolean;
    renderNoData?: () => ReactNode;
    renderLoader?: () => ReactNode
}

const AsyncLoader: React.FC<PropsWithChildren<AsyncLoaderProps>> = ({
    isLoading,
    hasData,
    children,
    renderLoader,
    renderNoData,
}) => {
    if (isLoading) {
        if (renderLoader) {
            return <>{renderLoader()}</>
        }
        return <>
            {new Array(6).fill(undefined).map(item => <div className={css("animate-pulse", "h-[60px]", "bg-pixels-yellow-200", "rounded-sm", "shrink-0")} />)}
        </>
    } else if (hasData) {
        return <>{children}</>
    } 
    
    if (renderNoData) {
        return <>{renderNoData()}</>
    } 
    return <div className={css("text-xl")}>
        No data found!
    </div>
}

export default AsyncLoader
