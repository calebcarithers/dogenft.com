import {css} from "../../helpers/css";
import React, {PropsWithChildren, useEffect} from "react";
import {ConnectButton as RainbowConnectButton} from '@rainbow-me/rainbowkit';
import Dropdown, {DropdownType} from "../Dropdown/Dropdown";
import Link, {LinkSize, LinkType} from "../Link/Link";
import {useDisconnect} from "wagmi";
import {useRouter} from "next/router";
import {ClipLoader} from "react-spinners";
import tailwindconfig from "../../tailwind.config";
import {BsArrowLeft} from "react-icons/bs";


export enum ButtonType {
    Primary = "primary",
    White = "white"
}

const baseButtonStyles = css("p-2", "font-bold", "disabled:active:translate-x-0.5",
    "disabled:active:translate-y-0.5", "disabled:cursor-not-allowed",)

const buttonTypeStyles = {
    [ButtonType.Primary]: css("bg-pixels-yellow-100", "text-black", "disabled:text-pixels-yellow-400",
        "disabled:border-pixels-yellow-400", "hover:bg-yellow-400", "border-black", "disabled:bg-pixels-yellow-300"),
    [ButtonType.White]: css("bg-black", "text-white", "border-blue-700", "hover:bg-gray-900", "disabled:bg-gray-900")
}

const buttonDropShadowDisabledStyles = {
    [ButtonType.Primary]: css("bg-pixels-yellow-400", "bg-pixels-yellow-500"),
    [ButtonType.White]: css()
}

const buttonDropShadowStyles = {
    [ButtonType.Primary]: css("bg-black"),
    [ButtonType.White]: css("bg-black")
}

interface ButtonProps {
    onClick?: () => void;
    block?: boolean;
    disabled?: boolean
    rounded?: boolean;
    isLoading?: boolean;
    type?: ButtonType
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
      onClick,
      block,
      children,
      disabled = false,
      rounded = false,
      isLoading,
      type= ButtonType.Primary
  }) => {
    const isDisabled = disabled || isLoading;
    return <div className={css("relative", "inline-block", "z-10", "h-fit", {"w-full": block})}>
        <button disabled={isDisabled} onClick={onClick && onClick}
                className={css(baseButtonStyles, buttonTypeStyles[type], "relative", "active:translate-x-1", "active:translate-y-1",
                    "border-2", "border-solid", {
                    "w-full": block,
                    "rounded-full": rounded
                })}>
            {children}
            {isLoading && <div className={css("absolute", "w-full", "left-0", "top-0", "h-full", "flex", "items-center", "justify-center", "opacity-75", {
                "bg-pixels-yellow-300": type === ButtonType.Primary,
                "bg-gray-900": type === ButtonType.White
            })}>
              <ClipLoader size={25} speedMultiplier={0.5} color={type === ButtonType.Primary ? tailwindconfig.theme.extend.colors.pixels.yellow[500] : tailwindconfig.theme.extend.colors.meme.yellow}/>
            </div>}
        </button>
        <div aria-disabled={isDisabled}
             className={css("absolute", "w-full", "h-full", {
                 [buttonDropShadowDisabledStyles[type]]: isDisabled,
                 [buttonDropShadowStyles[type]]: !isDisabled,
                 "rounded-full": rounded,
             })}
             style={{top: "6px", left: "6px", zIndex: -1}}/>
    </div>
}

export const ConnectButton: React.FC<PropsWithChildren<any>> = () => {
    const router = useRouter()
    const isFraction = router.pathname === '/doge-major'
    const buttonType = isFraction ? ButtonType.White : ButtonType.Primary
    const {disconnect} = useDisconnect()
    const [isDropDownOpen, setIsDropDownOpen] = React.useState(false)

    const linkStyles = css({
        "text-pixels-yellow-500": !isFraction,
        "hover:text-yellow-400": !isFraction,
        "text-white": isFraction,
        "hover:text-gray-600": isFraction
    })

    useEffect(() => {
        if (isDropDownOpen) {
            setIsDropDownOpen(false)
        }
    }, [router.pathname])
    return <>
        <RainbowConnectButton.Custom>
            {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted,
              }) => {
                return (
                    <div
                        {...(!mounted && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
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
                                <div style={{display: 'flex', gap: 12}}>
                                    <Dropdown type={isFraction ? DropdownType.White : DropdownType.Primary} open={isDropDownOpen} onOpenChange={setIsDropDownOpen}
                                              trigger={<Button type={buttonType} rounded>
                                                  {account.displayName}
                                              </Button>}>
                                        <Dropdown.Item>
                                            <Link bold block href={`/profile/${account.address}`} size={LinkSize.xl}
                                                  type={isFraction ? LinkType.White : LinkType.Black}>
                                                Profile
                                            </Link>
                                        </Dropdown.Item>
                                        <div className={css("mt-5", "text-base")}>
                                            <Dropdown.Item>
                                                <div onClick={() => disconnect()}
                                                     className={css("cursor-pointer", "text-right", "font-bold", linkStyles)}>
                                                    Disconnect
                                                </div>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <div
                                                    className={css("flex", "items-center", "space-x-2", "cursor-pointer", "justify-between", "font-bold", linkStyles)}
                                                    onClick={openChainModal}>
                                                    <div>
                                                        network:
                                                    </div>
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
}

export const BackOrHomeButton: React.FC<{type?: ButtonType}> = ({type = ButtonType.Primary}) => {
  const router = useRouter()
  return <div className={css("mb-8")}>
    <Button onClick={() => {
      if (document && document.referrer) {
        router.back()
      } else {
        router.push("/")
      }
    }} type={type}>
      <BsArrowLeft size={15}/>
    </Button>
  </div>
}

export default Button
