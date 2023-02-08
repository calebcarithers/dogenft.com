import {
  useAccount,
  useConnect,
  useDisconnect,
  useIsMyDogeInstalled,
} from "@/services/myDoge";
import { css } from "dsl/helpers/css";
import { PropsWithChildren } from "react";
import Spinner from "../Spinner/Spinner";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled,
  onClick,
  className,
  isLoading,
}) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={css(
        "border-[1px]",
        "border-black",
        "px-2.5",
        "py-1",
        "bg-white",
        "font-bold",
        "disabled:cursor-not-allowed",
        "disabled:hover:bg-white",
        // "disabled:text-gray-300",
        "rounded-md",
        "relative",
        className
      )}
      onClick={onClick}
    >
      {children}
      {isLoading && (
        <>
          <div
            className={css(
              "w-full",
              "h-full",
              "absolute",
              "inset-0",
              "bg-black",
              "opacity-40"
            )}
          />
          <div
            className={css(
              "w-full",
              "h-full",
              "absolute",
              "inset-0",
              "flex",
              "justify-center",
              "items-center"
            )}
          >
            <Spinner />
          </div>
        </>
      )}
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
          isLoading={isConnecting}
          className={css("hover:bg-doge-green", "disabled:hover:bg-white")}
          onClick={() => connect()}
        >
          connect
        </Button>
      )}
    </>
  );
};

export const DisconnectButton = () => {
  const { disconnect } = useDisconnect();
  return <Button onClick={() => disconnect()}>disconnect</Button>;
};

export default Button;
