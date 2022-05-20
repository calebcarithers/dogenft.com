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
import {Footer} from "../components/Footer/Footer";
import {useRouter} from "next/router";
import {actionLinks, chains, readLinks, socialLinks} from "../components/Footer/Links";
import Link, {LinkSize, LinkType} from "../components/Link/Link";
import Modal from "../components/Modal/Modal";

interface HomeProps {
    projects: AirtableSubmissionProject[]
}

const Home: NextPage<HomeProps> = ({projects}) => {
    return (
        <>
            <Head>
                <title>The Doge NFT</title>
                <meta name="description" content="The Doge NFT"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <HomeLayout>
                <HomeContent projects={projects}/>
            </HomeLayout>
        </>
    )
}

const HomeContent = ({projects}: { projects: any }) => {
    const [_, setNavSelection] = useNavContext()
    const [fullSize, setFullSize] = useState(0)
    const router = useRouter()
    const {wow} = router.query

    const containerRef = useCallback<any>((node: HTMLDivElement) => {
        if (node) {
            setFullSize(node.clientHeight)
            window.addEventListener('resize', () => {
                setFullSize(node.clientHeight)
            })
            if (wow) {
                setTimeout(() => {
                    console.log("debug:: wow", wow)
                    document.getElementById(wow as string)?.scrollIntoView({behavior: "smooth"})
                }, 200)
            }
        }
    }, [])

    return <div
        className={css("md:col-span-8", "xl:col-span-9", "text-xl", "md:text-3xl", "overflow-x-hidden", "text-center", "flex-grow")}
        ref={containerRef}>
        <div style={{maxHeight: "300px"}}>
            <HomeItems projects={projects} height={fullSize} onIntersection={(id) => {
                setNavSelection(id)
                window.history.replaceState({
                    ...window.history.state,
                    as: `/?wow=${id}`,
                    url: `/?wow=${id}`
                }, '', `/?wow=${id}`);
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
