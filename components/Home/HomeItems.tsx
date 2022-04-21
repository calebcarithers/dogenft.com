import {css} from "../../helpers/css";
import Image from "next/image";
import HomeFeature from "./HomeFeature";

interface HomeFeatureProps {
  id: string;
  height: number;
}

const Doge= ({id, height}: HomeFeatureProps) => {
  return <HomeFeature id={id} height={height}>
    <div>
      <div className={css("relative", "w-full", "h-full", "hover:cursor-pointer", "active:translate-x-1", "active:translate-y-1")} style={{height: "600px"}}>
        <Image src={"/kabosu.png"} layout={"fill"} objectFit={"contain"}/>
      </div>
      <div className={css("text-2xl", "mt-10")}>
        The Mona Lisa of the internet, Doge, grew to infamy in the early 2000's when Atsuko Sato posted 8 photos to her blog of her adopted Shiba Inu, Kabosu.</div>
    </div>
  </HomeFeature>
}

const DogeNFT = ({id, height}: HomeFeatureProps) => {
  return <HomeFeature id={id} height={height}>
    dogenft
  </HomeFeature>
}

const Dog = ({id, height}: HomeFeatureProps) => {
  return <HomeFeature id={id} height={height}>
    $dog
  </HomeFeature>
}

const Daoge = ({id, height}: HomeFeatureProps) => {
  return <HomeFeature id={id} height={height}>
    daoge
  </HomeFeature>
}

const BarkTank = ({id, height}: HomeFeatureProps) => {
  return <HomeFeature id={id} height={height}>
    barktank
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

