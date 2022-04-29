import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import {css} from "../helpers/css";
import React, {useCallback, useState} from "react";
import HomeItems from "../components/Home/HomeItems";
import airtable from "../services/Airtable";
import {jsonify} from "../helpers/strings";
import {AirtableSubmissionProject} from "../interfaces";
import HomeLayout from "../layouts/Home/Home.layout";
import {useNavContext} from "../layouts/Home/Nav";
import {Footer} from "../layouts/Home/Footer";

interface HomeProps {
  projects: AirtableSubmissionProject[]
}

const Home: NextPage<HomeProps> = ({projects}) => {
  return (
    <>
      <Head>
        <title>The Doge NFT</title>
        <meta name="description" content="The Doge NFT"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeLayout>
        <HomeContent projects={projects}/>
      </HomeLayout>
    </>
  )
}

const HomeContent = ({projects}: {projects: any}) => {
  const [_, setNavSelection] = useNavContext()
  const [fullSize, setFullSize] = useState(0)

  const containerRef = useCallback<any>((node: HTMLDivElement) => {
    if (node) {
      setFullSize(node.clientHeight)
      window.addEventListener('resize', () => {
        setFullSize(node.clientHeight)
      })
    }
  }, [])
  return <div className={css("col-span-9", "text-xl", "md:text-3xl", "overflow-x-hidden", "text-center", "flex-grow")} ref={containerRef}>
    <div style={{maxHeight: "300px"}}>
      <HomeItems projects={projects} height={fullSize} onIntersection={(id) => {
        setNavSelection(id)
        window.history.replaceState({ ...window.history.state, as: `/?wow=${id}`, url: `/?wow=${id}` }, '', `/?wow=${id}`);
      }}/>
      <Footer/>
    </div>
  </div>
}

export const getServerSideProps: GetServerSideProps<any> = async () => {
  const projects = await airtable.getProjects()
  return {
    props: {
      projects: JSON.parse(jsonify(projects))
    }
  }
}

export default Home
