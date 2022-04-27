import {css} from "../../helpers/css";
import {useEffect, useRef} from "react";
import useOnScreen from "../../hooks/useOnScreen";

interface HomeFeatureProps {
  id: string;
  height: number;
  className?: string;
  children?: any;
  onIntersection?: (id: string) => void
}

const HomeFeature = ({id, height, className, children, onIntersection}: HomeFeatureProps) => {
  const ref = useRef(null)
  const isOnScreen = useOnScreen(ref)
  useEffect(() => {
    if (onIntersection && isOnScreen) {
      console.log("isOnScreenRunning", id)
      onIntersection(id)
    }
  }, [isOnScreen, id, onIntersection])
  return <div
    ref={ref}
    id={id}
    className={css("flex", "items-center", "justify-center", "px-0", "md:px-16", className)}
    style={{minHeight: `${height}px`}}
  >
    {children}
  </div>
}

export default HomeFeature
