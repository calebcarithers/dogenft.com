import React from "react";
import {useRouter} from "next/router";
import PageLayout from "../../layouts/Page/Page.layout";
import Head from "next/head";
import {css} from "../../helpers/css";
import Button from "../../components/Button/Button";
import {BsArrowLeft} from "react-icons/bs";
import {GetServerSideProps} from "next";
import {abbreviate, isValidEthereumAddress, jsonify} from "../../helpers/strings";
import {ethers} from "ethers";

interface ProfileProps {
    address: string;
    ens?: string | null
}

const ProfileAddress: React.FC<ProfileProps> = ({address, ens}) => {
    const router = useRouter()
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
                <div className={css("font-bold")}>{abbreviate(address)}</div>
                {ens && <div>{ens}</div>}
            </div>
        </div>
    </PageLayout>
}

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (context) => {
    const provider = ethers.getDefaultProvider("rinkeby")
    const address = context.params?.address as string
    let ens
    if (!address) {
        throw new Error("Must provide an address")
    } else if (!isValidEthereumAddress(address)) {
        const queriedAddress = await provider.resolveName(address)
        if (!queriedAddress) {
            throw new Error("Could not find address")
        }
    } else {
        ens = await provider.lookupAddress(address)
        console.log("debug:: ens name", ens)
    }
    return {
        props: {
            address,
            ens
        }
    }
}

export default ProfileAddress
