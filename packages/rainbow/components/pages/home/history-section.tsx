import classNames from "classnames";
import { Timeline, TimelineItem } from "../../timeline";
import { useTranslation } from "../../../hooks/use-translation";

export function HistorySection({ className }: { className?: string }) {
  const { translations } = useTranslation();

  const historyTimelineItems: TimelineItem[] = [
    {
      id: "photograph",
      eventImageSrc: "./images/rainbow/timeline-events/2010.png",
      eventCaption: (
        <>
          <span>2</span>
          <span>0</span>
          <span>1</span>
          <span>0</span>
        </>
      ),
      articleImageSrc: "./images/rainbow/decoration/doge-camera.png",
      articleContent: translations.timeline.articles.photograph.content,
      articleTitle: translations.timeline.articles.photograph.title,
      className: "photograph",
    },
    {
      id: "meme10",
      eventImageSrc: "./images/rainbow/timeline-events/2012.png",
      eventCaption: (
        <>
          <span>2</span>
          <span>0</span>
          <span>1</span>
          <span>2</span>
        </>
      ),
      articleImageSrc: "./images/rainbow/decoration/doge-recline.png",
      articleContent: translations.timeline.articles.meme10.content,
      articleTitle: translations.timeline.articles.meme10.title,
      className: "meme10",
    },
    {
      id: "memecoin",
      eventImageSrc: "./images/rainbow/timeline-events/2013.png",
      eventCaption: (
        <>
          <span>2</span>
          <span>0</span>
          <span>1</span>
          <span>3</span>
        </>
      ),
      articleImageSrc: "./images/rainbow/decoration/doge-wow.png",
      articleContent: translations.timeline.articles.memecoin.content,
      articleTitle: translations.timeline.articles.memecoin.title,
      className: "memecoin",
    },
    {
      id: "trademark",
      eventImageSrc: "./images/rainbow/timeline-events/2014.png",
      eventCaption: (
        <>
          <span>2</span>
          <span>0</span>
          <span>1</span>
          <span>4</span>
        </>
      ),
      articleImageSrc: "./images/rainbow/decoration/doge-swatch.png",
      articleContent: translations.timeline.articles.trademark.content,
      articleTitle: translations.timeline.articles.trademark.title,
      className: "trademark",
    },
    {
      id: "meme20",
      eventImageSrc: "./images/rainbow/timeline-events/2016.png",
      eventCaption: (
        <>
          <span>2</span>
          <span>0</span>
          <span>1</span>
          <span>6</span>
        </>
      ),
      articleImageSrc: "./images/rainbow/decoration/doge-side-eye.png",
      articleContent: translations.timeline.articles.meme20.content,
      articleTitle: translations.timeline.articles.meme20.title,
      className: "meme20",
    },
    {
      id: "reclamation",
      eventImageSrc: "./images/rainbow/timeline-events/2021.png",
      eventCaption: (
        <>
          <span>2</span>
          <span>0</span>
          <span>2</span>
          <span>1</span>
        </>
      ),
      articleImageSrc: "./images/rainbow/decoration/doge-fashion.png",
      articleContent: translations.timeline.articles.reclamation.content,
      articleTitle: translations.timeline.articles.reclamation.title,
      className: "reclamation",
    },
    {
      id: "viralityAndInfluence",
      eventImageSrc: "./images/rainbow/timeline-events/2022.png",
      eventCaption: (
        <>
          <span>2</span>
          <span>0</span>
          <span>2</span>
          <span>2</span>
        </>
      ),
      articleImageSrc: "./images/rainbow/decoration/doge-laptop.png",
      articleContent:
        translations.timeline.articles.viralityAndInfluence.content,
      articleTitle: translations.timeline.articles.viralityAndInfluence.title,
      className: "viralityAndInfluence",
    },
    {
      id: "bronzeTheDogeDogePilgrimageandDogeDocumentary",
      eventImageSrc: "./images/rainbow/timeline-events/2023.png",
      eventCaption: (
        <>
          <span>2</span>
          <span>0</span>
          <span>2</span>
          <span>3</span>
        </>
      ),
      articleImageSrc: "./images/rainbow/decoration/doge-angry.png",
      articleContent:
        translations.timeline.articles
          .bronzeTheDogeDogePilgrimageandDogeDocumentary.content,
      articleTitle:
        translations.timeline.articles
          .bronzeTheDogeDogePilgrimageandDogeDocumentary.title,
      className: "bronzeTheDogeDogePilgrimageandDogeDocumentary",
    },
    // {
    //   id: "dogeLegacy",
    //   eventImageSrc: "./images/rainbow/timeline-events/2024.png",
    //   eventCaption: (
    //     <>
    //       <span>2</span>
    //       <span>0</span>
    //       <span>2</span>
    //       <span>4</span>
    //     </>
    //   ),
    //   articleImageSrc: "./images/rainbow/decoration/doge-share.png",
    //   articleContent: translations.timeline.articles.dogeLegacy.content,
    //   articleTitle: translations.timeline.articles.dogeLegacy.title,
    //   className: "dogeLegacy",
    // },
  ];

  return (
    <section
      id="history-section"
      className={classNames("history-section", className)}
    >
      <h2 className="history-section__title">{translations.timeline.title}</h2>
      <Timeline items={historyTimelineItems} />
    </section>
  );
}
