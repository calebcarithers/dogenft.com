import Modal from "../../components/Modal/Modal";
import React from "react";
import {css} from "../../helpers/css";
import {actionLinks, chains, readLinks, socialLinks} from "../../components/Footer/Links";
import Link, {LinkSize, LinkType} from "../../components/Link/Link";

const LinksModal = ({open, onChange}: {open: boolean, onChange: (value: boolean) => void}) => {
    return <Modal
        open={open}
        title={"Links"}
        onChange={onChange}>
        <div className={css("grid", "grid-cols-3")}>
            <div>
                <div className={css("text-lg", "font-bold")}>Social</div>
                <div className={css("flex", "flex-col")}>
                    {socialLinks.map(link => <Link isExternal size={LinkSize.lg} type={LinkType.Secondary} href={link.link}>{link.title}</Link>)}
                </div>
            </div>
            <div>
                <div className={css("text-lg", "font-bold")}>Read</div>
                <div className={css("flex", "flex-col")}>
                    {readLinks.map(link => <Link isExternal size={LinkSize.lg} type={LinkType.Secondary} href={link.link}>{link.title}</Link>)}
                </div>
            </div>
            <div>
                <div className={css("text-lg", "font-bold")}>Do</div>
                <div className={css("flex", "flex-col")}>
                    {actionLinks.map(link => <Link isExternal size={LinkSize.lg} type={LinkType.Secondary} href={link.link}>{link.title}</Link>)}
                </div>
            </div>
        </div>
        {/*<div className={css("w-full", "border-2", "border-dashed", "my-8")}/>*/}
        <div className={css("mt-10")}>
            <div className={css("text-lg", "font-bold")}>Chains</div>
            <div className={css("flex", "flex-col", "gap-4")}>
                {chains.map(chain => <div className={css()}>
                    <div>
                        {chain.chain}
                    </div>
                    <div className={css("bg-gray-100", "border-2", "border-dashed", "border-gray-300", "p-1", "font-bold")}>
                        {chain.contractAddress}
                    </div>
                </div>)}
            </div>
        </div>
    </Modal>
}

export default LinksModal
