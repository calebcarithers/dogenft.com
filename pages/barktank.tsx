import airtable from "../services/Airtable";
import {FundedProject} from "../interfaces";
import {GetServerSideProps} from "next";
import React from "react";
import {jsonify} from "../helpers/strings";
import {css} from "../helpers/css";

interface BarktankProps {
  fundedProjects: FundedProject[]
}

const Barktank: React.FC<BarktankProps> = ({fundedProjects}) => {
  return <div className={css("flex", "gap-5", "flex-col")}>
    {/*{fundedProjects.map(project => <div>*/}
    {/*  {jsonify(project)}*/}
    {/*</div>)}*/}
  </div>
}


export const getServerSideProps: GetServerSideProps<BarktankProps> = async () => {
  const fundedProjects = await airtable.getFundedProjects()
  return {
    props: {
      fundedProjects: JSON.parse(jsonify(fundedProjects))
    }
  }
}

export default Barktank
