import Button from "dsl/components/Button/Button";
import Link from "dsl/components/Link/Link";
import Modal from "dsl/components/Modal/Modal";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Footer } from "../components/Footer/Footer";
import HomeItems from "../components/Home/HomeItems";
import { oldBarkTankItems } from "../constants";
import { css } from "../helpers/css";
import { AirtableSubmissionProject } from "../interfaces";
import HomeLayout from "../layouts/Home/Home.layout";
import { useNavContext } from "../layouts/Home/Nav";

interface HomeProps {
  projects: AirtableSubmissionProject[];
}

export const HomeContext = React.createContext<{
  projects: AirtableSubmissionProject[];
}>({ projects: [] });
export const useHomeContext = () => React.useContext(HomeContext);

const Home: NextPage<HomeProps> = ({ projects }) => {
  return (
    <>
      <Head>
        <title>The Doge NFT</title>
        <meta name="description" content="The Doge NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeLayout>
        <HomeContext.Provider value={{ projects: projects }}>
          <HomeContent />
        </HomeContext.Provider>
      </HomeLayout>
    </>
  );
};

const HomeContent = () => {
  const [_, setNavSelection] = useNavContext();
  const [fullSize, setFullSize] = useState(0);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => setShowModal(true), []);
  const router = useRouter();
  const { wow } = router.query;
  const containerRef = useCallback<any>((node: HTMLDivElement) => {
    if (node) {
      setFullSize(node.clientHeight);
      window.addEventListener("resize", () => {
        setFullSize(node.clientHeight);
      });
      if (wow) {
        setTimeout(() => {
          document
            .getElementById(wow as string)
            ?.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  }, []);
  return (
    <div
      className={css(
        "md:col-span-7",
        "xl:col-span-8",
        "text-xl",
        "md:text-3xl",
        "overflow-x-hidden",
        "text-center",
        "flex-grow"
      )}
      ref={containerRef}
    >
      <div style={{ maxHeight: "300px" }}>
        <HomeItems
          height={fullSize}
          onIntersection={(id) => {
            setNavSelection(id);
            window.history.replaceState(
              {
                ...window.history.state,
                as: `/?wow=${id}`,
                url: `/?wow=${id}`,
              },
              "",
              `/?wow=${id}`
            );
          }}
        />
        <Footer />
      </div>
      <Modal
        title={"🗣️ much announcement 🗣️"}
        onChange={(open) => setShowModal(open)}
        isOpen={showModal}
      >
        <div className={css("flex", "flex-col", "gap-5")}>
          <div className={css("w-full")}>
            <Link isExternal href={"https://meethedoge.com"} block>
              <Button block>
                <div className={css("text-3xl")}>meet the doge</div>
              </Button>
            </Link>
            <div
              className={css(
                "text-center",
                "mt-2",
                "text-lg",
                "text-pixels-yellow-500"
              )}
            >
              Your chance to meet Kabosu!
            </div>
          </div>
          <div className={css("w-full")}>
            <Link isExternal href={"https://muchwowfilm.com"} block>
              <Button block>
                <div className={css("text-3xl")}>much wow film</div>
              </Button>
            </Link>
            <div
              className={css(
                "text-center",
                "mt-2",
                "text-lg",
                "text-pixels-yellow-500"
              )}
            >
              See Kabosu on the big screen
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<any> = async () => {
  return {
    props: {
      projects: oldBarkTankItems,
    },
  };
};

export default Home;
