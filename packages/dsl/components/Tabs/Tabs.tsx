import { css } from "../../helpers/css";

interface TabsProps {
  items: { key: string, name: string }[];
  className?: string;
  onClick?: (key: string) => void;
  selected?: string
}

export const Tabs: React.FC<TabsProps> = ({items, className, onClick, selected}) => {
  return <div className={css("flex", "gap-4", className)}>
    {items.map(item => <span className={css("cursor-pointer", "underline-offset-4", {
      "underline": selected === item.key
    })} onClick={() => {
      if (onClick) {
        onClick(item.key)
      }
    }}>{item.name}</span>)}
  </div>
}