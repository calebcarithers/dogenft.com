import Countdown, { CountdownProps } from "react-countdown";
import classNames from "classnames";
import { useTranslation } from "../../../hooks/use-translation";
import { intervalToDuration, isAfter, parseISO } from "date-fns";
import dynamic from "next/dynamic";

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
  return (
    <section
      id="hero-section"
      className={classNames("hero-section", className)}
    >
      <CountdownClientComponent
        date={countdownDate}
        renderer={(props) => <CountdownRenderer {...props} />}
      />

      <div className="hero-section__image-wrapper">
        <img
          src={`./images/rainbow/bronze-statue-${
            isRevealed ? "revealed" : "hidden"
          }.png`}
          alt="A bronze doge statue."
          className="hero-section__image"
        />
      </div>
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
