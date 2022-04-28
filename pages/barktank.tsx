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

interface BarktankProps {
  projects: AirtableSubmissionProject[]
}

const Barktank: React.FC<BarktankProps> = ({projects}) => {
  return <>
    <Head>
      <title>The Doge NFT | Bark Tank</title>
    </Head>
    <div className={css("flex", "gap-5", "flex-col", "mb-28")}>
      <div>
        <Link href={"/"}>Home</Link>
      </div>

      <div className={css("flex", "justify-center", "text-4xl")}>
        <NavItem isSelected>
          The Bark Tank
        </NavItem>
      </div>

      <div className={css("flex", "flex-col","justify-center", "items-center")}>
        <div className={css("text-center", "text-3xl", "p-2", "max-w-3xl")}>
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
        <div className={css("flex", "flex-col", "max-w-4xl", "w-full", "gap-5", "text-2xl")}>
          <div>
            Projects
          </div>
          {projects.map(project => <BarkTankItem onClick={(name) => alert(`open: ${name} page`)} key={project.projectName} project={project}/>)}
        </div>
      </div>
    </div>
  </>
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
