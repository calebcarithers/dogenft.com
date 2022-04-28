import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import {css} from "../helpers/css";
import Button from "../components/Button/Button";
import NavItem from "../components/NavItem/NavItem";
import React, {useCallback, useEffect, useState} from "react";
import Image from "next/image"
import {vars} from "../environment/vars";
import HomeItems, {navItems} from "../components/Home/HomeItems";
import airtable from "../services/Airtable";
import {jsonify} from "../helpers/strings";
import {AirtableSubmissionProject} from "../interfaces";
import {useRouter} from "next/router";
import HomeLayout, {Footer, useNavContext} from "../layouts/home.layout";

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
        <Page projects={projects}/>
      </HomeLayout>
    </>
  )
}

const Page = ({projects}: {projects: any}) => {
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
