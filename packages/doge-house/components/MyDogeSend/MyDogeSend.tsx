import { css } from "@/../dsl/helpers/css";
import { abbreviate } from "@/../dsl/helpers/strings";
import { dogeAddress } from "@/environment/vars";
import { useAccount, useTx, useWaitForTransaction } from "@/services/myDoge";
import { useState } from "react";
import Button from "../Button/Button";
import ExternalLink from "../ExternalLink/ExternalLink";
import Spinner from "../Spinner/Spinner";

const MyDogeSend = () => {
  const [amount, setAmount] = useState("");
  const { sendTx, txId, isLoading } = useTx({
    recipientAddress: dogeAddress,
    dogeAmount: amount === "" ? 0 : Number(amount),
  });
  const { account, username, balance } = useAccount();
  const formattedBalance = balance === null ? null : Number(balance) / 10 ** 8;
  const { isLoading: isTxConfirming, tx } = useWaitForTransaction(txId);
  return (
    <div className={css("text-3xl")}>
      {!isTxConfirming && !tx && (
        <div className={css("flex", "flex-col", "gap-2", "items-center")}>
          <div>
            henlo, {username ? username : account && abbreviate(account)}
          </div>
          <div>input amount</div>
          <div
            className={css(
              "flex",
              "gap-2",
              "justify-center",
              "max-w-xs",
              "w-full"
            )}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendTx();
              }}
              className={css(
                "flex",
                "flex-col",
                "gap-2",
                "w-full",
                "items-center"
              )}
            >
              <input
                disabled={isLoading || isTxConfirming}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={css(
                  "border-black",
                  "border-[1px]",
                  "rounded-md",
                  "max-w-[200px]",
                  "px-2",
                  "py-1",
                  "w-full",
                  "disabled:bg-gray-300",
                  "disabled:border-gray-400",
                  "disabled:text-gray-400",
                  "placeholder:text-2xl"
                )}
                placeholder={`max: ${formattedBalance?.toFixed(2)} Ɖ`}
                type={"number"}
                min={1}
                max={Number(formattedBalance)}
                step={0.0001}
              />
              <div>and</div>
              <div>
                <Button
                  submit
                  className={css(
                    "hover:bg-doge-blue",
                    "disabled:hover:bg-white"
                  )}
                  isLoading={isLoading || isTxConfirming}
                  disabled={isLoading || amount === "" || amount === "0"}
                >
                  donate
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isTxConfirming && !tx && (
        <div className={css("flex", "gap-2", "justify-center")}>
          <Spinner size={16} />
          <div className={css("text-3xl", "text-gray-800")}>tx confirming</div>
        </div>
      )}

      {tx && (
        <div>
          <div className={css("text-6xl")}>💓</div>
          <div>Donation received!</div>
        </div>
      )}

      {txId && (
        <div className={css("grow-0", "inline-block")}>
          <ExternalLink
            className={css("text-2xl", "ml-6")}
            href={`https://sochain.com/tx/DOGE/${txId}`}
          >
            {abbreviate(txId)}
          </ExternalLink>
        </div>
      )}
    </div>
  );
};

export default MyDogeSend;
