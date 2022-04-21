import {css} from "../../helpers/css";
import Image from "next/image";
import HomeFeature from "./HomeFeature";
import Link from "../Link/Link";

interface HomeFeatureProps {
  id: string;
  height: number;
}

const Doge= ({id, height}: HomeFeatureProps) => {
  return <HomeFeature id={id} height={height}>
    <div>
      <div
        className={css("relative", "w-full", "h-full", "hover:cursor-pointer", "active:translate-x-1", "active:translate-y-1")}
        style={{height: "500px"}}>
        <Image src={"/kabosu.png"} layout={"fill"} objectFit={"contain"}/>
      </div>
      <div className={css("mt-10")}>
        The Mona Lisa of the internet, <Link isExternal href={"https://knowyourmeme.com/memes/doge"}>Doge</Link>, grew to infamy in the early 2000's when Atsuko Sato posted 8 photos to <Link href={"https://kabochan.blog.jp/"} isExternal>her blog</Link> of her adopted Shiba Inu, Kabosu.</div>
    </div>
  </HomeFeature>
}

const DogeNFT = ({id, height}: HomeFeatureProps) => {
  return <HomeFeature id={id} height={height}>
    <div>
      <span>In 2021, Atsuko Satō minted her 8 original images on the Ethereum blockchain as NFTs. The most iconic image “Doge”, was purchased by <Link isExternal href={"https://pleasr.org/"}>PleasrDAO</Link> at </span>
        <Link isExternal href={"https://very.auction/doge/doge"}>auction</Link> <span>for 1696.9 ETH.</span>
    </div>
  </HomeFeature>
}

const Dog = ({id, height}: HomeFeatureProps) => {
  return <HomeFeature id={id} height={height}>
    Shortly after the aquisition of The Doge NFT, PleasrDao fractionalized it, birthing the
    fungible $DOG token to the world, allowing any and all to own part of The Doge NFT.
  </HomeFeature>
}

const Daoge = ({id, height}: HomeFeatureProps) => {
  return <HomeFeature id={id} height={height}>
    After fractionalization, the DAOge was formed to govern the The Doge NFT ecosystem.
  </HomeFeature>
}

const BarkTank = ({id, height}: HomeFeatureProps) => {
  return <HomeFeature id={id} height={height}>
    Backed by the DOG Community Fund, the Bark Tank acts as an incubator for any and everything Doge. Pitch your idea and get funded today!
  </HomeFeature>
}


const navItems = [
  {title: 'Doge', id: "doge", component: Doge},
  {title: 'The Doge NFT', id: "dogenft", component: DogeNFT},
  {title: '$DOG', id: "dog", component: Dog},
  {title: 'DAOge', id: "daoge", component: Daoge},
  {title: 'Bark Tank', id: "barktank", component: BarkTank}
]

const HomeItems = ({height}: {height: number}) => {
  return <>
    {navItems.map((item) => {
      const Component = item.component
      return <Component id={item.id} height={height}/>
    })}
  </>
}

export default HomeItems

