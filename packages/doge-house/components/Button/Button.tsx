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
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  submit?: boolean;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled,
  onClick,
  className,
  isLoading,
  submit,
}) => {
  return (
    <button
      disabled={disabled || isLoading}
      type={submit ? "submit" : "button"}
      className={css(
        "border-[1px]",
        "px-2.5",
        "py-1",
        "bg-white",
        "font-bold",
        "border-black",
        "disabled:cursor-not-allowed",
        "disabled:hover:bg-white",
        "disabled:bg-gray-300",
        "hover:disabled:bg-gray-300",
        "disabled:border-gray-400",
        "disabled:text-gray-400",
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
              "bg-white",
              "opacity-20",
              "rounded-md"
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
              "items-center",
              "text-left"
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
  const { account, balance } = useAccount();
  return (
    <Button onClick={() => disconnect()}>
      <div>disconnect</div>
    </Button>
  );
};

export default Button;
