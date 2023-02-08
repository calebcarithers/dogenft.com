import { dogeAddress } from "@/environment/vars";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useIsMyDogeInstalled,
  useTx,
} from "@/services/myDoge";
import { css } from "dsl/helpers/css";
import { PropsWithChildren } from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled,
  onClick,
  className,
}) => {
  return (
    <button
      disabled={disabled}
      className={css(
        "border-[1px]",
        "border-black",
        "px-2.5",
        "py-1",
        "bg-white",
        "font-bold",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "disabled:hover:bg-white",
        "rounded-md",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const ConnectButton = () => {
  const isMyDogeInstalled = useIsMyDogeInstalled();
  const { connect, isConnected, isConnecting } = useConnect();
  const { account, balance } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <>
      {!isConnected && isMyDogeInstalled && (
        <Button
          className={css("hover:bg-doge-green", "disabled:hover:bg-white")}
          disabled={isConnecting}
          onClick={() => connect()}
        >
          {isConnecting ? (
            <div className={css("flex", "items-center", "gap-2")}>
              <span className={css("text-xl")}>✨</span>
              <div>connecting</div>
              <span className={css("text-xl")}>✨</span>
            </div>
          ) : (
            "connect"
          )}
        </Button>
      )}
      {/* {isConnected && (
        <div>
          <Button onClick={() => disconnect()}>disconnect</Button>
          <div>{account}</div>
          <div>{balance}</div>
          <Button disabled={isTxLoading} onClick={() => sendTx()}>
            {isTxLoading ? "loading" : "send 5 doge"}
          </Button>
          {txId && <div>{txId}</div>}
        </div>
      )} */}
    </>
  );
};

export const DisconnectButton = () => {
  const { disconnect } = useDisconnect();
  return <Button onClick={() => disconnect()}>disconnect</Button>;
};

export const Send5DogeButton = () => {
  const dogeAmount = 5;
  const { sendTx, txId, isLoading } = useTx({
    recipientAddress: dogeAddress,
    dogeAmount,
  });

  return (
    <Button disabled={isLoading} onClick={() => sendTx()}>
      {isLoading ? "loading" : `send ${dogeAmount} doge`}
    </Button>
  );
};

export default Button;
