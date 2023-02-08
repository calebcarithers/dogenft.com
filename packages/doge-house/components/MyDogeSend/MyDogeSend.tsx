import { css } from "@/../dsl/helpers/css";
import { abbreviate } from "@/../dsl/helpers/strings";
import { dogeAddress } from "@/environment/vars";
import { useTx } from "@/services/myDoge";
import { useState } from "react";
import Button from "../Button/Button";
import ExternalLink from "../ExternalLink/ExternalLink";

const MyDogeSend = () => {
  const [amount, setAmount] = useState(0);
  const { sendTx, txId, isLoading } = useTx({
    recipientAddress: dogeAddress,
    dogeAmount: amount,
  });
  return (
    <div
      className={css("text-3xl", "flex", "flex-col", "gap-2", "items-center")}
    >
      <div>Amount: {amount}</div>
      <div className={css("flex", "gap-2", "justify-center")}>
        <Button disabled={isLoading} onClick={() => setAmount(5)}>
          5 Ɖ
        </Button>
        <Button disabled={isLoading} onClick={() => setAmount(60)}>
          69 Ɖ
        </Button>
        <Button disabled={isLoading} onClick={() => setAmount(169)}>
          169 Ɖ
        </Button>
        <Button disabled={isLoading} onClick={() => setAmount(1690)}>
          1690 Ɖ
        </Button>
      </div>
      <div>
        <Button disabled={isLoading || amount === 0} onClick={() => sendTx()}>
          {isLoading ? "✨ loading ✨" : "send"}
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
