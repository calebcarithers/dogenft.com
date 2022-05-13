import {GetServerSideProps} from "next";
import {AirtableSubmissionProject} from "../../interfaces";
import airtable from "../../services/Airtable";
import {jsonify} from "../../helpers/strings";
import PageLayout from "../../layouts/Page/Page.layout";
import Head from "next/head"
import Button from "../../components/Button/Button";
import {BsArrowLeft} from "react-icons/bs";
import React from "react";
import {useRouter} from "next/router";
import {css} from "../../helpers/css";
import ColoredText from "../../components/ColoredText/ColoredText";
import Link from "../../components/Link/Link";

interface BarkTankProjectProps {
    project: AirtableSubmissionProject
}

const BarkTankProject: React.FC<BarkTankProjectProps> = ({project}) => {
    const router = useRouter()
    return <PageLayout>
        <Head>
            <title>The Doge NFT | {project.projectName}</title>
        </Head>
        <div>
            <div className={css("mb-8")}>
                <Button onClick={() => router.push("/barktank")}>
                    <BsArrowLeft size={15}/>
                </Button>
            </div>
            <div className={css("mt-4", "text-2xl", "max-w-3xl", "m-auto")}>
                <div className={css("flex", "justify-center", "text-4xl", "font-bold")}>
                    <ColoredText>{project.projectName}</ColoredText>
                </div>
                <div className={css("mt-10")}>
                    {project.imageUrl && <div>
                      <img alt={"bark_tank_image"} className={css("border-solid", "border-2", "border-black", "max-w-3xl", "w-full")} src={project.imageUrl}/>
                    </div>}
                    <div className={css("grid", "grid-cols-10", "mt-10")}>
                        <div className={css("font-bold", "col-span-2")}>Description:</div>
                        <div className={css("col-span-8")}>{project.description}</div>
                    </div>
                    {project.link && <div className={css("grid", "grid-cols-10")}>
                        <div className={css("font-bold", "col-span-2")}>Link:</div>
                        <div className={css("col-span-8")}>
                            <Link isExternal href={project.link}>{project.link}</Link>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    </PageLayout>
}

export const getServerSideProps: GetServerSideProps<BarkTankProjectProps> = async (context) => {
    const id = context.params?.id
    const project = await airtable.getProject(id as string)
    if (!project) {
        throw new Error("Could not find project")
    }

    console.log(project)
    return {
        props: {
            project: JSON.parse(jsonify(project))
        }
    }
}


export default BarkTankProject


