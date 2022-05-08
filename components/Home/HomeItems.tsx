import {css} from "../../helpers/css";
import Image from "next/image";
import HomeFeature from "./HomeFeature";
import Link from "../Link/Link";
import HelperContent from "../HelperContent/HelperContent";
import styles from "./HomeItems.module.css"
import {AirtableSubmissionProject} from "../../interfaces";
import BarkTankItem from "../BarkTankItem/BarkTankItem";
import Button from "../Button/Button";
import {useRouter} from "next/router";
import {PropsWithChildren} from "react";

const Doge= () => {
  return <div>
    <div className={css("relative", "z-10", "mx-5")}>
      <div className={css("")}>
        <div
          className={css("relative", "w-full", "h-full", "hover:cursor-pointer", "active:translate-x-1", "active:translate-y-1", "m-auto", "flex-1", "border-2", "border-solid", "border-black", "max-w-xl")}>
          <Image
            alt={"doge"}
            src={"/kabosu.png"}
            layout={"responsive"}
            width={640}
            height={480}
            style={{zIndex: 1}}
          />
        </div>
      </div>
    </div>
    <div className={css("mt-16", "px-16")}>
      <Link bold isExternal href={"https://knowyourmeme.com/memes/doge"}>Doge</Link> grew to prominence in the early {"2000's"} when Atsuko Sato posted 8 photos
      to <Link bold href={"https://kabochan.blog.jp/"} isExternal>her blog</Link> of her adopted Shiba Inu, Kabosu.
    </div>
  </div>
}

const FramedImage: React.FC<PropsWithChildren<any>>  = ({imagePath, description}: {imagePath: string, description: string}) => {
  return <div className={css("relative", "w-full", "m-auto", "flex-1", "cursor-pointer", styles.overlapGrid)}>
    <div className={css("relative")} style={{maxWidth: "80%", maxHeight: "80%", left: "50%", top: "-50%", transform: "translate(-50%, 80%)"}}>
      <Image alt={description} src={imagePath} layout={"responsive"} width={640} height={480}/>
    </div>
    <Image alt={"frame"} src={'/images/frame.png'} layout={"responsive"} width={500} height={401}/>
    <div className={css("inline-block", "text-lg","md:text-2xl", "italic")} style={{gridArea: "auto"}}>{description}</div>
  </div>
}

const DogeNFT = () => {
  return <div>
    <div className={css("grid", "grid-cols-3", "gap-10", "max-w-2xl", "m-auto")}>
      <FramedImage imagePath={"/images/kabosu.png"} description={"Doge"}/>
      <FramedImage imagePath={"/images/feisty.png"} description={"Feisty"}/>
      <FramedImage imagePath={"/images/yelling.png"} description={"Yelling"}/>
      <FramedImage imagePath={"/images/curious.png"} description={"Curious"}/>
      <FramedImage imagePath={"/images/angry.png"} description={"Angry"}/>
      <FramedImage imagePath={"/images/shocked.png"} description={"Shocked"}/>
      <FramedImage imagePath={"/images/sad.png"} description={"Sad"}/>
      <FramedImage imagePath={"/images/cuddle.png"} description={"Cuddle"}/>
    </div>
    <div className={css("mt-16")}>
      In 2021, Ms. Satō minted the famous photos on Ethereum as NFTs. The most iconic image &quot;Doge&quot;, was purchased by <Link bold isExternal href={"https://pleasr.org/"}>PleasrDAO</Link> at <Link bold isExternal href={"https://very.auction/doge/doge"}>auction</Link> for 1696.9 ETH ($4.8 M at the time)
    </div>
    <div className={css("mt-10")}>
      <HelperContent>
        Read <Link bold isExternal href={"https://medium.com/the-doge-times/what-is-the-doge-nft-dog-c9277236f072"}>this</Link> for more
      </HelperContent>
    </div>
  </div>
}

const Dog = () => {
  return <div>
    <div className={css("relative", "w-full", "md:w-3/5", "m-auto", "flex-1", styles.overlapGrid)}>
      <div className={css("relative")} style={{maxWidth: "80%", maxHeight: "80%", left: "50%", top: "-50%", transform: "translate(-50%, 80%)"}}>
        <Image alt={"kabosu"} src={'/images/kabosu.png'} layout={"responsive"} width={640} height={480}/>
      </div>
      <Image alt={"frame"} src={'/images/frame.png'} layout={"responsive"} width={500} height={401}/>
    </div>
    <div className={css("mt-10")}>
      After the auction, PleasrDAO <Link bold isExternal href={"https://fractional.art/vaults/0xbaac2b4491727d78d2b78815144570b9f2fe8899"}>fractionalized</Link> The Doge NFT into a fungible token, $DOG, allowing any and all to own a piece of the meme.
    </div>
    <HelperContent>
      Fractionalization? Learn more <Link bold isExternal href={"https://medium.com/fractional-art/what-is-fractional-dd4f86e6458a#:~:text=Fractional%20is%20a%20decentralized%20protocol%20where%20NFT%20owners%20can%20mint,the%20NFT%20that%20they%20own."}>here</Link>
    </HelperContent>
  </div>
}

const Pixels = () => {
  return <div>
    <div className={css("relative", "w-full", "m-auto", "flex-1")} style={{maxWidth: "400px"}}>
      <Image alt={"doge"} src={'/images/pixel.png'} layout={"responsive"} width={253} height={287}/>
    </div>
    <div className={css("mt-10")}>
      The total supply of $DOG is 16.97B. The total amount of pixels in The Doge NFT is 307,200 (640 x 480 resolution).
      Therefore, a single pixel is equivalent to 55,240 $DOG. Holders can lock $DOG to mint &apos;Doge Pixel&apos; NFTs at the <Link bold isExternal href={"https://pixels.thedao.ge"}>Doge Pixel Portal</Link>
    </div>
  </div>
}

const Daoge = () => {
  return <div>
    After fractionalization, <Link bold isExternal href={"https://dao.ge"}>DAOge</Link> was formed to manage the community fund and guide The Doge NFT ecosystem.
  </div>
}

const BarkTank = ({projects}: {projects: AirtableSubmissionProject[]}) => {
  const router = useRouter()
  return <div>
    <div>
      Bark Tank acts an an incubator for the expansion of The Doge NFT ecosystem. Submit your ideas here. Great ideas,
      favored by the community, are eligible to receive funding from the DAOge.
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
      <div className={css("mb-2", "text-xl")}>Recent Projects</div>
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

