import {css} from "../../helpers/css";
import Image from "next/image";
import HomeFeature from "./HomeFeature";
import Link from "../Link/Link";
import HelperContent from "../HelperContent/HelperContent";
import styles from "./HomeItems.module.css"
import {useEffect} from "react";
import airtable from "../../services/Airtable";
import {AirtableSubmissionProject} from "../../interfaces";
import {jsonify} from "../../helpers/strings";
import BarkTankItem from "../BarkTankItem/BarkTankItem";
import Button from "../Button/Button";
import {useRouter} from "next/router";

const Doge= () => {
  return <div>
    <div className={css("relative", "z-10", "mx-5")}>
      <div
        className={css("relative", "w-full", "h-full", "hover:cursor-pointer", "active:translate-x-1", "active:translate-y-1", "m-auto", "flex-1", "border-2", "border-solid", "border-black")}
        style={{maxWidth: "700px"}}
      >
        <Image
          alt={"doge"}
          src={"/kabosu.png"}
          layout={"responsive"}
          width={640}
          height={480}
        />
      </div>
      {/*<div className={css("absolute", "bg-black", "w-full", "h-full")} style={{top: "6px", left: "6px", zIndex: -1}}/>*/}
    </div>
    <div className={css("mt-16", "px-16")}>
      The Mona Lisa of the internet, <Link isExternal href={"https://knowyourmeme.com/memes/doge"}>Doge</Link>, grew to infamy in the early {"2000's"} when Atsuko Sato posted 8 photos to <Link href={"https://kabochan.blog.jp/"} isExternal>her blog</Link> of her adopted Shiba Inu, Kabosu.</div>
  </div>
}

const DogeNFT = () => {
  return <div>
    <div className={css("flex", "flex-wrap", "gap-5")}>
      <div className={css("relative", "w-full", "m-auto", "flex-1", styles.overlapGrid)}>
        <Image alt={"doge"} src={'/kabosu.png'} layout={"responsive"} width={640} height={480}/>
        <Image alt={"frame"} src={'/frame.png'} layout={"responsive"} width={500} height={401}/>
      </div>
      <div className={css("relative", "w-full", "m-auto", "flex-1", styles.overlapGrid)}>
        <Image alt={"feisty"} src={'/feisty.png'} layout={"responsive"} width={640} height={480}/>
        <Image alt={"frame"} src={'/frame.png'} layout={"responsive"} width={500} height={401}/>
      </div>
      <div className={css("relative", "w-full", "m-auto", "flex-1", styles.overlapGrid)}>
        <Image alt={"yelling"} src={'/yelling.png'} layout={"responsive"} width={640} height={480}/>
        <Image alt={"frame"} src={'/frame.png'} layout={"responsive"} width={500} height={401}/>
      </div>
      <div className={css("relative", "w-full", "m-auto", "flex-1", styles.overlapGrid)}>
        <Image alt={"curious"} src={'/curious.png'} layout={"responsive"} width={640} height={480}/>
        <Image alt={"frame"} src={'/frame.png'} layout={"responsive"} width={500} height={401}/>
      </div>
      <div className={css("relative", "w-full", "m-auto", "flex-1", styles.overlapGrid)}>
        <Image alt={"angry"} src={'/angry.png'} layout={"responsive"} width={640} height={480}/>
        <Image alt={"frame"} src={'/frame.png'} layout={"responsive"} width={500} height={401}/>
      </div>
      <div className={css("relative", "w-full", "m-auto", "flex-1", styles.overlapGrid)}>
        <Image alt={"shocked"} src={'/shocked.png'} layout={"responsive"} width={640} height={480}/>
        <Image alt={"frame"} src={'/frame.png'} layout={"responsive"} width={500} height={401}/>
      </div>
      <div className={css("relative", "w-full", "m-auto", "flex-1", styles.overlapGrid)}>
        <Image alt={"sad"} src={'/sad.png'} layout={"responsive"} width={640} height={480}/>
        <Image alt={"frame"} src={'/frame.png'} layout={"responsive"} width={500} height={401}/>
      </div>
      <div className={css("relative", "w-full", "m-auto", "flex-1", styles.overlapGrid)}>
        <Image alt={"cuddle"} src={'/cuddle.png'} layout={"responsive"} width={640} height={480}/>
        <Image alt={"frame"} src={'/frame.png'} layout={"responsive"} width={500} height={401}/>
      </div>
    </div>
    <div className={css("mt-16")}>
      <span>In 2021, Atsuko Satō minted her 8 original images on the Ethereum blockchain as NFTs. The most iconic image “Doge”, was purchased by <Link isExternal href={"https://pleasr.org/"}>PleasrDAO</Link> at </span>
      <Link isExternal href={"https://very.auction/doge/doge"}>auction</Link> <span>for 1696.9 ETH.</span>
    </div>
    <div className={css("mt-10")}>
      <HelperContent>
        Lost? Read <Link isExternal href={"https://medium.com/the-doge-times/what-is-the-doge-nft-dog-c9277236f072"}>this</Link>
      </HelperContent>
    </div>
  </div>
}

const Dog = () => {
  return <div>
    <div className={css("relative", "w-full", "m-auto", "flex-1", styles.overlapGrid)} style={{maxWidth: "600px"}}>
      <Image alt={"doge"} src={'/kabosu.png'} layout={"responsive"} width={640} height={480}/>
      <Image alt={"frame"} src={'/frame.png'} layout={"responsive"} width={500} height={401}/>
    </div>
    <div className={css("mt-10")}>
      Shortly after the acquisition of The Doge NFT, PleasrDao <Link isExternal href={"https://fractional.art/vaults/0xbaac2b4491727d78d2b78815144570b9f2fe8899"}>fractionalized</Link> it, birthing the
      fungible $DOG token to the world, allowing any and all to own part of The Doge NFT.
    </div>
    <HelperContent>
      Fractionalization? Learn more <Link isExternal href={"https://medium.com/fractional-art/what-is-fractional-dd4f86e6458a#:~:text=Fractional%20is%20a%20decentralized%20protocol%20where%20NFT%20owners%20can%20mint,the%20NFT%20that%20they%20own."}>here</Link>
    </HelperContent>
  </div>
}

const Pixels = () => {
  return <div>
    <div className={css("relative", "w-full", "m-auto", "flex-1")} style={{maxWidth: "400px"}}>
      <Image alt={"doge"} src={'/pixel.png'} layout={"responsive"} width={253} height={287}/>
    </div>
    <div className={css("mt-10")}>
      Given the 6.9B tokens and the full resolution of the image, a single pixel of The Doge NFT costs 55,240 $DOG.
      You can actually purchase a pixels of the image at the <Link isExternal href={"https://pixels.thedao.ge"}>Doge Pixel Portal</Link>
    </div>
  </div>
}

const Daoge = () => {
  return <div>
    After fractionalization, the DAOge was formed to govern the The Doge NFT ecosystem.
  </div>
}

const BarkTank = ({projects}: {projects: AirtableSubmissionProject[]}) => {
  const router = useRouter()
  return <div>
    <div>
      Backed by the DOG Community Fund, the Bark Tank acts as an incubator for any and everything Doge. Pitch your idea and get funded today!
    </div>
    <div className={css("mt-5")}>
      <div>
        <Button onClick={() => window.open("https://airtable.com/shrRPV5wZdTUNhmn2", "_blank")}>
          <div className={css("text-base")}>apply</div>
        </Button>
      </div>
      <div className={css("mt-3")}>
        <Button onClick={() => router.push("/barktank")}>
          <div className={css("text-base")}>View all projects</div>
        </Button>
      </div>
    </div>
    <div className={css("mt-14", "text-left")}>
      <div className={css("mb-2", "text-2xl")}>Recent Projects</div>
      <div className={css("flex", "flex-col", "gap-3", "mr-4")}>
        {projects.slice(0, 3).map(project => <BarkTankItem key={project.projectName} project={project}/>)}
      </div>
    </div>
  </div>
}


export const navItems = [
  {title: 'Doge', id: "doge", content: Doge},
  {title: 'The Doge NFT', id: "dogenft", content: DogeNFT},
  {title: '$DOG', id: "dog", content: Dog},
  {title: 'Pixels', id: 'pixels', content: Pixels},
  {title: 'DAOge', id: "daoge", content: Daoge},
  {title: 'Bark Tank', id: "barktank", content: BarkTank}
]

interface HomeItemsProps {
  projects: AirtableSubmissionProject[];
  height: number;
  onIntersection?: (id: string) => void
}

const HomeItems = ({height, onIntersection, projects}: HomeItemsProps) => {
  return <>
    {navItems.map((item) => {
      const Content = item.content
      return <HomeFeature key={`home-item-${item.id}`} id={item.id} height={height} onIntersection={onIntersection}>
        {/* TODO: change this, very bad */}
        {/*//@ts-ignore*/}
         <Content projects={projects}/>
      </HomeFeature>
    })}
  </>
}

export default HomeItems

