import {GetServerSideProps} from "next";
import airtable from "../../services/airtable";
import Head from "next/head"
import {BsArrowLeft, BsGrid} from "react-icons/bs";
import React, { useEffect, useRef } from "react";
import {useRouter} from "next/router";
import {css} from "../../helpers/css";
import Button from "../../components/Button/Button";
import {AirtableSubmissionProject} from "../../interfaces";
import PageLayout from "../../layouts/Page/Page.layout";
import ColoredText from "../../components/ColoredText/ColoredText";
import Link from "../../components/Link/Link";
import {jsonify} from "../../helpers/strings";
import { FramedImage } from "../../components/Home/HomeItems";

// interface BarkTankProjectProps {
//     project: AirtableSubmissionProject
// }

const METDATAS = [
    {
        id: 1,
        name: "Cool Doge",
        url: "/videos/soulbound1.mp4",
    },
    {
        id: 2,
        name: "Skydancer Doge",
        url: "/videos/soulbound2.mp4",
    },
    {
        id: 3,
        name: "Slinky Doge",
        url: "/videos/soulbound3.mp4",
    },
    {
        id: 4,
        name: "Breakdancing Doge",
        url: "/videos/soulbound4.mp4",
    },
]

const SoulBound: React.FC = () => {
    const router = useRouter()
    const videoRef = useRef<HTMLVideoElement | null>(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    }, [])
    return <PageLayout>
        <Head>
            <title>The Doge NFT </title>
        </Head>
        <div>
            <div className={css("mb-8")}>
                <Button onClick={() => router.push("/barktank")}>
                    <BsArrowLeft size={15}/>
                </Button>
            </div>
            <div className={css("mt-4", "text-2xl", "max-w-3xl", "m-auto")}>
                <div className={css("flex", "justify-center", "text-4xl", "font-bold")}>
                    <ColoredText>Test</ColoredText>
                </div>
                <div className="two-column">
                    {
                        METDATAS.map( metadata=> {
                            return (
                                <div>
                                    <video  className={css("w-full")} autoPlay={true} loop muted ref={videoRef}>
                                        <source src={metadata.url} key={metadata.id} />
                                    </video>
                                    <div className="text-center">{metadata.name}</div>
                                </div>
                            )
                        })
                    }
                 
                </div>
               
            </div>
        </div>
    </PageLayout>
}

// export const getServerSideProps: GetServerSideProps<BarkTankProjectProps> = async (context) => {
//     const id = context.params?.id
//     const project = await airtable.getProject(id as string)
//     if (!project) {
//         throw new Error("Could not find project")
//     }

//     return {
//         props: {
//             project: JSON.parse(jsonify(project))
//         }
//     }
// }


export default SoulBound


