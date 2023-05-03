import ColoredText from "@/../dsl/components/ColoredText/ColoredText";
import { css } from "@/../dsl/helpers/css";

export default function CodeOfConductPage() {
  return (
    <div className={css("p-4")}>
      <div className={css("text-center")}>
        <ColoredText className={css("text-4xl", "font-bold")}>
          Code of Conduct
        </ColoredText>
      </div>
      <div
        className={css(
          "flex",
          "flex-col",
          "gap-8",
          "md:max-w-2xl",
          "m-auto",
          "text-2xl",
          "mt-6"
        )}
      >
        <span>
          1: Let{"'"}s be respectful, inclusive, and have fun together. We
          should look out for the other pilgrims, and make sure we stay safe on
          this journey. No antisocial behavior.
        </span>
        <span>
          2: Respect others anonymity, don{"'"}t publish photos of others on the
          trip without permission (We will bring doge big heads to hide faces)
        </span>
        <span>
          3: No taking advantage of Kabosu or Atsuko, no marketing stunts. You
          can obviously publish photos from the trip, just no over the top
          corporate shilling
        </span>
        <span>
          4: Be on time. The itinerary is tight. If you don{"'"}t want to take
          part in an activity please let us know. We will help to organize, but
          if you miss something, we can{"'"}t offer refunds.
        </span>
      </div>
    </div>
  );
}
