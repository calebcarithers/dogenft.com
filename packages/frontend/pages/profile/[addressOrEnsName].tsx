import React, {useEffect, useMemo} from "react";
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

interface ProfileProps {
    address: string;
    ens?: string | null;
}

const Profile: React.FC<ProfileProps> = observer(({address, ens}) => {
    const router = useRouter()
    const store = useMemo(() => new ProfileStore(address), [address])
    useEffect(() => {
        store.init()
    }, [])
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
            <div className={css("mt-4", "text-2xl", "max-w-3xl", "m-auto", "flex", "justify-center")}>
                <div className={css("flex", "flex-col", "items-center")}>
                    <div className={css("font-bold")}>{abbreviate(address)}</div>
                    {ens && <div className={css("text-lg")}>{ens}</div>}
                </div>
            </div>
            <div className={css("grid", "grid-cols-1", "md:grid-cols-2", "xl:grid-cols-3", "mt-14", "gap-10")}>
                <Pane title={"$DOG"}>
                    <div className={css("text-4xl")}>
                        {store.dogBalance}
                    </div>
                </Pane>
                <Pane title={"Pixels"}>
                    <div>
                        {jsonify(store.pixels)}
                    </div>
                </Pane>
                <Pane title={"Fast Food Doges"}>
                    <div>
                        {jsonify(store.fastFoodDoges)}
                    </div>
                </Pane>
            </div>
        </div>
    </PageLayout>
})

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
