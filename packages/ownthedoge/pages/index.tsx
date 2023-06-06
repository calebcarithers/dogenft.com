import Link from "dsl/components/Link/Link";
import Modal from "dsl/components/Modal/Modal";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
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
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(true);
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
        isOpen={isOpen}
        title={"✨ Doge x Bad Luck Brian ✨"}
        onChange={(isOpen) => setIsOpen(isOpen)}
      >
        <Link
          isExternal
          href={
            "https://zora.co/collect/0x36daf12d18b00389bac65b04bdc9013b1b3514d7"
          }
        >
          <Image
            className={css("border-[2px]", "border-black", "border-solid")}
            width={2008}
            height={1340}
            alt={"blbxdoge"}
            src={
              "https://remote-image.decentralized-content.com/image?url=https%3A%2F%2Fipfs.decentralized-content.com%2Fipfs%2Fbafybeifhoqhlgphgva25g55p7r5rzc4pqkseda77lgvkfhdd6ntw5lwqy4&w=3840&q=75"
            }
          />
        </Link>
        <div className={css("text-2xl", "text-center")}>
          Kabosu and Bad Luck Brian meet in Japan! Mint this historic moment on{" "}
          <Link
            isExternal
            href={
              "https://zora.co/collect/0x36daf12d18b00389bac65b04bdc9013b1b3514d7"
            }
          >
            Zora
          </Link>
          !
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
