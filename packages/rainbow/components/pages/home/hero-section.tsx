import classNames from "classnames";
import { isAfter, parseISO } from "date-fns";
import dynamic from "next/dynamic";
import { CountdownProps } from "react-countdown";
import { useTranslation } from "../../../hooks/use-translation";
import { useRouter } from "next/router";

import { useState } from "react";
import { Dialog } from "@headlessui/react";

const COUNTDOWN_DATE =
  process.env.NEXT_PUBLIC_COUNTDOWN_DATE || "2023-11-02T15:00:00";

const countdownDate = parseISO(COUNTDOWN_DATE);

const CountdownClientComponent = dynamic(
  () =>
    import("react-countdown").then(
      (mod) => mod.default as React.ComponentType<CountdownProps>
    ),
  {
    ssr: false,
    loading: () => (
      <CountdownRenderer
        days={0}
        hours={0}
        minutes={0}
        seconds={0}
        completed={false}
      />
    ),
  }
);

export function HeroSection({ className }: { className?: string }) {
  const isRevealed = isAfter(new Date(), countdownDate);
  const { translations } = useTranslation();

  return (
    <section
      id="hero-section"
      className={classNames("hero-section", className)}
    >
      {/* <CountdownClientComponent
        date={countdownDate}
        renderer={(props) => <CountdownRenderer {...props} />}
      /> */}

      <h1 className="hero-section__title">
        {translations.hero["title.revealed"]}
      </h1>

      <div className="hero-section__image-wrapper">
        <img
          src={`./images/rainbow/bronze-statue-${
            isRevealed ? "revealed" : "hidden"
          }.png`}
          alt="A bronze doge statue."
          className="hero-section__image"
        />
      </div>

      {/* <div className="hero-section__play-button-wrapper">
        <button className="hero-section__play-button">
          <img
            src={`./images/rainbow/play-video-${
              locale === "ja" ? "ja" : "en"
            }.svg`}
            alt="Play video"
          />
        </button>
      </div> */}

      <ClientSidePlayVideoDialog />
    </section>
  );
}

interface DatePart {
  id: string;
  title: string;
  value: number;
}

function CountdownRenderer({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) {
  const { translations } = useTranslation();

  const dateParts: DatePart[] = [
    {
      id: "days",
      title: translations.countDown.days,
      value: days,
    },
    {
      value: hours,
      id: "hours",
      title: translations.countDown.hours,
    },
    {
      value: minutes,
      id: "minutes",
      title: translations.countDown.minutes,
    },
    {
      value: seconds,
      id: "seconds",
      title: translations.countDown.seconds,
    },
  ];

  return (
    <div
      className={classNames(
        "countdown-renderer",
        completed ? "countdown-renderer" : false
      )}
    >
      <h1 className="countdown-renderer__title">
        {translations.hero[completed ? "title.revealed" : "title.hidden"]}
      </h1>
      <div className="countdown-renderer__date-section-list-wrapper">
        <ul className="countdown-renderer__date-section-list">
          {dateParts.map((p) => (
            <li key={p.id} className="countdown-renderer__date-section">
              <span
                className="countdown-renderer__date-section__value"
                id={p.id}
              >
                {p.value}
              </span>
              <span className="countdown-renderer__date-section__description">
                {p.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const ClientSidePlayVideoDialog = dynamic(
  () => Promise.resolve(PlayVideoDialog),
  {
    ssr: false,
  }
);

function PlayVideoDialog() {
  let [isOpen, setIsOpen] = useState(false);
  const { locale } = useRouter();
  const toggleDialog = () => {
    setIsOpen((s) => !s);
  };
  return (
    <>
      <div className="hero-section__play-button-wrapper">
        <button onClick={toggleDialog} className="hero-section__play-button">
          <img
            src={`./images/rainbow/play-video-${
              locale === "ja" ? "ja" : "en"
            }.svg`}
            alt="Play video"
          />
        </button>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto relative w-full max-w-3xl mx-4">
            <div className=" bg-rainbow-white relative pt-[56.25%] h-0 rounded-xl overflow-hidden border-rainbow-white border-8">
              <iframe
                src="https://www.youtube-nocookie.com/embed/zTLDmvqQU24?si=OZlqbj9gS4QgrQ-i"
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
