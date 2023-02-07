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
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      className={css(
        "border-[1px]",
        "border-black",
        "p-1",
        "bg-white",
        "font-bold",
        "disabled:opacity-50"
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
  const {
    sendTx,
    txId,
    isLoading: isTxLoading,
  } = useTx({
    recipientAddress: "DNk1wuxV4DqiPMvqnwXU6R1AirdB7YZh32",
    dogeAmount: 5,
  });
  return (
    <>
      {!isConnected && isMyDogeInstalled && (
        <Button disabled={isConnecting} onClick={() => connect()}>
          {isConnecting ? "✨ connecting ✨" : "connect"}
        </Button>
      )}
      {isConnected && (
        <div>
          <Button onClick={() => disconnect()}>disconnect</Button>
          <div>{account}</div>
          <div>{balance}</div>
          <Button disabled={isTxLoading} onClick={() => sendTx()}>
            {isTxLoading ? "loading" : "send 5 doge"}
          </Button>
          {txId && <div>{txId}</div>}
        </div>
      )}
    </>
  );
};

export default Button;
