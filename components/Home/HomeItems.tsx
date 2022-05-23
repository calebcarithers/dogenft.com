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
import React, {PropsWithChildren, useRef, useState} from "react";
import {emojisplosion} from "emojisplosion";
import cumulativeOffset from "../../helpers/cumulativeOffset";
import Modal, {DialogSize} from "../Modal/Modal";
import {objectKeys} from "../../helpers/arrays";

export const Doge = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    return <div className={css("mx-6")}>
        <div className={css("relative", "z-10", "m-auto", "max-w-xl")}>
            <div
                ref={ref}
                className={css("relative", "w-full", "h-full", "hover:cursor-pointer", "active:translate-x-1", "active:translate-y-1", "flex-1", "border-2", "border-solid", "border-black")}
                onClick={() => {
                    const explode = (xInitialVelocity: number, yInitialVelocity: number) => {
                        emojisplosion({
                            process(e){
                                e.className += " emojipop";
                                //@ts-ignore
                                e.style.zIndex = 0;
                            },
                            position: () => {
                                let x = Math.random() * innerWidth;
                                let y = Math.random() * innerHeight;
                                if (ref.current) {
                                    const offset = cumulativeOffset(ref.current)
                                    x = offset.left + ref.current!.clientWidth / 2;
                                    y = offset.top + ref.current!.clientHeight / 2;
                                }
                                return {x, y}
                            },
                            emojis: ["✨", "🐕", "✨", "🐕"],
                            physics: {
                                fontSize: {
                                    min: 24,
                                    max: 108
                                },
                                gravity: 0.55,
                                initialVelocities: {
                                    y: {max: yInitialVelocity, min: 0},
                                    x: {max: xInitialVelocity, min: 0},
                                    rotation: 15
                                }
                            }
                        })
                    }
                    explode(60, -50)
                    explode(-60, -50)
                }}
            >
                <Image
                    alt={"doge"}
                    src={"/images/kabosu.png"}
                    layout={"responsive"}
                    width={640}
                    height={480}
                    style={{zIndex: 10}}
                />
            </div>
            <div className={css("bg-black", "absolute", "w-full", "h-full")} style={{top: 5, left: 5, zIndex: -1}}/>
        </div>
        <div className={css("mt-16", "px-16", "bg-pixels-yellow-100")}>
            <Link bold isExternal href={"https://knowyourmeme.com/memes/doge"}>Doge</Link> grew to <Link bold isExternal href={"https://knowyourmeme.com/editorials/meme-review/the-top-10-memes-of-the-decade"}>prominence</Link> in the
            early {"2000's"} when Atsuko Sato posted 8 photos
            to <Link bold href={"https://kabochan.blog.jp/"} isExternal>her blog</Link> of her adopted Shiba Inu,
            Kabosu.
        </div>
    </div>
}

export const FramedImage: React.FC<PropsWithChildren<any>> = ({
    imagePath,
    description,
}: { imagePath: string, description: string }) => {
    const [showModal, setShowModal] = useState(false)
    return <>
        <div className={css("relative")}>
            <div className={css("relative", "w-full", "m-auto", "flex-1", "cursor-pointer", "relative", "md:hover:right-2",
                "md:hover:bottom-2", "active:translate-x-2", "active:translate-y-2", "z-10", styles.overlapGrid)}
                 onClick={() => setShowModal(true)}>
                <div className={css("relative")}
                     style={{maxWidth: "80%", maxHeight: "80%", left: "50%", top: "-50%", transform: "translate(-50%, 80%)"}}>
                    <Image alt={description} src={imagePath} layout={"responsive"} width={640} height={480}/>
                </div>
                <Image alt={"frame"} src={'/images/frame.png'} layout={"responsive"} width={500} height={401}/>
            </div>
            <div className={css("inline-block", "text-lg", "md:text-xl", "italic")}
                 style={{gridArea: "auto"}}>{description}</div>
        </div>
        <Modal
            size={DialogSize.lg}
            isOpen={showModal}
            title={"✨ " + description + " ✨"}
            onChange={(val) => setShowModal(val)}
        >
            <div className={css("relative", "border-2", "border-solid", "border-black")}>
                <Image src={imagePath} layout={"responsive"} width={640} height={480}/>
            </div>
        </Modal>
    </>
}

export const DogeNFT = () => {
    return <div>
        <div className={css("grid", "grid-cols-3", "gap-6", "max-w-2xl", "m-auto")}>
            <FramedImage imagePath={"/images/sad.png"} description={"Sad"}/>
            <FramedImage imagePath={"/images/cuddle.png"} description={"Cuddle"}/>
            <FramedImage imagePath={"/images/yelling.png"} description={"Yelling"}/>
            <FramedImage imagePath={"/images/curious.png"} description={"Curious"}/>
            <FramedImage imagePath={"/images/angry.png"} description={"Angry"}/>
            <FramedImage imagePath={"/images/shocked.png"} description={"Shocked"}/>
            <div className={css("relative")} style={{left: "50%"}}>
                <FramedImage imagePath={"/images/kabosu.png"} description={"Doge"}/>
            </div>
            <div/>
            <div className={css("relative")} style={{right: "50%"}}>
                <FramedImage imagePath={"/images/feisty.png"} description={"Feisty"}/>
            </div>
        </div>
        <div className={css("mt-6", "bg-pixels-yellow-100")}>
            In 2021, Ms. Satō minted the famous photos on Ethereum as NFTs. The most iconic image &quot;Doge&quot;, was
            purchased by <Link bold isExternal href={"https://pleasr.org/"}>PleasrDAO</Link> at <Link bold isExternal
                                                                                                      href={"https://very.auction/doge/doge"}>auction</Link> for
            1696.9 ETH ($4.8 M at the time), making it the most valuable meme NFT.
        </div>
        <div className={css("mt-6")}>
            <HelperContent>
                Read <Link bold isExternal
                           href={"https://medium.com/the-doge-times/what-is-the-doge-nft-dog-c9277236f072"}>this</Link> for
                more
            </HelperContent>
        </div>
    </div>
}

export const Dog = () => {
    return <div>
        <div className={css("relative", "w-full", "lg:w-3/5", "lg:1/5", "m-auto", "flex-1", styles.overlapGrid)}>
            <div className={css("relative")}
                 style={{
                     maxWidth: "80%",
                     maxHeight: "80%",
                     left: "50%",
                     top: "-50%",
                     transform: "translate(-50%, 80%)"
                 }}>
                <Image alt={"kabosu"} src={'/images/kabosu.png'} layout={"responsive"} width={640} height={480}/>
            </div>
            <Image alt={"frame"} src={'/images/frame.png'} layout={"responsive"} width={500} height={401}/>
        </div>
        <div className={css("mt-10", "bg-pixels-yellow-100")}>
            After the auction, PleasrDAO <Link bold isExternal
                                               href={"https://fractional.art/vaults/0xbaac2b4491727d78d2b78815144570b9f2fe8899"}>fractionalized</Link> The
            Doge NFT into a fungible token, $DOG, allowing any and all to own a piece of the meme.
        </div>
        <HelperContent>
            Fractionalization? Learn more <Link bold isExternal
                                                href={"https://medium.com/fractional-art/what-is-fractional-dd4f86e6458a#:~:text=Fractional%20is%20a%20decentralized%20protocol%20where%20NFT%20owners%20can%20mint,the%20NFT%20that%20they%20own."}>here</Link>
        </HelperContent>
    </div>
}

export const Pixels = () => {
    return <div>
        <div className={css("inline-block", "relative", "z-10")}>
            <div
                onClick={() => {
                    window.open("https://pixels.thedao.ge/px/1078409", "_blank")
                }}
                className={css("cursor-pointer", "active:translate-x-1", "active:translate-y-1", "relative")}>
                <div style={{height: "230px", width: "230px", borderWidth: "1px", background: "#2e2e2c"}}
                     className={css("border-black")}/>
                <div style={{
                    width: "230px",
                    borderLeft: "1px",
                    borderRight: "1px",
                    borderBottom: "1px",
                    borderStyle: "solid"
                }}
                     className={css("text-left", "pl-2", "font-PressStart", "text-base", "py-1", "bg-pixels-yellow-100")}># 78409
                </div>
            </div>
            <div className={css("absolute", "bg-black", "w-full", "h-full")} style={{top: 5, right: -5, zIndex: -1}}/>
        </div>
        <div>
            <div className={css("text-base", "mt-4", "bg-pixels-yellow-100", "inline-block")}>(an actual pixel of The Doge NFT)</div>
        </div>
        <div className={css("mt-10", "bg-pixels-yellow-100")}>
            The total supply of $DOG is 16,969,696,969. The total amount of pixels in The Doge NFT is 307,200 (640 x 480
            resolution).
            Therefore, a single pixel is equivalent to 55,240 $DOG. Holders can lock $DOG to mint &apos;Doge
            Pixel&apos; NFTs
            at the <Link bold isExternal href={"https://pixels.thedao.ge"}>Doge Pixel Portal</Link>
        </div>
    </div>
}

enum TeamTypes {
    core = "Core Team",
    community = "Community Team",
    plear = "Pleasr Friends"
}

const DaogeMember: React.FC<PropsWithChildren<{ imagePath: string, name: TeamTypes, description?: string, onClick: (type: TeamTypes) => void}>> = ({
    imagePath,
    name,
    description,
    onClick
}) => {
    return <div>
        <div onClick={() => onClick(name)} className={css( "relative", "md:hover:right-2", "md:hover:bottom-2", "cursor-pointer", "active:translate-x-2", "active:translate-y-2", "z-10")}>
            <Image alt={name} src={imagePath} layout={"responsive"} width={400} height={400}
                   className={css("border-2", "border-dashed", "border-gray-300", "z-10")}/>
            <div className={css("rounded-full", "w-full", "h-full", "bg-black", "absolute", "top-0", "left-0", "md:hover:left-2", "md:hover:top-2", "relative")} style={{zIndex: -1}}/>
        </div>
        <div className={css("text-lg", "font-bold", "mt-2", "bg-pixels-yellow-100")}>{name}</div>
        {description && <div className={css("text-base", "italic", "bg-pixels-yellow-100")}>{description}</div>}
    </div>
}

export const Daoge = () => {
    const [modalType, setModalType] = useState<TeamTypes | null>()
    return <div>
        <div className={css("grid", "grid-cols-5", "mb-8")}>
            <DaogeMember imagePath={"/images/doage.png"} name={TeamTypes.core} onClick={(val) => setModalType(val)}/>
            <div/>
            <DaogeMember imagePath={"/images/monadoge.png"} name={TeamTypes.community} onClick={(val) => setModalType(val)}/>
            <div/>
            <DaogeMember imagePath={"/images/pleasr.png"} name={TeamTypes.plear} onClick={(val) => setModalType(val)}/>
        </div>
        <div className={css("bg-pixels-yellow-100")}>
            After fractionalization, <Link bold isExternal href={"https://dao.ge"}>DAOge</Link> was formed to manage the
            community fund and guide The Doge NFT ecosystem.
        </div>
        <HelperContent>
            Checkout our <Link isExternal
                               href={"https://pleasr.mirror.xyz/7hpdJOWRzQx2pmCA16MDxN2FiA3eY6dwcrnEtXKnCJw"}>whitepaper</Link>
        </HelperContent>
        {modalType && <Modal title={"✨ " + modalType + " ✨"} size={DialogSize.sm} isOpen={modalType !== null} onChange={() => setModalType(null)}>
            <Teams type={modalType}/>
        </Modal>}
    </div>
}

export const Teams: React.FC<PropsWithChildren<{type: TeamTypes}>> = ({type}) => {
    enum TeamMembers {
        tridog = "Tridog",
        zona = "Zona",
        dogeking = "Doge King",
        gainor = "Gainor",
        paco = "Paco",
        coldplunge = "Coldplunge",
        ot = "OT",
        magicanz = "Magicanz",
        dogeninja = "Doge Ninja",
        saladpingers = "Salad Pingers",
        calfmoney = "Calf Money",
        chocorado = "Chocorado",
        julia = "Julia Love",
        jamis = "Jamis",
        juan = "Juan",
        shrugs = "Shrugs",
        bunday = "Bunday",
        ben = "Ben",
        alex = "Alex",
        spencer = "Spencer",
        cryptosteve = "Crypto Steve",
        matkov = "Matkov",
        camilia = "Camilia",
        amber = "Amber",
        andy = "Andy"
    }


    const TeamSocials = {
        [TeamMembers.tridog]: "https://twitter.com/tridoggg",
        [TeamMembers.zona]: "https://twitter.com/cryptosinclair",
        [TeamMembers.dogeking]: "",
        [TeamMembers.gainor]: "https://twitter.com/gainormather",
        [TeamMembers.paco]: "https://twitter.com/ownthememe",
        [TeamMembers.coldplunge]: "https://twitter.com/xcoldplunge",
        [TeamMembers.ot]: "",
        [TeamMembers.magicanz]: "https://twitter.com/Magicanz",
        [TeamMembers.dogeninja]: "https://twitter.com/DogeNinjaknows",
        [TeamMembers.saladpingers]: "https://twitter.com/saladpingers",
        [TeamMembers.calfmoney]: "https://twitter.com/CalfMoney",
        [TeamMembers.chocorado]: "https://twitter.com/Chocorado",
        [TeamMembers.julia]: "https://twitter.com/realjulialove",
        [TeamMembers.jamis]: "https://twitter.com/_jamiis",
        [TeamMembers.juan]: "https://twitter.com/JuanPaDulanto",
        [TeamMembers.shrugs]: "https://twitter.com/1ofthemanymatts",
        [TeamMembers.bunday]: "",
        [TeamMembers.ben]: "",
        [TeamMembers.alex]: "",
        [TeamMembers.spencer]: "https://twitter.com/spenhar",
        [TeamMembers.cryptosteve]: "",
        [TeamMembers.matkov]: "",
        [TeamMembers.camilia]: "",
        [TeamMembers.amber]: "",
        [TeamMembers.andy]: "https://twitter.com/andy8052"
    }

    let Team: any
    if (type === TeamTypes.core) {
        Team = {
            "Strategy": [TeamMembers.tridog],
            "Community": [TeamMembers.zona, TeamMembers.paco],
            "Barketing": [TeamMembers.dogeking, TeamMembers.coldplunge, TeamMembers.ot],
            "Tech": [TeamMembers.gainor]
        }
    } else if (type === TeamTypes.plear) {
        Team = {
            "Pleasr Strategy": [TeamMembers.jamis, TeamMembers.juan],
            "Pleasr Labs": [TeamMembers.shrugs, TeamMembers.bunday, TeamMembers.ben, TeamMembers.alex],
            "Pleasr Creative": [TeamMembers.spencer],
            "Pleasr Finance": [TeamMembers.cryptosteve],
            "Pleasr Legal": [TeamMembers.matkov],
            "PR": [TeamMembers.camilia],
            "Events": [TeamMembers.amber],
            "Fractional": [TeamMembers.andy]
        }
    } else if (type === TeamTypes.community) {
        Team = {
            "Council of Bark": [
                TeamMembers.tridog, TeamMembers.zona, TeamMembers.paco,
                TeamMembers.dogeking, TeamMembers.magicanz, TeamMembers.dogeninja,
                TeamMembers.saladpingers, TeamMembers.coldplunge
            ],
            "Mods": [TeamMembers.magicanz, TeamMembers.calfmoney, TeamMembers.saladpingers, TeamMembers.paco, TeamMembers.zona],
            "Meme Team": [TeamMembers.zona, TeamMembers.ot, TeamMembers.magicanz, TeamMembers.paco, TeamMembers.chocorado],
            "MCs": [TeamMembers.dogeninja, TeamMembers.julia],
            "Events": [TeamMembers.dogeninja, TeamMembers.julia, TeamMembers.chocorado, TeamMembers.dogeninja]
        }
    } else {
        throw new Error("Unknown type")
    }


    return <div className={css("text-xl")}>
        <div className={css("grid", "grid-cols-10", "gap-4")}>
            {objectKeys(Team).map(title => <>
                <div key={title as string} className={css("col-span-3")}>
                    <>
                        {title}:
                    </>
                </div>
                <div className={css("col-span-7")}>{Team[title].map((member: any, index: number, arr: any[]) => <span key={member}>
                <Link
                    isExternal
                    //@ts-ignore
                    href={TeamSocials[member]}>
                    {member}</Link>
                    {index !== arr.length - 1 && <span>, </span>}
            </span>)}</div>
            </>)}
        </div>
    </div>
}

export const BarkTank = ({projects}: { projects: AirtableSubmissionProject[] }) => {
    const router = useRouter()
    return <div>
        <div className={css("bg-pixels-yellow-100")}>
            Bark Tank acts an an incubator for the expansion of The Doge NFT ecosystem. Submit your ideas here. Great
            ideas,
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
            <div className={css("flex", "flex-col", "space-y-4", "mr-4")}>
                {projects.slice(0, 3).map(project => <BarkTankItem key={project.projectName} project={project}/>)}
            </div>
        </div>
    </div>
}


interface HomeItemsProps {
    projects: AirtableSubmissionProject[];
    height: number;
    onIntersection?: (id: string) => void
}

export const navItems = [
    {title: 'Doge', id: "doge", content: Doge},
    {title: 'The Doge NFT', id: "dogenft", content: DogeNFT},
    {title: '$DOG', id: "dog", content: Dog},
    {title: 'Pixels', id: 'pixels', content: Pixels},
    {title: 'DAOge', id: "daoge", content: Daoge},
    {title: 'Bark Tank', id: "barktank", content: BarkTank}
]
const HomeItems = ({height, onIntersection, projects}: HomeItemsProps) => {
    return <>
        {navItems.map((item) => {
            const Content = item.content
            return <HomeFeature key={`home-item-${item.id}`} id={item.id} height={height}
                                onIntersection={onIntersection}>
                {/* TODO: change this, very bad */}
                {/*//@ts-ignore*/}
                <Content projects={projects}/>
            </HomeFeature>
        })}
    </>
}

export default HomeItems

