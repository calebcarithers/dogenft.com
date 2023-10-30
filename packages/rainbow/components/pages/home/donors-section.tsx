import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Leaderboard } from "../../../api/index";
import { useTranslation } from "../../../hooks/use-translation";
import classNames from "classnames";
import ReactTooltip from "react-tooltip";

export function DonorsSection({ className }: { className?: string }) {
  return (
    <section
      className={classNames("donors-section", className)}
      id="donors-section"
    >
      <div className="donors-section__article-wrapper">
        <DonorArticle />
      </div>
      <div className="donors-section__leaderboard-wrapper">
        <div className="donors-section__table-container">
          <DonorLeaderboard />
        </div>
      </div>
    </section>
  );
}

function DonorArticle() {
  const { translations } = useTranslation();

  return (
    <article className="donors-section__article">
      <h2 className="donors-section__title">
        {translations.donorsSection.article.title}
      </h2>
      <p className="donors-section__content">
        {translations.donorsSection.article.content}
      </p>
    </article>
  );
}

function DonorLeaderboard() {
  const { translations } = useTranslation();

  const { data, isLoading, error } = useQuery(
    ["leaderboard"],
    fetchLeaderboard
  );

  const ref = useRef<HTMLTableCellElement>(null);

  // Set hidden th-width to compensate for scrollbar causing layout shift:
  useEffect(() => {
    if (!ref.current) return;
    const scrollbarWidth = getScrollbarWidth();
    ref.current.style.width = `${scrollbarWidth}px`;
  });

  if (isLoading)
    return (
      <div className="leaderboard__loading-container" role="status">
        <img
          className="leaderboard__loading-image"
          src="./images/rainbow/decoration/doge-angry.png"
          alt=""
        />
        <span className="sr-only">Loading...</span>
      </div>
    );
  if (error)
    return (
      <div className="leaderboard__error-container" role="alert">
        <img
          className="leaderboard__error-image"
          src="./images/rainbow/decoration/doge-wow.png"
          alt=""
        />
        <div className="speech-bubble">
          <strong className="speech-bubble__title">Holy smokes!</strong>
          <span className="speech-bubble__message">
            Unable to fetch the leaderboard.
          </span>
        </div>
      </div>
    );

  return (
    <div>
      <table className={"donors-section__table"}>
        <thead>
          <tr>
            <th className={"donors-section__table-header"}>
              {translations.donorsSection.table.headings.donor}
            </th>
            <th className={"donors-section__table-header"}>
              {translations.donorsSection.table.headings.amountDonated}
            </th>
            {/* hidden element to compensate for scrollbar causing layout shift */}
            <th ref={ref} aria-hidden="true" />
          </tr>
        </thead>
        <tbody className="w-full">
          {(data?.donations || []).map((d) => (
            <tr key={d.address} className={"donors-section__table-row"}>
              <td
                className="donors-section__table-cell"
                data-for="donor-tooltip"
                data-tip={
                  d.myDogeName || d.ens || d.address || "Anonymous Hero"
                }
                data-iscapture="true"
              >
                {/* {d.myDogeName ||
                  d.ens ||
                  shortenString(d.address) ||
                  "Anonymous Hero"} */}
                {d.myDogeName || d.ens || d.address || "Anonymous Hero"}

                <div className="overflow-hider" />
              </td>

              <td className={"donors-section__table-cell"}>
                {`$${d.usdNotional.toFixed(2)}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactTooltip id="donor-tooltip" data-scroll-hide="true" />
    </div>
  );
}

async function fetchLeaderboard() {
  const response = await fetch(
    "https://api.ownthedoge.com/statue-campaign/leaderboard"
  );
  return await (response.json() as Promise<Leaderboard>);
}

function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // forcing scrollbar to appear
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement("div");
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  outer.parentNode?.removeChild(outer);

  return scrollbarWidth;
}

function shortenString(str: string, startLength = 5, endLength = 2) {
  if (str.length <= startLength + endLength + 1) {
    return str;
  }
  return `${str.slice(0, startLength)}...${str.slice(-endLength)}`;
}
