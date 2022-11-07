import { useQuery } from "@tanstack/react-query";
import { ProgressBar } from "dsl/components/ProgressBar/ProgressBar";
import styles from "dsl/components/ProgressBar/ProgressBar.module.css";
import { css } from "dsl/helpers/css";
import Image from "next/image";
import { PropsWithChildren, useCallback } from "react";
import { getNow } from "../api";
import { useAppStore } from "../store/app.store";

const DonationLabel: React.FC<
  PropsWithChildren<{ width: number; value: number; label?: string }>
> = ({ width, value, children, label }) => {
  return (
    <div className={css("relative")}>
      <div className={css(`w-[${width}px]`)}>{children}</div>
      <div
        className={css(
          "absolute",
          "left-1/2",
          "-translate-x-[50%]",
          "top-[115px]",
          "text-base"
        )}
      >
        ${value.toLocaleString()}
      </div>
      {label && (
        <div
          className={css(
            "absolute",
            "top-[135px]",
            "text-sm",
            "text-pixels-yellow-500",
            "left-1/2",
            "-translate-x-[50%]",
            "w-[100px]"
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
};

const DonationProgressBar: React.FC<{}> = ({}) => {
  const { setIsAssetsDialogOpen } = useAppStore((store) => store);
  const { data: now } = useQuery(["getNow"], getNow, {
    refetchInterval: 30 * 1000,
    refetchIntervalInBackground: true,
  });
  const _max = 269420;
  const _now = now ? now.usdNotional : 0;
  const _min = 0;
  //@ts-ignore
  const dogecoinPrice = now ? now?.dogecoin[0]?.usdPrice : 0;
  const getSteps = useCallback(() => {
    return [
      {
        value: _min,
        renderLabel: () => {
          return (
            <DonationLabel width={90} value={_min}>
              <Image
                layout={"responsive"}
                src={"/images/cheems.png"}
                width={2000}
                height={2000}
                alt={"cheems"}
                priority
              />
            </DonationLabel>
          );
        },
      },
      {
        value: 42069,
        renderLabel: () => {
          return (
            <DonationLabel width={90} value={42069} label={"life size"}>
              <Image
                layout={"responsive"}
                src={"/images/buff-doge.png"}
                width={2000}
                height={2000}
                alt={"buff doge"}
                priority
              />
            </DonationLabel>
          );
        },
      },
      {
        value: 69420,
        renderLabel: () => {
          return (
            <DonationLabel width={90} value={69420} label={"horse size"}>
              <Image
                layout={"responsive"}
                src={"/images/doge-horse.png"}
                width={2000}
                height={2000}
                alt={"horse sized doge"}
                priority
              />
            </DonationLabel>
          );
        },
      },
      {
        value: 169420,
        renderLabel: () => {
          return (
            <DonationLabel width={90} value={169420} label={"elephant size"}>
              <Image
                layout={"responsive"}
                src={"/images/doge-elephant.png"}
                width={2000}
                height={2000}
                alt={"elephant sized doge"}
                priority
              />
            </DonationLabel>
          );
        },
      },
      {
        value: _max,
        renderLabel: () => {
          return (
            <DonationLabel width={90} value={_max} label={"godzilla size"}>
              <Image
                layout={"responsive"}
                src={"/images/doge-zilla.png"}
                width={2000}
                height={2000}
                alt={"doge-zilla"}
                priority
              />
            </DonationLabel>
          );
        },
      },
    ];
  }, []);

  const renderNowLabel = useCallback(() => {
    return _now ? (
      <div className={css("flex", "flex-col", "items-center")}>
        <div>${_now?.toLocaleString()}</div>
        <div
          className={css("font-normal", "text-base", "text-pixels-yellow-500")}
        >
          {now?.usdNotional && (
            <div className={css("flex", "items-center", "gap-1")}>
              <div className={css("font-normal")}>~Ɖ</div>
              <div className={css("font-bold")}>
                {parseInt(
                  Number(now.usdNotional / dogecoinPrice).toString()
                ).toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>
    ) : (
      "...loading"
    );
  }, [now, _now, dogecoinPrice]);

  const renderThumb = useCallback((value: number) => {
    return (
      <div
        onClick={() => setIsAssetsDialogOpen(true)}
        className={css(
          "cursor-pointer",
          "active:translate-x-1",
          "active:translate-y-1",
          "relative",
          "w-full",
          "h-full",
          "border-[1px]",
          "rounded-full",
          "border-black",
          "hover:border-yellow-400",
          "bg-pixels-yellow-200",
          "overflow-hidden",
          "z-20",
          styles.rainbow
        )}
      >
        <div
          className={css("absolute", "w-[60px]", "-left-[10px]", "-top-[3px]")}
        >
          <Image
            layout={"responsive"}
            src={"/images/doge-birthday.png"}
            width={229}
            height={258}
            alt={"bday doge"}
          />
        </div>
      </div>
    );
  }, []);

  return (
    <ProgressBar
      now={_now}
      renderThumb={renderThumb}
      renderNowLabel={renderNowLabel}
      steps={getSteps()}
    />
  );
};

export default DonationProgressBar;
