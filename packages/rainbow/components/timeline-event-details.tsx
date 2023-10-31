import classNames from "classnames";
import { ReactNode } from "react";

export function TimelineEventDetails({
  title = "",
  content = "",
  className = "",
  imageSrc = "",
}: {
  title?: ReactNode;
  content?: ReactNode;
  className?: string;
  imageSrc?: string;
}) {
  return (
    <article className={classNames("timeline__event-details", className)}>
      <h3 className="timeline__event-details__title">{title}</h3>
      <p className="timeline__event-details__content">{content}</p>

      <img src={imageSrc} className={`timeline__event-details__image`} />
    </article>
  );
}
