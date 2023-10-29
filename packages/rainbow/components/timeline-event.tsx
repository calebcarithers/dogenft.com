import { ReactNode } from "react";
import classNames from "classnames";

export function TimelineEvent({
  src,
  alt,
  caption,
  className,
}: {
  src?: string;
  alt?: string;
  caption?: ReactNode;
  className?: string;
}) {
  return (
    <figure className={classNames("timeline__event", className)}>
      <img className="timeline__event__image" src={src} alt={alt} />
      <figcaption className="timeline__event__caption">{caption}</figcaption>
    </figure>
  );
}
