import { css } from "@/../dsl/helpers/css";
import { PropsWithChildren } from "react";
import { BsArrowUpRight } from "react-icons/bs";

interface ExternalLinkProps extends PropsWithChildren {
  href: string;
  className?: string;
  iconSize?: number;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  children,
  href,
  className,
  iconSize = 20,
}) => {
  return (
    <a
      href={href}
      target={"_blank"}
      rel={"noreferrer"}
      className={css(
        "group",
        "hover:text-red-600",
        "cursor-pointer",
        "flex",
        "items-center",
        "gap-0.5",
        className
      )}
    >
      <div className={css("grow")}>{children}</div>
      <div
        className={css("inline-block", "mt-1")}
        style={{ width: iconSize, height: iconSize }}
      >
        <div className={css("group-hover:block", "hidden")}>
          <BsArrowUpRight size={iconSize} />
        </div>
      </div>
    </a>
  );
};

export default ExternalLink;
