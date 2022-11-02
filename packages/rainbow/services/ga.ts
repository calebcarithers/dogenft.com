export enum GaActions {
    DonateButtonClick = "DONATE_BUTTON_CLICK",
    RainbowSwapButtonClick = "RAINBOW_BUTTON_CLICK",
    EthereumAddressCopy = "ETHEREUM_ADDRESS_COPY",
    DogecoinAddressCopy = 'DOGECOIN_ADDRESS_COPY',
}

export const gaEvent = ({action, params}: { action: GaActions, params: any }) => {
    if (window !== undefined) {
        //@ts-ignore
        window.gtag("event", action, params)
    }
}
