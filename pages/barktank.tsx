import airtable from "../services/Airtable";
import {AirtableSubmissionProject} from "../interfaces";
import {GetServerSideProps} from "next";
import React from "react";
import {jsonify} from "../helpers/strings";
import {css} from "../helpers/css";
import Link, {LinkSize} from "../components/Link/Link";
import Head from "next/head";
import NavItem from "../components/NavItem/NavItem";
import BarkTankItem from "../components/BarkTankItem/BarkTankItem";
import Button from "../components/Button/Button";
import {BsArrowLeft} from "react-icons/bs";
import PageLayout from "../layouts/Page/Page.layout";
import {useRouter} from "next/router";
import ColoredText from "../components/ColoredText/ColoredText";

interface BarktankProps {
  projects: AirtableSubmissionProject[]
}

const Barktank: React.FC<BarktankProps> = ({projects}) => {
  const router = useRouter()
  return <PageLayout>
    <Head>
      <title>The Doge NFT | Bark Tank</title>
    </Head>
    <div className={css("flex", "gap-5", "flex-col", "mb-28")}>
      <div className={css("mb-8")}>
        <Button onClick={() => router.push("/")}>
          <BsArrowLeft size={15}/>
        </Button>
      </div>

      <div className={css("flex", "justify-center", "text-4xl")}>
        <div className={css("relative", "font-bold")}>
          <div className={css("absolute", "text-2xl")} style={{top: "50%", left: -35, transform: "translateY(-50%)"}}>✨</div>
          <ColoredText>The Bark Tank</ColoredText>
          <div className={css("absolute", "text-2xl")} style={{top: "50%", right: -35, transform: "translateY(-50%)"}}>✨</div>
        </div>
      </div>

      <div className={css("flex", "flex-col","justify-center", "items-center")}>
        <div className={css("text-center", "md:text-3xl", "p-2", "max-w-3xl", "text-xl")}>
          Backed by the DOG Community Fund, the Bark Tank acts as an incubator for any and all Doge related projects. Pitch your
          idea and get funded today!
        </div>
        <div className={css("mt-3")}>
          <Button onClick={() => window.open("https://airtable.com/shrRPV5wZdTUNhmn2", "_blank")}>
            <div className={css("text-base")}>apply</div>
          </Button>
        </div>
      </div>

      <div className={css("flex", "justify-center", "mt-6")}>
        <div className={css("flex", "flex-col", "max-w-4xl", "w-full", "space-y-5", "md:text-2xl", "text-lg")}>
          <div className={css("border-dashed", "border-b-2", "inline-block", "border-pixels-yellow-200")}>
            Projects
          </div>
          {projects.map(project => <BarkTankItem key={project.projectName} project={project}/>)}
        </div>
      </div>
    </div>
  </PageLayout>
}


export const getServerSideProps: GetServerSideProps<BarktankProps> = async () => {
  const projects = await airtable.getProjects()
  return {
    props: {
      projects: JSON.parse(jsonify(projects))
    }
  }
}

export default Barktank
