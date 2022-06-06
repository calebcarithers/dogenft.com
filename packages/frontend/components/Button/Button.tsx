import {css} from "../../helpers/css";
import {PropsWithChildren} from "react";
import {ConnectButton as RainbowConnectButton} from '@rainbow-me/rainbowkit';
import Dropdown from "../Dropdown/Dropdown";
import Link from "../Link/Link";
import {useDisconnect} from "wagmi";


const buttonStyles = css("p-2", "bg-pixels-yellow-100", "text-black", "font-bold", "disabled:bg-pixels-yellow-300",
    "disabled:active:translate-x-0.5", "disabled:active:translate-y-0.5", "disabled:text-pixels-yellow-400", "disabled:cursor-not-allowed", "disabled:border-pixels-yellow-400"
)

interface ButtonProps {
    onClick?: () => void;
    block?: boolean;
    disabled?: boolean
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({onClick, block, children, disabled = false}) => {
    return <div className={css("relative", "inline-block", "z-10", "h-fit", {"w-full": block})}>
        <button disabled={disabled} onClick={onClick && onClick}
                className={css(buttonStyles, "active:translate-x-1", "active:translate-y-1", "border-2", "border-black", "border-solid", {"w-full": block})}>
            {children}
        </button>
        <div aria-disabled={disabled}
             className={css("absolute", "bg-black", "w-full", "h-full", {"bg-pixels-yellow-400": disabled})}
             style={{top: "6px", left: "6px", zIndex: -1}}/>
    </div>
}

export const ConnectButton: React.FC<PropsWithChildren<any>> = () => {
    const {disconnect} = useDisconnect()
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
                                    <Dropdown trigger={<Button>
                                        {account.displayName}
                                    </Button>}>
                                        <Dropdown.Item>
                                            <Link href={`/profile/${account.address}`}>Profile</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <div onClick={openAccountModal}>
                                                <div onClick={() => disconnect()}
                                                     className={css("cursor-pointer")}>Disconnect
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                        <div className={css("mt-5")}>
                                            <Dropdown.Item>
                                                <div className={css("flex", "items-center", "space-x-2", "cursor-pointer", "justify-end")}
                                                     onClick={openChainModal}>
                                                    <div>
                                                        network:
                                                    </div>
                                                    <div className={css("flex", "items-center")}>
                                                        {chain.hasIcon && (
                                                            <div
                                                                style={{
                                                                    background: chain.iconBackground,
                                                                    width: 12,
                                                                    height: 12,
                                                                    borderRadius: 999,
                                                                    overflow: 'hidden',
                                                                    marginRight: 4,
                                                                }}
                                                            >
                                                                {chain.iconUrl && (
                                                                    <img
                                                                        alt={chain.name ?? 'Chain icon'}
                                                                        src={chain.iconUrl}
                                                                        style={{width: 12, height: 12}}
                                                                    />
                                                                )}
                                                            </div>
                                                        )}
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
