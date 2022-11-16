import { css } from "../../helpers/css";
//@ts-ignore
import { ReactNode, useMemo } from "react";
import styles from "./ProgressBar.module.css";

export interface ProgressStep {
  renderLabel: () => ReactNode;
  value: number;
}

interface ProgressBarProps {
  now: number;
  renderNowLabel: () => ReactNode;
  steps: ProgressStep[];
  renderThumb: (now: number) => ReactNode;
}

export const ProgressBar: React.FC<
  Pick<ProgressBarProps, "steps" | "now" | "renderThumb" | "renderNowLabel">
> = ({ steps, now, renderThumb, renderNowLabel }) => {
  const min = steps![0];
  const max = steps![steps!.length - 1];
  const minLog = Math.log10(min.value);
  const maxLog = Math.log10(max.value);
  const range = maxLog - minLog;

  const percentageComplete = useMemo(() => {
    return (now / (max.value - min.value)) * 100;
  }, [now, min, max]);

  return (
    <div className={css("relative", "my-14")}>
      <div
        className={css(
          "h-[15px]",
          "bg-pixels-yellow-100",
          "w-full",
          "rounded-full",
          "border-[1px]",
          "border-black",
          "relative"
        )}
      >
        <div
          className={css(
            "h-full",
            "bg-meme-yellow",
            "rounded-full",
            styles.rainbow
          )}
          style={{ width: `${percentageComplete}%` }}
        />
        <div
          style={{
            left: `${percentageComplete}%`,
          }}
          className={css(
            "absolute",
            "z-20",
            "w-[35px]",
            "h-[35px]",
            "md:w-[50px]",
            "md:h-[50px]",
            "top-1/2",
            "-translate-y-[50%]",
            "-translate-x-[50%]",
            "flex",
            "justify-center",
            "items-center"
          )}
        >
          {renderThumb(now)}
        </div>
      </div>
      <div
        className={css("absolute", "top-32", "-translate-x-[50%]", "font-bold")}
        style={{
          left: `${percentageComplete}%`,
        }}
      >
        {renderNowLabel ? renderNowLabel() : now}
      </div>
      {steps.map((step) => {
        const stepPercentage = (step.value / (max.value - min.value)) * 100;
        return (
          <div
            style={{
              left: `${stepPercentage}%`,
            }}
            key={`step-label-${step.value}`}
            className={css(
              "z-10",
              "absolute",
              "top-0",
              "-translate-y-[50%]",
              "-translate-x-[50%]",
              "leading-3"
            )}
          >
            {step.renderLabel()}
          </div>
        );
      })}
    </div>
  );
};
