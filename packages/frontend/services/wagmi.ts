import {chain, configureChains, createClient} from "wagmi";
import {getDefaultWallets} from "@rainbow-me/rainbowkit";
import {publicProvider} from "wagmi/providers/public";
import {infuraProvider} from "wagmi/providers/infura";
import {vars} from "../environment/vars";
import {isProduction} from "../environment";

export const targetChain = isProduction() ? chain.mainnet : chain.rinkeby

const { chains, provider } = configureChains(
    [targetChain],
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
