import Button from "dsl/components/Button/Button";
import Link from "dsl/components/Link/Link";
import { css } from "dsl/helpers/css";
import { abbreviate } from "dsl/helpers/strings";
import { PropsWithChildren, useCallback } from "react";
import { BsArrowRight } from "react-icons/bs";
import { BaseLeaderboard, ClientSide, Donation, RainbowSwap } from "../api";
import Pill from "./Pill";

export const RewardItem: React.FC<
  PropsWithChildren<{ title: string; description?: string }>
> = ({ title, description }) => {
  return (
    <div
      className={css("border-2", "border-black", "p-2", "bg-pixels-yellow-100")}
    >
      <div className={css("p-1")}>
        <div className={css("text-left", "text-2xl")}>{title}</div>
        {description && (
          <div className={css("font-normal", "text-left", "text-lg")}>
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export const LeaderBoardItem: React.FC<{
  rank: number;
  item: BaseLeaderboard;
  type: "donation" | "swap";
}> = ({ item, rank, type }) => {
  const renderName = useCallback(() => {
    if (item.myDogeName) {
      return (
        <div className={css("flex", "flex-col", "items-start")}>
          <div className={css("text-2xl", "font-bold")}>{item.myDogeName}</div>
        </div>
      );
    } else if (item.ens) {
      return <div className={css("text-2xl", "font-bold")}>{item.ens}</div>;
    }
    return (
      <div className={css("text-2xl", "font-bold")}>
        {abbreviate(item.address, 4)}
      </div>
    );
  }, [item.myDogeName, item.ens, item.address]);

  return (
    <Button block>
      <div className={css("w-full", "p-1")}>
        <div className={css("flex", "justify-between")}>
          <div className={css("flex", "items-center", "gap-3")}>
            <div
              className={css(
                "font-normal",
                "text-2xl",
                "text-pixels-yellow-400"
              )}
            >
              {rank}
            </div>
            {renderName()}
          </div>
          <div className={css("flex", "flex-col", "items-end", "gap-1")}>
            <div className={css("font-bold", "text-2xl")}>
              ~${item?.usdNotional?.toLocaleString()}
            </div>
            <div>
              {type === "donation" ? (
                <Pill type={"donation"} />
              ) : (
                <Pill type={"swap"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Button>
  );
};

export const DonateItem: React.FC<PropsWithChildren<{ item: Donation }>> = ({
  item,
}) => {
  return (
    <Link isExternal href={item.explorerUrl}>
      <Button block>
        <div className={css("w-full", "p-1")}>
          <div className={css("flex", "justify-between", "text-2xl")}>
            <div className={css("flex", "items-center", "gap-2")}>
              <div>{item.currency}</div>
              <div
                className={css(
                  "font-normal",
                  "text-pixels-yellow-400",
                  "text-lg"
                )}
              >
                ({parseFloat(item.amount?.toFixed(4)).toLocaleString()})
              </div>
            </div>
            <div>~${item?.currencyUSDNotional?.toLocaleString()}</div>
          </div>
          <div
            className={css("flex", "justify-between", "items-center", "mt-1")}
          >
            <div className={css("font-normal", "text-lg")}>
              {item.fromEns ? item.fromEns : abbreviate(item.fromAddress, 4)}
            </div>
            <Pill type={"donation"} />
          </div>
        </div>
      </Button>
    </Link>
  );
};

export const SwapItem: React.FC<PropsWithChildren<{ item: RainbowSwap }>> = ({
  item,
}) => {
  const renderSwapIndicator = useCallback(() => {
    if (item.clientSide === ClientSide.SELL) {
      return (
        <>
          <div>{item.baseCurrency}</div>
          <div>
            <BsArrowRight size={25} />
          </div>
          <div>{item.quoteCurrency}</div>
        </>
      );
    }
    return (
      <>
        <div>{item.quoteCurrency}</div>
        <div>
          <BsArrowRight size={25} />
        </div>
        <div>{item.baseCurrency}</div>
      </>
    );
  }, [item.clientSide, item.baseCurrency, item.quoteCurrency]);

  return (
    <Link isExternal href={`https://etherscan.io/tx/${item.txHash}`}>
      <Button block>
        <div className={css("w-full", "p-1")}>
          <div className={css("flex", "justify-between", "text-2xl")}>
            <div className={css("flex", "items-center", "gap-2")}>
              {renderSwapIndicator()}
            </div>
            <div>~${item?.donatedUSDNotional?.toLocaleString()}</div>
          </div>
          <div
            className={css("flex", "justify-between", "items-center", "mt-1")}
          >
            <div className={css("font-normal", "text-lg")}>
              {item.clientEns
                ? item.clientEns
                : abbreviate(item.clientAddress, 4)}
            </div>
            <Pill type={"swap"} />
          </div>
        </div>
      </Button>
    </Link>
  );
};
