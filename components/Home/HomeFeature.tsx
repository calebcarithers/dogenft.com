import {css} from "../../helpers/css";

interface HomeFeatureProps {
  id: string;
  height: number;
  className?: string;
  children?: any
}

const HomeFeature = ({id, height, className, children}: HomeFeatureProps) => {
  return <div
    id={id}
    className={css("flex", "items-center", "justify-center", "text-3xl", className)}
    style={{height: `${height}px`}}
  >
    {children}
  </div>
}

export default HomeFeature
