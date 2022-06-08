import React, {PropsWithChildren, useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import PageLayout from "../../layouts/Page/Page.layout";
import Head from "next/head";
import {css} from "../../helpers/css";
import Button from "../../components/Button/Button";
import {BsArrowLeft} from "react-icons/bs";
import {GetServerSideProps} from "next";
import {abbreviate, isValidEthereumAddress, jsonify} from "../../helpers/strings";
import {ethers} from "ethers";
import Pane from "../../components/Pane/Pane";
import ProfileStore from "../../stores/Profile.store";
import {observer} from "mobx-react-lite";
import Link, {LinkType} from "../../components/Link/Link";
import Pixel from "../../components/Pixel/Pixel";
import ColoredText from "../../components/ColoredText/ColoredText";

interface ProfileProps {
    address: string;
    ens?: string | null;
}


const Profile: React.FC<ProfileProps> = observer(({address, ens}) => {
    const router = useRouter()
    const store = useMemo(() => new ProfileStore(address), [address])
    useEffect(() => {
        store.init()
    }, [address])
    return <PageLayout>
        <Head>
            <title>The Doge NFT | Profile</title>
        </Head>
        <div>
            <div className={css("mb-8")}>
                <Button onClick={() => router.push("/")}>
                    <BsArrowLeft size={15}/>
                </Button>
            </div>
            <div className={css("mt-4", "text-3xl", "max-w-3xl", "m-auto", "flex", "justify-center")}>
                <div className={css("flex", "flex-col", "items-center")}>
                    <div className={css("relative")}>
                        <div className={css("absolute", "text-2xl")} style={{top: "50%", left: -35, transform: "translateY(-50%)"}}>✨</div>
                        <ColoredText bold>
                            {abbreviate(address)}
                        </ColoredText>
                        <div className={css("absolute", "text-2xl")} style={{top: "50%", right: -35, transform: "translateY(-50%)"}}>✨</div>
                    </div>

                    {ens && <div className={css("text-xl", "font-bold", "text-pixels-yellow-500")}>{ens}</div>}
                    <div
                        className={css("flex", "flex-col", "items-center", "pt-3", "mt-3", "border-t-2", "border-dashed", "border-pixels-yellow-200")}>
                        <div className={css("text-2xl")}>{store.dogBalance ? store.dogBalance : "---"}</div>
                        <div className={css("text-xl")}>$DOG</div>
                    </div>
                </div>
            </div>
            <div className={css("grid", "grid-cols-1", "lg:grid-cols-3", "mt-14", "gap-10")}>
                <Pane title={<Title title={"Pixels"} count={store.pixels.length}/>}>
                    <MaxHeightThing>
                        {store.hasPixels && <div className={css("flex", "flex-wrap", "gap-5", "justify-center")}>
                            {store.pixels.map(token => {
                                const x = token.metadata.attributes.filter((attr: any) => attr.trait_type === "X Coordinate")[0].value
                                const y = token.metadata.attributes.filter((attr: any) => attr.trait_type === "Y Coordinate")[0].value
                                const color = token.metadata.attributes.filter((attr: any) => attr.trait_type === "Hex")[0].value
                                return <div key={`pixels-${token.tokenId}`} className={css("flex", "space-x-4")}>
                                    <Pixel id={token.tokenId} x={x} y={y} color={color}/>
                                </div>
                            })}
                        </div>}
                        {!store.hasPixels && <NoneFound>
                          <div>
                            <div>No pixels found</div>
                            <Link type={LinkType.Secondary} href={"https://pixels.ownthedoge.com/"} isExternal
                                  showExternalIcon>Mint
                              here</Link>
                          </div>
                        </NoneFound>}
                    </MaxHeightThing>
                </Pane>
                <Pane title={<Title title={"Fast Food Doges"} count={store.fastFoodDoges.length}/>}>
                    <MaxHeightThing>
                        {store.hasFfds && <div className={css("flex", "flex-wrap", "space-x-6", "justify-center")}>
                            {store.fastFoodDoges.map(token => <FastFoodDoges token={token}/>)}

                        </div>}
                        {!store.hasFfds && <NoneFound>
                          <div>
                            <div>No fast food doges found</div>
                            <Link type={LinkType.Secondary} href={"https://opensea.io/collection/fastfooddoge"} isExternal
                                  showExternalIcon>Buy here</Link>
                          </div>
                        </NoneFound>}
                    </MaxHeightThing>
                </Pane>
                <Pane title={<Title title={"Doggos"} count={store.doggos.length}/>}>
                    <MaxHeightThing>
                        {store.hasDoggos && <div>
                            {store.doggos.map(doggo => jsonify(doggo))}
                        </div>}
                        {!store.hasDoggos && <NoneFound>
                          <div>
                            <div>
                              No Doggos found
                            </div>
                            <Link type={LinkType.Secondary} href={"https://opensea.io/collection/doggos-for-dog-owners"}
                                  isExternal showExternalIcon>
                              Buy here
                            </Link>
                          </div>
                        </NoneFound>}
                    </MaxHeightThing>
                </Pane>
            </div>
        </div>
    </PageLayout>
})

const MaxHeightThing: React.FC<PropsWithChildren<{}>> = ({children}) => {
    return <div className={css("overflow-y-scroll", "flex", "flex-col", "flex-grow")}>
        <div className={css("flex-grow", "flex", "justify-center", "overflow-x-hidden")} style={{maxHeight: "500px"}}>
            {children}
        </div>
    </div>
}

const Title: React.FC<any> = ({title, count}) => {
    return <div className={css("flex", "space-x-2")}>
        <div className={css("text-black")}>{title}</div>
        <div className={css("text-pixels-yellow-400")}>({count})</div>
    </div>
}

const NoneFound: React.FC<PropsWithChildren<{}>> = ({children}) => {
    return <div className={css("my-8", "text-center", "text-xl", "font-bold", "text-pixels-yellow-400", "flex", "items-center")}>
        {children}
    </div>
}

const FastFoodDoges: React.FC<any> = ({token}) => {
    const maxWidth = 200
    const isBaby = token.metadata.isBaby
    const [showMetadata, setShowMetadata] = useState(false)
    return <div key={`FFD-${token.tokenId}`} className={css("flex", "flex-col", "space-y-4")}
                style={{maxWidth}}>
        <div>
            <img className={css("border-black", "border-2")} src={token.metadata.image}
                 style={{maxWidth}}/>
            <div className={css("flex", "justify-between", "items-center", "mt-1")}>
                <div>#{token.tokenId}</div>
                <div
                    className={css("text-black", "px-1", "border-2", "border-dashed", "border-pixels-yellow-200", "rounded", "font-bold", {
                        "bg-yellow-400": !isBaby,
                        "text-yellow-800": !isBaby,
                        "bg-blue-400": isBaby,
                        "text-blue-800": isBaby
                    })}>
                    {token.metadata.isBaby ? "baby" : "adult"}
                </div>
            </div>
            <div>
                {showMetadata && token.metadata.attributes.map((attr: any) => <div
                    className={css("grid", "grid-cols-2")}>
                    <div>{attr.trait_type}</div>
                    <div>{attr.value}</div>
                </div>)}
            </div>
        </div>
    </div>
}

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (context) => {
    let ens, validatedAddress
    const provider = ethers.getDefaultProvider("mainnet")
    const addressOrEnsName = context.params?.addressOrEnsName as string

    if (!addressOrEnsName) {
        throw new Error("Must provide an address")
    } else if (!isValidEthereumAddress(addressOrEnsName)) {
        try {
            const queriedAddress = await provider.resolveName(addressOrEnsName)
            if (!queriedAddress) {
                throw new Error("No address found")
            }
            validatedAddress = queriedAddress
            ens = addressOrEnsName
        } catch (e) {
            throw new Error("Could not find address")
        }
    } else {
        validatedAddress = addressOrEnsName
        try {
            ens = await provider.lookupAddress(addressOrEnsName)
        } catch (e) {
            console.error("could not get ens name")
        }
    }

    return {
        props: {
            address: validatedAddress,
            ens: ens ? ens : null,
        }
    }
}

export default Profile
