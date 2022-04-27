import {css} from "../../helpers/css";
import Image from "next/image";
import HomeFeature from "./HomeFeature";
import Link from "../Link/Link";

const Doge= () => {
  return <div>
    <div
      className={css("relative", "w-full", "h-full", "hover:cursor-pointer", "active:translate-x-1", "active:translate-y-1")}
      style={{height: "500px"}}>
      <Image src={"/kabosu.png"} layout={"fill"} objectFit={"contain"}/>
    </div>
    <div className={css("mt-10", "px-16")}>
      The Mona Lisa of the internet, <Link isExternal href={"https://knowyourmeme.com/memes/doge"}>Doge</Link>, grew to infamy in the early 2000's when Atsuko Sato posted 8 photos to <Link href={"https://kabochan.blog.jp/"} isExternal>her blog</Link> of her adopted Shiba Inu, Kabosu.</div>
  </div>
}

const DogeNFT = () => {
  const imageHeight = 250
  return <div>
    <div className={css("grid", "grid-cols-3", "gap-5")}>
      <div style={{maxHeight: imageHeight}} className={css("relative", "w-full", "h-full")}>
        <Image src={'/kabosu.png'} layout={"fill"} objectFit={"contain"}/>
      </div>
      <div style={{maxHeight: imageHeight}} className={css("relative", "w-full")}>
        <Image src={'/feisty.png'} layout={"fill"} objectFit={"contain"}/>
      </div>
      <div style={{maxHeight: imageHeight}} className={css("relative", "w-full")}>
        <Image src={'/yelling.png'} layout={"fill"} objectFit={"contain"}/>
      </div>
      <div style={{maxHeight: imageHeight}} className={css("relative", "w-full")}>
        <Image src={'/curious.png'} layout={"fill"} objectFit={"contain"}/>
      </div>
      <div style={{maxHeight: imageHeight}} className={css("relative", "w-full")}>
        <Image src={'/angry.png'} layout={"fill"} objectFit={"contain"}/>
      </div>
      <div style={{maxHeight: imageHeight}} className={css("relative", "w-full")}>
        <Image src={'/shocked.png'} layout={"fill"} objectFit={"contain"}/>
      </div>
      <div style={{maxHeight: imageHeight}} className={css("relative", "w-full")}>
        <Image src={'/sad.png'} layout={"fill"} objectFit={"contain"}/>
      </div>
      <div style={{maxHeight: imageHeight}} className={css("relative", "w-full")}>
        <Image src={'/cuddle.png'} layout={"fill"} objectFit={"contain"}/>
      </div>
    </div>
    <div className={css("mt-10")}>
      <span>In 2021, Atsuko Satō minted her 8 original images on the Ethereum blockchain as NFTs. The most iconic image “Doge”, was purchased by <Link isExternal href={"https://pleasr.org/"}>PleasrDAO</Link> at </span>
      <Link isExternal href={"https://very.auction/doge/doge"}>auction</Link> <span>for 1696.9 ETH.</span>
    </div>
  </div>
}

const Pixels = () => {
  return <div>checkout these pixels</div>
}

const Dog = () => {
  return <div>
    Shortly after the aquisition of The Doge NFT, PleasrDao fractionalized it, birthing the
    fungible $DOG token to the world, allowing any and all to own part of The Doge NFT.
  </div>
}

const Daoge = () => {
  return <div>
    After fractionalization, the DAOge was formed to govern the The Doge NFT ecosystem.
  </div>
}

const BarkTank = () => {
  return <div>
    <div>
      Backed by the DOG Community Fund, the Bark Tank acts as an incubator for any and everything Doge. Pitch your idea and get funded today!
    </div>
    <div>
      <Link href={"/barktank"}>see more!</Link>
    </div>
  </div>
}


export const navItems = [
  {title: 'Doge', id: "doge", content: Doge},
  {title: 'The Doge NFT', id: "dogenft", content: DogeNFT},
  {title: 'Pixels', id: 'pixels', content: Pixels},
  {title: '$DOG', id: "dog", content: Dog},
  {title: 'DAOge', id: "daoge", content: Daoge},
  {title: 'Bark Tank', id: "barktank", content: BarkTank}
]

const HomeItems = ({height, onIntersection}: {height: number, onIntersection?: (id: string) => void}) => {
  return <>
    {navItems.map((item) => {
      const Content = item.content
      return <HomeFeature id={item.id} height={height} onIntersection={onIntersection}>
        <Content/>
      </HomeFeature>
    })}
  </>
}

export default HomeItems

