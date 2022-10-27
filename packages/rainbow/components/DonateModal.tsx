import Button from "dsl/components/Button/Button"
import { Divider } from "dsl/components/Divider/Divider"
import Modal from "dsl/components/Modal/Modal"
import { css } from "dsl/helpers/css"
import Image from "next/image"
import { useMemo } from "react"
import { BsArrowLeft } from "react-icons/bs"
import QRCode from "react-qr-code"
import { DonationCurrency, DonationModalView, useAppStore } from "../store/app.store"

const DonateModal = () => {
    const state = useAppStore((state) => state)
    return <Modal title={"✨ Donate ✨"} isOpen={state.isDonateDialogOpen} onChange={(isOpen) => {
        if (!isOpen) {
            state.resetModalState()
        }
        state.setIsDonateDialogOpen(isOpen)
    }}>
        <div className={css("relative")}>
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
                {state.donationModalView === DonationModalView.Donate && <DonateView />}
                {state.donationModalView === DonationModalView.Warning && <WarningView />}
                {state.donationModalView === DonationModalView.Address && <AddressView />}
            </div>
        </div>
  </Modal>
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
                    <Image layout={"responsive"} width={100} height={100} src={"/images/ethereum.svg"} alt={"ethereum"}/>
                </div>
                <div className={css("text-3xl", "font-normal", "p-3")}>Ethereum</div>
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
                    <Image layout={"responsive"} width={100} height={100} src={"/images/dogecoin.svg"} alt={"dogecoin"}/>
                </div>
                <div className={css("text-3xl", "font-normal", "p-3")}>Dogecoin</div>
            </div>
        </Button>              
    </div>
    </div>
}

const WarningView = () => {
    const state = useAppStore(state => state)

    const description = useMemo(() => {
        if (state.donationModalCurrency === DonationCurrency.Ethereum) {
            return "Please only send ETH or ERC-20's to the following address."
        } else if (state.donationModalCurrency === DonationCurrency.Dogecoin) {
            return "Please only send Dogecoin to the following address."
        }
    }, [state.donationModalCurrency])

    return <div className={css("flex", "flex-col", "gap-6")}>
        <div className={css("flex", "justify-center")}>
            <div className={css("max-w-[150px]", "relative", "w-full", "inline-block", "border-2", "border-black")}>
                <Image layout={"responsive"} width={100} height={100} src={"/images/doge-actually.jpeg"} alt={"doge actually"}/>
            </div>
        </div>
        <div className={css("text-2xl", "text-center")}>
            {description}
        </div>
        <Button block onClick={() => state.setDonationModalView(DonationModalView.Address)}>
            <div className={css("p-3", "text-xl")}>Got it</div>
        </Button>
    </div>
}

const AddressView = () => {
    const state = useAppStore(state => state)
    const depositAddress = useMemo(() => {
        return state.donationModalCurrency === DonationCurrency.Ethereum ? state.ethereumDonationAddress : state.dogeDonationAddress
    }, [state.donationModalCurrency, state.ethereumDonationAddress, state.dogeDonationAddress])

    return <div>
        <div className={css("p-4", "font-bold", "text-lg", "flex", "flex-col", "items-center", "gap-4")}>
            {/* <div className={css("font-normal", "underline")}>
                {state.donationModalCurrency}
            </div> */}
            <div className={css("p-5", "border-2", "border-pixels-yellow-400", "border-dashed", "max-w-fit", "bg-pixels-yellow-200")}>
                <QRCode value={depositAddress} style={{display: "inline-block"}}/>
            </div>
            <div>
                {depositAddress}
            </div>
        </div>
    </div>
}

export default DonateModal