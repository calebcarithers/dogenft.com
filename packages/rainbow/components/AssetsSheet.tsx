import { useQuery } from "@tanstack/react-query";
import BottomSheet from "dsl/components/BottomSheet/BottomSheet";
import { Divider } from "dsl/components/Divider/Divider";
import { css } from "dsl/helpers/css";
import { getNow, NowAsset } from "../api";
import { useAppStore } from "../store/app.store";

export const AssetsSheet = () => {
  const { isAssetsDialogOpen, setIsAssetsDialogOpen } = useAppStore(
    (store) => store
  );
  const { data: now } = useQuery(["getNow"], getNow, {
    refetchInterval: 30 * 1000,
    refetchIntervalInBackground: true,
  });
  return (
    <BottomSheet
      open={isAssetsDialogOpen}
      onDismiss={() => setIsAssetsDialogOpen(false)}
    >
      <div className={css("text-4xl", "font-bold", "text-center")}>
        ✨ Assets ✨
      </div>
      <div className={css("mt-8")}>
        <div className={css("text-4xl", "text-center", "font-bold")}>
          ~${now?.usdNotional.toLocaleString()}
        </div>
        <div className={css("mt-12")}>
          <div className={css("grid", "grid-cols-4", "text-pixels-yellow-400")}>
            <div>Asset</div>
            <div>Price</div>
            <div>Amount</div>
            <div>USD Notional</div>
          </div>
          <div className={css()}>
            <div>
              <div className={css("font-bold", "text-lg")}>Dogecoin</div>
              <div className={css("grid", "grid-cols-4")}>
                {now?.dogecoin.map((item) => (
                  <Asset key={`now-${item.symbol}`} item={item} />
                ))}
              </div>
            </div>

            <div className={css("my-8")}>
              <Divider />
            </div>

            <div>
              <div className={css("font-bold", "text-lg")}>Ethereum</div>
              <div className={css("grid", "grid-cols-4")}>
                {now?.ethereum.map((item) => (
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
                {now?.swaps.map((item) => (
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
      <div>{item.symbol}</div>
      <div>${parseFloat(item.usdPrice.toFixed(8)).toLocaleString()}</div>
      <div>{item.amount.toLocaleString()}</div>
      <div>${item.usdNotional.toLocaleString()}</div>
    </>
  );
};
