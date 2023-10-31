import classNames from "classnames";

export function WaveSeparator({ className }: { className?: string }) {
  return <div className={classNames("wave-separator", className)} />;
}
