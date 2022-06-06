import {chain, configureChains, createClient} from "wagmi";
import {getDefaultWallets} from "@rainbow-me/rainbowkit";
import {publicProvider} from "wagmi/providers/public";
import {infuraProvider} from "wagmi/providers/infura";
import {vars} from "../environment/vars";


const { chains, provider } = configureChains(
    [chain.mainnet, chain.rinkeby],
    [
        infuraProvider({ infuraId: vars.NEXT_PUBLIC_INFURA_ID }),
        publicProvider()
    ]
);

const { connectors } = getDefaultWallets({
    appName: 'The Doge NFT',
    chains
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})


export {chains, wagmiClient}
