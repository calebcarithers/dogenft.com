import { useQuery } from "@tanstack/react-query";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import BottomSheet from "dsl/components/BottomSheet/BottomSheet";
import { Divider } from "dsl/components/Divider/Divider";
import { css } from "dsl/helpers/css";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { getNow, NowAsset } from "../api";
import { useAppStore } from "../store/app.store";

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = [
  "rgba(255, 0, 0, 0.53)",
  "rgba(255, 143, 0, 0.53)",
  "rgba(255, 228, 0, 0.53)",
  "rgba(159, 255, 0, 0.53)",
  "rgba(0, 255, 21, 0.53)",
  "rgba(0, 255, 218, 0.53)",
  "rgba(0, 170, 255, 0.53)",
  "rgba(0, 37, 255, 0.53)",
  "rgba(85, 0, 255, 0.53)",
  "rgba(223, 0, 255, 0.53)",
  "rgba(255, 0, 74, 0.53)",
];

export const AssetsSheet = () => {
  const { isAssetsDialogOpen, setIsAssetsDialogOpen } = useAppStore(
    (store) => store
  );
  const { data: now } = useQuery(["getNow"], getNow, {
    refetchInterval: 30 * 1000,
    refetchIntervalInBackground: true,
  });

  const [chartData, setChartData] = useState<any>();
  useEffect(() => {
    let data: any[] = [];
    const dogeData = now?.dogecoin?.map((item, index) => {
      return {
        label: item.symbol,
        value: item.usdNotional,
        backgroundColor: null,
        borderColor: null,
      };
    });
    const ethereumData = now?.ethereum
      ?.sort((a, b) => b?.usdNotional - a?.usdNotional)
      .map((item, index) => {
        return {
          label: item.symbol,
          value: item.usdNotional,
          backgroundColor: null,
          borderColor: null,
        };
      });
    data = data.concat(dogeData);
    data = data.concat(ethereumData?.splice(0, 3));
    data = data.map((item, index) => ({
      ...item,
      backgroundColor: colors[index],
      borderColor: colors[index],
    }));
    const _chartdata = {
      labels: data?.map((item) => item?.label),
      datasets: [
        {
          label: "Treasury",
          data: data?.map((item) => item?.value),
          backgroundColor: data?.map((item) => item?.backgroundColor),
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    };
    setChartData(_chartdata);
  }, [now]);

  return (
    <BottomSheet
      snapPoints={({ maxHeight }) => [maxHeight - 10]}
      defaultSnap={({ maxHeight }) => maxHeight - 10}
      open={isAssetsDialogOpen}
      onDismiss={() => setIsAssetsDialogOpen(false)}
    >
      <div className={css("text-4xl", "font-bold", "text-center")}>
        ✨ Assets ✨
      </div>
      <div className={css("mt-8")}>
        <div className={css("text-4xl", "text-center", "font-bold")}>
          ~${now?.usdNotional?.toLocaleString()}
        </div>
        <div className={css("mt-12")}>
          <div className={css("flex", "justify-center")}>
            <div className={css("max-w-xs")}>
              {chartData && (
                <Pie
                  data={chartData}
                  options={{
                    font: { family: "Comic Neue" },
                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                      tooltip: {
                        callbacks: {
                          label: (model) => {
                            return `~$${model.formattedValue} ${model.label}`;
                          },
                        },
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>
          <div
            className={css(
              "grid",
              "grid-cols-4",
              "text-pixels-yellow-400",
              "my-4"
            )}
          >
            <div>Asset</div>
            <div>Price</div>
            <div>Amount</div>
            <div>USD Notional</div>
          </div>
          <div>
            <div>
              <div className={css("font-bold", "text-lg")}>
                Dogecoin Donations
              </div>
              <div className={css("grid", "grid-cols-4")}>
                {now?.dogecoin?.map((item) => (
                  <Asset key={`now-${item.symbol}`} item={item} />
                ))}
              </div>
            </div>

            <div className={css("my-8")}>
              <Divider />
            </div>

            <div>
              <div className={css("font-bold", "text-lg")}>
                Ethereum Donations
              </div>
              <div className={css("grid", "grid-cols-4")}>
                {now?.ethereum
                  ?.sort((a, b) => b?.usdNotional - a?.usdNotional)
                  .map((item) => (
                    <Asset key={`now-${item.symbol}`} item={item} />
                  ))}
              </div>
            </div>

            <div className={css("my-8")}>
              <Divider />
            </div>

            <div>
              <div className={css("font-bold", "text-lg")}>🌈 Swaps</div>
              <div className={css("grid", "grid-cols-4")}>
                {now?.swaps
                  ?.sort((a, b) => b?.usdNotional - a?.usdNotional)
                  .map((item) => (
                    <Asset key={`now-${item.symbol}`} item={item} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
};

const Asset: React.FC<{ item: NowAsset }> = ({ item }) => {
  return (
    <>
      <div>{item?.symbol}</div>
      <div>
        $
        {parseFloat(item.usdPrice.toFixed(6))?.toLocaleString(undefined, {
          maximumFractionDigits: 6,
        })}
      </div>
      <div>{item?.amount?.toLocaleString()}</div>
      <div>${item?.usdNotional?.toLocaleString()}</div>
    </>
  );
};
