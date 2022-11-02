import BottomSheet from "dsl/components/BottomSheet/BottomSheet"
import Button from "dsl/components/Button/Button"
import { Divider } from "dsl/components/Divider/Divider"
import Link from "dsl/components/Link/Link"
import Modal from "dsl/components/Modal/Modal"
import { css } from "dsl/helpers/css"
import Image from "next/image"
import { useMemo } from "react"
import { BsArrowLeft } from "react-icons/bs"
import { IoCopyOutline } from "react-icons/io5"
import QRCode from "react-qr-code"
import { toast } from "react-toastify"
import { GaActions, gaEvent } from "../services/ga"
import { DonationCurrency, DonationModalView, useAppStore } from "../store/app.store"

const DonateModal = () => {
    const state = useAppStore((state) => state)
    return <Modal title={"✨ Donate ✨"} isOpen={state.isDonateDialogOpen} onChange={(isOpen) => {
        if (!isOpen) {
            state.resetModalState()
        }
    }}>
        <DonateDialog/>
  </Modal>
}

export const DonateBottomSheet = () => {
    const state = useAppStore(state => state)
    return <BottomSheet 
        // defaultSnap={({minHeight}) => minHeight}
        open={state.isDonateDialogOpen} 
        onDismiss={() => state.resetModalState()}
    >
        <div className={css("text-4xl", "font-bold", "text-center")}>✨ Donate ✨</div>
        <DonateDialog/>
  </BottomSheet>
}

const DonateDialog = () => {
    const state = useAppStore((state) => state)
    return <div className={css("relative", "pb-6", "h-full")}>
    {state.donationModalView !== DonationModalView.Donate && <div
        className={css("cursor-pointer", "text-4xl", "inline-block", "absolute", "-top-[60px]", "active:translate-x-1", "active:translate-y-1")} 
    onClick={() => {
        let viewToSet = DonationModalView.Donate
        switch (state.donationModalView) {
            case DonationModalView.Warning:
                viewToSet = DonationModalView.Donate
                break
            case DonationModalView.Address:
                viewToSet = DonationModalView.Warning
                break
            default:
                viewToSet = DonationModalView.Donate
                break
        }
        state.setDonationModalView(viewToSet)
    }}>
        <BsArrowLeft />    
    </div>}
    <div className={css("mt-16")}>
        {/* <CSSTransition timeout={1000} classNames={"donate-modal"}> */}
            <>
                {state.donationModalView === DonationModalView.Donate && <DonateView />}
                {state.donationModalView === DonationModalView.Warning && <WarningView />}
                {state.donationModalView === DonationModalView.Address && <AddressView />}
            </>
        {/* </CSSTransition> */}
    </div>
</div>
}

const DonateView = () => {
    const state = useAppStore((state) => state)
    return <div className={css("flex", "flex-col", "items-center", "gap-8")}>
    <div className={css("w-full")}>
        <Button block onClick={() => {
            state.setDonationModalCurrency(DonationCurrency.Ethereum)
            state.setDonationModalView(DonationModalView.Warning)
        }}>
            <div className={css("flex", "items-center", "justify-center")}>
                <div className={css("max-w-[40px]", "relative", "w-full")}>
                    <Image layout={"responsive"} width={100} height={100} src={"/images/ethereum.svg"} alt={"ethereum"} priority/>
                </div>
                <div className={css("text-3xl", "font-normal", "p-3")}>ETH / ERC20s</div>
            </div>
        </Button>              
    </div>
    <div className={css("flex", "items-center", "w-full")}>
        <Divider/>
        <div className={css("text-2xl", "mx-6")}>or</div>
        <Divider/>
    </div>
    <div className={css("w-full")}>
        <Button block onClick={() => {
            state.setDonationModalCurrency(DonationCurrency.Dogecoin)
            state.setDonationModalView(DonationModalView.Warning)
        }}>
            <div className={css("flex", "items-center", "justify-center")}>
                <div className={css("max-w-[40px]", "relative", "w-full")}>
                    <Image layout={"responsive"} width={100} height={100} src={"/images/dogecoin.svg"} alt={"dogecoin"} priority/>
                </div>
                <div className={css("text-3xl", "font-normal", "p-3")}>Dogecoin</div>
            </div>
        </Button>              
    </div>
    <div className={css("flex", "items-center", "w-full")}>
        <Divider/>
        <div className={css("text-2xl", "mx-6")}>or</div>
        <Divider/>
    </div>
    <div className={css("w-full")}>
        <Link onClick={() => {
            gaEvent({action: GaActions.RainbowSwapButtonClick, params: {}})
        }} block isExternal href={"https://rnbwapp.com/campaign/doge?$web_only=true"}>
            <Button block>
                <div className={css("flex", "items-center", "justify-center", "flex-col", "md:flex-row")}>
                    <div className={css("text-3xl", "font-normal", "p-3")}>Buy $DOG on</div>
                    <div className={css("max-w-[150px]", "relative", "w-full", "mb-3", "md:mb-0")}>
                        <Image layout={"responsive"} width={192} height={45} src={"/images/rainbow-logo.png"} alt={"rainbow"} priority quality={100}/>
                    </div>
                </div>
            </Button>  
        </Link>            
    </div>
</div>
}

const WarningView = () => {
    const state = useAppStore(state => state)

    const description = useMemo(() => {
        if (state.donationModalCurrency === DonationCurrency.Ethereum) {
            return "Please only send ETH or ERC-20's to the following address on Mainnet."
        } else if (state.donationModalCurrency === DonationCurrency.Dogecoin) {
            return "Please only send Dogecoin to the following address."
        }
    }, [state.donationModalCurrency])

    return <div className={css("flex", "flex-col", "gap-6")}>
        <div className={css("flex", "justify-center")}>
            <div className={css("max-w-[250px]", "relative", "w-full", "inline-block", "border-2", "border-black")}>
                <Image layout={"responsive"} width={100} height={100} src={"/images/doge-actually.jpeg"} alt={"doge actually"} priority/>
            </div>
        </div>
        <div className={css("text-2xl", "text-center")}>
            {description}
        </div>
        <Button block onClick={() => state.setDonationModalView(DonationModalView.Address)}>
            <div className={css("p-3", "text-3xl")}>🆗</div>
        </Button>
    </div>
}

const AddressView = () => {
    const state = useAppStore(state => state)
    const depositDetails = useMemo(() => {
        if (state.donationModalCurrency === DonationCurrency.Ethereum) {
            return {
                address: state.ethereumDonationAddress,
                title: "ERC20's / ETH address",
                onCopy: () => gaEvent({action: GaActions.EthereumAddressCopy, params: {}})
            }
        } else if (state.donationModalCurrency === DonationCurrency.Dogecoin) {
            return {
                address: state.dogeDonationAddress,
                title: "Dogecoin address",
                onCopy: () => gaEvent({action: GaActions.DogecoinAddressCopy, params: {}})
            }
        }
    }, [state.donationModalCurrency, state.ethereumDonationAddress, state.dogeDonationAddress])

    return <div>
        <div className={css("p-4", "font-bold", "text-lg", "flex", "flex-col", "items-center", "gap-4")}>
            <div className={css("p-5", "border-2", "border-pixels-yellow-400", "border-dashed", "max-w-fit", "bg-pixels-yellow-200")}>
                <QRCode value={depositDetails!.address} style={{display: "inline-block"}}/>
            </div>
            <div className={css("mt-8")}>
                <div className={css("font-bold", "flex", "justify-between", "items-center")}>
                    <div className={css("text-2xl")}>{depositDetails?.title}</div>
                    <div className={css("cursor-pointer", "active:translate-x-[1px]", "active:translate-y-[1px]", "text-pixels-yellow-500")} onClick={() => {
                        try {
                            navigator.clipboard.writeText(depositDetails!.address).then(() => {
                                toast(`✅ ${depositDetails?.title} copied`, {toastId: `donate-${depositDetails?.address}`})
                            })
                            depositDetails?.onCopy()
                        } catch (e) {
                            throw new Error("Could not copy")
                        }
                    }}>
                        <IoCopyOutline size={22}/>
                    </div>
                </div>
                <div className={css("font-normal", "text-2xl", "break-all", "text-pixels-yellow-500", "mt-1", "select-text")}>
                    {depositDetails!.address}
                </div>
            </div>
        </div>
    </div>
}

export default DonateModal