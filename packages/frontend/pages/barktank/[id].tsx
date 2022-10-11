import {GetServerSideProps} from "next";
import Head from "next/head"
import React from "react";
import {css} from "../../helpers/css";
import Button, {BackOrHomeButton} from "../../components/Button/Button";
import {AirtableSubmissionProject} from "../../interfaces";
import PageLayout from "../../layouts/Page/Page.layout";
import ColoredText from "../../components/ColoredText/ColoredText";
import Link from "../../components/Link/Link";
import {jsonify} from "../../helpers/strings";
import {oldBarkTankItems} from "../../constants";

interface BarkTankProjectProps {
    project: AirtableSubmissionProject
}

const BarkTankProject: React.FC<BarkTankProjectProps> = ({project}) => {
    return <PageLayout>
        <Head>
            <title>The Doge NFT | {project.projectName}</title>
        </Head>
        <div>
          <BackOrHomeButton />
          <div className={css("mt-4", "text-2xl", "max-w-3xl", "m-auto")}>
                <div className={css("flex", "justify-center", "text-4xl", "font-bold")}>
                    <ColoredText>{project.projectName}</ColoredText>
                </div>
                <div className={css("mt-10")}>
                    {project.imageUrl && <div>
                      <img alt={"bark_tank_image"} className={css("border-solid", "border-2", "border-black", "max-w-3xl", "w-full")} src={project.imageUrl}/>
                    </div>}
                    <div className={css("grid", "md:grid-cols-10", "mt-10", "grid-cols-1")}>
                        <div className={css("font-bold", "col-span-2")}>Description:</div>
                        <div className={css("col-span-8")}>{project.description}</div>
                    </div>
                    {project.link && <div className={css("grid", "grid-cols-10", "mt-6")}>
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
    const project = oldBarkTankItems.filter(item => item.id === id)[0]
    if (!project) {
        throw new Error("Could not find project")
    }
    return {
        props: {
            project: project
        }
    }
}


export default BarkTankProject


