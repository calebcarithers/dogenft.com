import { css } from "@/../dsl/helpers/css";
import { abbreviate } from "@/../dsl/helpers/strings";
import { dogeAddress } from "@/environment/vars";
import { useTx, useWaitForTransaction } from "@/services/myDoge";
import { useState } from "react";
import Button from "../Button/Button";
import ExternalLink from "../ExternalLink/ExternalLink";

const MyDogeSend = () => {
  const [amount, setAmount] = useState(0);
  const { sendTx, txId, isLoading } = useTx({
    recipientAddress: dogeAddress,
    dogeAmount: amount,
  });
  const { isLoading: isTxConfirming, tx } = useWaitForTransaction(txId);
  return (
    <div
      className={css("text-3xl", "flex", "flex-col", "gap-2", "items-center")}
    >
      <div>Amount: {amount}</div>
      <div className={css("flex", "gap-2", "justify-center")}>
        <Button
          className={css(
            { "bg-doge-green": amount === 5 },
            "hover:bg-doge-green"
          )}
          disabled={isLoading}
          onClick={() => setAmount(5)}
        >
          5 Ɖ
        </Button>
        <Button
          className={css(
            { "bg-doge-orange": amount === 69 },
            "hover:bg-doge-orange"
          )}
          disabled={isLoading}
          onClick={() => setAmount(69)}
        >
          69 Ɖ
        </Button>
        <Button
          className={css(
            { "bg-doge-magenta": amount === 169 },
            "hover:bg-doge-magenta"
          )}
          disabled={isLoading}
          onClick={() => setAmount(169)}
        >
          169 Ɖ
        </Button>
        <Button
          className={css(
            { "bg-doge-red": amount === 1690 },
            "hover:bg-doge-red"
          )}
          disabled={isLoading}
          onClick={() => setAmount(1690)}
        >
          1690 Ɖ
        </Button>
      </div>
      <div>
        <Button
          className={css("hover:bg-doge-blue", "disabled:hover:bg-white")}
          isLoading={isLoading || isTxConfirming}
          disabled={isLoading || amount === 0}
          onClick={() => sendTx()}
        >
          send
        </Button>
      </div>
      {txId && (
        <ExternalLink href={`https://sochain.com/tx/DOGE/${txId}`}>
          {abbreviate(txId)}
        </ExternalLink>
      )}
    </div>
  );
};

export default MyDogeSend;
