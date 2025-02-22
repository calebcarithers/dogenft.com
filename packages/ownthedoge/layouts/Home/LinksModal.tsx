import Modal, { DialogSize } from "dsl/components/Modal/Modal";
import { GoLinkExternal } from "react-icons/go";
import Link, { LinkSize, LinkType } from "../../../dsl/components/Link/Link";
import {
  actionLinks,
  chains,
  readLinks,
  socialLinks,
  tradeLinks,
} from "../../components/Footer/Links";
import { css } from "../../helpers/css";

const LinksModal = ({
  open,
  onChange,
}: {
  open: boolean;
  onChange: (value: boolean) => void;
}) => {
  return (
    <Modal
      size={DialogSize.sm}
      isOpen={open}
      title={"✨ Links ✨"}
      onChange={onChange}
    >
      <div className={css("grid", "grid-cols-4")}>
        <div>
          <div className={css("text-lg", "font-bold")}>Social</div>
          <div className={css("flex", "flex-col")}>
            {socialLinks.map((link) => (
              <Link
                key={link.title}
                isExternal
                size={LinkSize.lg}
                type={LinkType.Grey}
                href={link.link}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className={css("text-lg", "font-bold")}>Read</div>
          <div className={css("flex", "flex-col")}>
            {readLinks.map((link) => (
              <Link
                key={link.title}
                isExternal
                size={LinkSize.lg}
                type={LinkType.Grey}
                href={link.link}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className={css("text-lg", "font-bold")}>Do</div>
          <div className={css("flex", "flex-col")}>
            {actionLinks.map((link) => (
              <Link
                key={link.title}
                isExternal
                size={LinkSize.lg}
                type={LinkType.Grey}
                href={link.link}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className={css("text-lg", "font-bold")}>Buy</div>
          <div className={css("flex", "flex-col")}>
            {tradeLinks.map((link) => (
              <Link
                key={link.title}
                isExternal
                size={LinkSize.lg}
                type={LinkType.Grey}
                href={link.link}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={css("mt-10")}>
        <div className={css("text-lg", "font-bold")}>Chains</div>
        <div className={css("flex", "flex-col", "gap-4")}>
          {chains.map((chain) => (
            <div key={chain.contractAddress}>
              <div>
                <Link type={LinkType.Grey} href={chain.link} isExternal bold>
                  <span className={css("inline-block", "mr-2")}>
                    <GoLinkExternal />
                  </span>
                  {chain.chain}
                </Link>
              </div>
              <div
                className={css(
                  "bg-pixels-yellow-100",
                  "border-2",
                  "border-dashed",
                  "border-pixels-yellow-300",
                  "p-1",
                  "font-bold"
                )}
              >
                {chain.contractAddress}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default LinksModal;
