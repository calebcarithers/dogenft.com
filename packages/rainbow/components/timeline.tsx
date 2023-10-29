import { css } from "dsl/helpers/css";
import { ReactNode } from "react";
import { TimelineEvent } from "./timeline-event";
import { TimelineEventDetails } from "./timeline-event-details";
import { useTranslation } from "../hooks/use-translation";

export interface TimelineItem {
  id: string;
  eventImageSrc: string;
  eventCaption: ReactNode;
  articleImageSrc: string;
  articleContent: string;
  articleTitle: string;
  className?: string;
}

const isOddNumber = (x: number) => x % 2 !== 1;

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="timeline__container">
      <div className="timeline__line" />

      {items.map((item, i) => (
        <div className={`timeline__row ${item.className}`} key={item.id}>
          <TimelineEvent
            src={item.eventImageSrc}
            alt="decorative"
            className={`timeline__item--middle timeline__event--caption-${
              isOddNumber(i) ? "right" : "left"
            }`}
            caption={item.eventCaption}
          />

          <TimelineEventDetails
            title={item.articleTitle}
            content={item.articleContent}
            imageSrc={item.articleImageSrc}
            className={`timeline__item--${isOddNumber(i) ? "left" : "right"}`}
          />
        </div>
      ))}
    </div>
  );
}
