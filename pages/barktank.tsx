import airtable from "../services/Airtable";
import {FundedProject} from "../interfaces";
import {GetServerSideProps} from "next";
import React from "react";
import {jsonify} from "../helpers/strings";
import {css} from "../helpers/css";
import Link from "../components/Link/Link";

interface BarktankProps {
  fundedProjects: FundedProject[]
}

const Barktank: React.FC<BarktankProps> = ({fundedProjects}) => {
  return <div className={css("flex", "gap-5", "flex-col")}>
    <div>
      <Link href={"/"}>Back</Link>
    </div>
    {fundedProjects.map(project => <div key={project.projectName} className={css("text-xl", "mb-3")}>
      {/*{jsonify(project)}*/}
      <div>
        {project.projectName} :: {project.cost} :: FUNDED
      </div>
      <div>
        {project.idea}
      </div>
    </div>)}
  </div>
}


export const getServerSideProps: GetServerSideProps<BarktankProps> = async () => {
  const fundedProjects = await airtable.getFundedProjects(100)
  return {
    props: {
      fundedProjects: JSON.parse(jsonify(fundedProjects))
    }
  }
}

export default Barktank
