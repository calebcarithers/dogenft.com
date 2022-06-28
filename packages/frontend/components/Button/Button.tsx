import {css} from "../../helpers/css";
import {PropsWithChildren, useEffect} from "react";
import {ConnectButton as RainbowConnectButton} from '@rainbow-me/rainbowkit';
import Dropdown from "../Dropdown/Dropdown";
import Link, {LinkSize, LinkType} from "../Link/Link";
import {useDisconnect} from "wagmi";
import React from "react"
import {useRouter} from "next/router";


const buttonStyles = css("p-2", "bg-pixels-yellow-100", "text-black", "font-bold", "disabled:bg-pixels-yellow-300",
    "disabled:active:translate-x-0.5", "disabled:active:translate-y-0.5", "disabled:text-pixels-yellow-400", "disabled:cursor-not-allowed", "disabled:border-pixels-yellow-400"
)

interface ButtonProps {
    onClick?: () => void;
    block?: boolean;
    disabled?: boolean
    rounded?: boolean
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
                                                              onClick,
                                                              block,
                                                              children,
                                                              disabled = false,
                                                              rounded = false
                                                          }) => {
    return <div className={css("relative", "inline-block", "z-10", "h-fit", {"w-full": block})}>
        <button disabled={disabled} onClick={onClick && onClick}
                className={css(buttonStyles, "active:translate-x-1", "active:translate-y-1", "border-2", "border-black", "border-solid", "hover:bg-yellow-400", {
                    "w-full": block,
                    "rounded-full": rounded
                })}>
            {children}
        </button>
        <div aria-disabled={disabled}
             className={css("absolute", "bg-black", "w-full", "h-full", {
                 "bg-pixels-yellow-400": disabled,
                 "rounded-full": rounded
             })}
             style={{top: "6px", left: "6px", zIndex: -1}}/>
    </div>
}

export const ConnectButton: React.FC<PropsWithChildren<any>> = () => {
    const router = useRouter()
    const {disconnect} = useDisconnect()
    const [isDropDownOpen, setIsDropDownOpen] = React.useState(false)
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
                                    <Button onClick={openConnectModal}>
                                        connect
                                    </Button>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <Button onClick={openChainModal}>
                                        Wrong network
                                    </Button>
                                );
                            }

                            return (
                                <div style={{display: 'flex', gap: 12}}>
                                    <Dropdown open={isDropDownOpen} onOpenChange={setIsDropDownOpen} trigger={<Button rounded>
                                        {account.displayName}
                                    </Button>}>
                                        <Dropdown.Item>
                                            <Link bold block href={`/profile/${account.address}`} size={LinkSize.xl} type={LinkType.Black}>
                                                Profile
                                            </Link>
                                        </Dropdown.Item>
                                        <div className={css("mt-5", "text-base")}>
                                            <Dropdown.Item>
                                                <div onClick={() => disconnect()} className={css("cursor-pointer", "text-right", "text-pixels-yellow-500", "font-bold", "hover:text-yellow-400")}>
                                                    Disconnect
                                                </div>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <div
                                                    className={css("flex", "items-center", "space-x-2", "cursor-pointer", "justify-between", "text-pixels-yellow-500", "font-bold", "hover:text-yellow-400")}
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

export default Button
