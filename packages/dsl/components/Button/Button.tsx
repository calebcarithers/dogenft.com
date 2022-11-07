import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import Link, { LinkSize, LinkType } from "dsl/components/Link/Link";
import { emojisplosion } from "emojisplosion";
import { useRouter } from "next/router";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { BsArrowLeft } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import { useDisconnect } from "wagmi";
import { css } from "../../helpers/css";
import Dropdown, { DropdownType } from "../Dropdown/Dropdown";

const tailwindconfig = require("../../tailwind.config.cjs");

export enum ButtonType {
  Primary = "primary",
  White = "white",
}

const baseButtonStyles = css(
  "p-2",
  "font-bold",
  "disabled:active:translate-x-0.5",
  "disabled:active:translate-y-0.5",
  "disabled:cursor-not-allowed",
  "outline-0"
);

const buttonTypeStyles = {
  [ButtonType.Primary]: css(
    "bg-pixels-yellow-100",
    "text-black",
    "disabled:text-pixels-yellow-400",
    "disabled:border-pixels-yellow-400",
    "hover:bg-yellow-400",
    "border-black",
    "disabled:bg-pixels-yellow-300"
  ),
  [ButtonType.White]: css(
    "bg-black",
    "text-white",
    "border-blue-700",
    "hover:bg-gray-900",
    "disabled:bg-gray-900"
  ),
};

const buttonDropShadowDisabledStyles = {
  [ButtonType.Primary]: css("bg-pixels-yellow-400", "bg-pixels-yellow-500"),
  [ButtonType.White]: css(),
};

const buttonDropShadowStyles = {
  [ButtonType.Primary]: css("bg-black"),
  [ButtonType.White]: css("bg-black"),
};

interface ButtonProps {
  onClick?: () => void;
  block?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  isLoading?: boolean;
  type?: ButtonType;
  emojisForExploding?: string[];
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  block,
  children,
  disabled = false,
  rounded = false,
  isLoading,
  type = ButtonType.Primary,
  emojisForExploding,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isDisabled = disabled || isLoading;

  const explode = useCallback(
    (xInitialVelocity: number, yInitialVelocity: number) => {
      emojisplosion({
        process(e) {
          e.className += " emojipop";
          //@ts-ignore
          e.style.zIndex = 0;
        },
        position: () => {
          let x = Math.random() * innerWidth;
          let y = Math.random() * innerHeight;
          if (ref.current) {
            const bounding = ref.current.getBoundingClientRect();
            x = bounding.x + bounding.width / 2;
            y = bounding.y + bounding.height / 2;
          }
          return { x, y };
        },
        emojis: emojisForExploding,
        physics: {
          fontSize: {
            min: 14,
            max: 54,
          },
          gravity: 2,
          initialVelocities: {
            y: { max: yInitialVelocity, min: 0 },
            x: { max: xInitialVelocity, min: 0 },
            rotation: 15,
          },
        },
      });
    },
    []
  );

  return (
    <div
      className={css(
        "relative",
        "inline-block",
        "z-10",
        "h-fit",
        "select-none",
        { "w-full": block }
      )}
      ref={ref}
    >
      <button
        disabled={isDisabled}
        onClick={() => {
          if (onClick) {
            if (emojisForExploding) {
              explode(60, -50);
              explode(-60, -50);
            }
            onClick();
          }
        }}
        className={css(
          baseButtonStyles,
          buttonTypeStyles[type],
          "relative",
          "active:translate-x-1",
          "active:translate-y-1",
          "border-2",
          "border-solid",
          {
            "w-full": block,
            "rounded-full": rounded,
          }
        )}
      >
        {children}
        {isLoading && (
          <div
            className={css(
              "absolute",
              "w-full",
              "left-0",
              "top-0",
              "h-full",
              "flex",
              "items-center",
              "justify-center",
              "opacity-75",
              {
                "bg-pixels-yellow-300": type === ButtonType.Primary,
                "bg-gray-900": type === ButtonType.White,
              }
            )}
          >
            <ClipLoader
              size={25}
              speedMultiplier={0.5}
              color={
                type === ButtonType.Primary
                  ? tailwindconfig?.theme?.extend?.colors?.pixels?.yellow[50]
                  : tailwindconfig?.theme?.extend?.colors?.meme?.yellow
              }
            />
          </div>
        )}
      </button>
      <div
        aria-disabled={isDisabled}
        className={css("absolute", "w-full", "h-full", {
          [buttonDropShadowDisabledStyles[type]]: isDisabled,
          [buttonDropShadowStyles[type]]: !isDisabled,
          "rounded-full": rounded,
        })}
        style={{ top: "6px", left: "6px", zIndex: -1 }}
      />
    </div>
  );
};

export const ConnectButton: React.FC<PropsWithChildren<any>> = () => {
  const router = useRouter();
  const isFraction = router.pathname === "/doge-major";
  const buttonType = isFraction ? ButtonType.White : ButtonType.Primary;
  const { disconnect } = useDisconnect();
  const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);

  const linkStyles = css({
    "text-pixels-yellow-500": !isFraction,
    "hover:text-yellow-400": !isFraction,
    "text-white": isFraction,
    "hover:text-gray-600": isFraction,
  });

  useEffect(() => {
    if (isDropDownOpen) {
      setIsDropDownOpen(false);
    }
  }, [router.pathname]);
  return (
    <>
      <RainbowConnectButton.Custom>
        {({ account, chain, openChainModal, openConnectModal, mounted }) => {
          return (
            <div
              {...(!mounted && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <Button type={buttonType} onClick={openConnectModal}>
                      connect
                    </Button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <Button type={buttonType} onClick={openChainModal}>
                      Wrong network
                    </Button>
                  );
                }

                return (
                  <div style={{ display: "flex", gap: 12 }}>
                    <Dropdown
                      type={
                        isFraction ? DropdownType.White : DropdownType.Primary
                      }
                      open={isDropDownOpen}
                      onOpenChange={setIsDropDownOpen}
                      trigger={
                        <Button type={buttonType} rounded>
                          {account.displayName}
                        </Button>
                      }
                    >
                      <Dropdown.Item>
                        <Link
                          bold
                          block
                          href={`/profile/${account.address}`}
                          size={LinkSize.xl}
                          type={isFraction ? LinkType.White : LinkType.Black}
                        >
                          Profile
                        </Link>
                      </Dropdown.Item>
                      <div className={css("mt-5", "text-base")}>
                        <Dropdown.Item>
                          <div
                            onClick={() => disconnect()}
                            className={css(
                              "cursor-pointer",
                              "text-right",
                              "font-bold",
                              linkStyles
                            )}
                          >
                            Disconnect
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <div
                            className={css(
                              "flex",
                              "items-center",
                              "space-x-2",
                              "cursor-pointer",
                              "justify-between",
                              "font-bold",
                              linkStyles
                            )}
                            onClick={openChainModal}
                          >
                            <div>network:</div>
                            <div className={css("flex", "items-center")}>
                              {chain.name}
                            </div>
                          </div>
                        </Dropdown.Item>
                      </div>
                    </Dropdown>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </RainbowConnectButton.Custom>
    </>
  );
};

export const BackOrHomeButton: React.FC<{ type?: ButtonType }> = ({
  type = ButtonType.Primary,
}) => {
  const router = useRouter();
  return (
    <div className={css("mb-8")}>
      <Button
        onClick={() => {
          if (document && document.referrer) {
            router.back();
          } else {
            router.push("/");
          }
        }}
        type={type}
      >
        <BsArrowLeft size={15} />
      </Button>
    </div>
  );
};

export default Button;
